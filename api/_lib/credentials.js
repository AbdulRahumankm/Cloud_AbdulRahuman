import {
  createCipheriv, createDecipheriv, createHmac, randomBytes, scryptSync, timingSafeEqual,
} from 'node:crypto';
import { getFile, updateFile } from './github.js';

const CREDENTIAL_PATH = '.admin/credentials.json';

function encryptionKey() {
  return createHmac('sha256', process.env.PORTFOLIO_SESSION_SECRET)
    .update('portfolio-credential-file-v1')
    .digest();
}

function equalSecrets(candidate, expected, salt) {
  if (typeof candidate !== 'string' || candidate.length > 256) return false;
  const actualHash = scryptSync(candidate, salt, 64);
  const expectedHash = scryptSync(expected, salt, 64);
  return timingSafeEqual(actualHash, expectedHash);
}

function decodeCredential(bytes) {
  const envelope = JSON.parse(bytes.toString('utf8'));
  if (envelope.version !== 1) throw new Error('Unsupported credential format.');
  const iv = Buffer.from(envelope.iv, 'base64url');
  const tag = Buffer.from(envelope.tag, 'base64url');
  const ciphertext = Buffer.from(envelope.ciphertext, 'base64url');
  if (iv.length !== 12 || tag.length !== 16 || ciphertext.length > 2048) {
    throw new Error('Invalid credential file.');
  }
  const decipher = createDecipheriv('aes-256-gcm', encryptionKey(), iv);
  decipher.setAuthTag(tag);
  const value = JSON.parse(Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8'));
  if (
    value.version !== 1 ||
    typeof value.salt !== 'string' ||
    typeof value.hash !== 'string' ||
    typeof value.sessionVersion !== 'string' ||
    Buffer.from(value.salt, 'base64url').length !== 16 ||
    Buffer.from(value.hash, 'base64url').length !== 64 ||
    Buffer.from(value.sessionVersion, 'base64url').length !== 16
  ) throw new Error('Invalid credential record.');
  return value;
}

async function credentialFile() {
  try {
    return await getFile(CREDENTIAL_PATH);
  } catch (error) {
    if (error.status === 404) return null;
    throw error;
  }
}

export async function currentCredential() {
  const file = await credentialFile();
  if (file) return { ...decodeCredential(file.bytes), sha: file.sha };
  return {
    bootstrap: true,
    sha: undefined,
    sessionVersion: createHmac('sha256', process.env.PORTFOLIO_SESSION_SECRET)
      .update('bootstrap-session-v1')
      .update(process.env.PORTFOLIO_ADMIN_PASSWORD)
      .digest('base64url'),
  };
}

export async function verifyPassword(candidate) {
  const credential = await currentCredential();
  if (typeof candidate !== 'string' || candidate.length > 256) return null;
  if (credential.bootstrap) {
    return equalSecrets(candidate, process.env.PORTFOLIO_ADMIN_PASSWORD, process.env.PORTFOLIO_SESSION_SECRET)
      ? credential : null;
  }
  const actualHash = scryptSync(candidate, Buffer.from(credential.salt, 'base64url'), 64);
  const expectedHash = Buffer.from(credential.hash, 'base64url');
  return timingSafeEqual(actualHash, expectedHash) ? credential : null;
}

export function recoveryCodeMatches(candidate) {
  return equalSecrets(candidate, process.env.PORTFOLIO_RECOVERY_CODE, process.env.PORTFOLIO_SESSION_SECRET);
}

function encryptedCredential(password) {
  const salt = randomBytes(16);
  const record = {
    version: 1,
    salt: salt.toString('base64url'),
    hash: scryptSync(password, salt, 64).toString('base64url'),
    sessionVersion: randomBytes(16).toString('base64url'),
  };
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', encryptionKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(JSON.stringify(record), 'utf8'), cipher.final()]);
  const envelope = {
    version: 1,
    iv: iv.toString('base64url'),
    tag: cipher.getAuthTag().toString('base64url'),
    ciphertext: ciphertext.toString('base64url'),
  };
  return {
    bytes: Buffer.from(JSON.stringify(envelope, null, 2) + '\n', 'utf8'),
    sessionVersion: record.sessionVersion,
  };
}

export async function replacePassword(password, sha) {
  const credential = encryptedCredential(password);
  const result = await updateFile(
    CREDENTIAL_PATH,
    credential.bytes,
    sha,
    'Update portfolio admin password',
  );
  return { sessionVersion: credential.sessionVersion, commitUrl: result.commitUrl };
}
