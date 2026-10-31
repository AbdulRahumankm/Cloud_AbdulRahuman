import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import login from '../api/admin/login.js';
import session from '../api/admin/session.js';
import contentHandler from '../api/admin/content.js';
import resumeHandler from '../api/admin/resume.js';
import passwordHandler from '../api/admin/password.js';
import recoverHandler from '../api/admin/recover.js';
import { validateContent } from '../api/_lib/validate.js';
import portfolio from '../content/portfolio.json' with { type: 'json' };

process.env.PORTFOLIO_ADMIN_PASSWORD = 'local-test-password-only-12345';
process.env.PORTFOLIO_SESSION_SECRET = 'local-test-session-secret-only-123456789';
process.env.PORTFOLIO_RECOVERY_CODE = 'local-test-recovery-code-only-123456789';
process.env.PORTFOLIO_GITHUB_TOKEN = 'local-test-token';

const host = 'cloud-abdul-rahuman.vercel.app';
const headers = { host, origin: `https://${host}`, 'content-type': 'application/json' };
const fileSha = 'a'.repeat(40);
const pdf = readFileSync(new URL('../public/AbdulRahuman_ITEngineer(1).pdf', import.meta.url));

function response() {
  return {
    statusCode: 200,
    headers: {},
    setHeader(key, value) { this.headers[key] = value; },
    end(value) { this.body = JSON.parse(value); },
  };
}

function request(method, body, extraHeaders = {}) {
  return { method, body, headers: { ...headers, ...extraHeaders } };
}

function cookieFrom(result) {
  return result.headers['Set-Cookie'].split(';')[0];
}

test('admin content, password change and recovery keep secrets private and revoke old sessions', async (context) => {
  let credentialBytes = null;
  let credentialSha = fileSha;
  let contentPutStatus = null;
  const calls = [];
  context.mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push({ url, options });
    if (options.method === 'GET') {
      if (url.includes('.admin/credentials.json')) {
        if (!credentialBytes) return { ok: false, status: 404 };
        return { ok: true, json: async () => ({ type: 'file', encoding: 'base64', sha: credentialSha, content: credentialBytes.toString('base64') }) };
      }
      const bytes = url.includes('content/portfolio.json') ? Buffer.from(JSON.stringify(portfolio)) : pdf;
      return { ok: true, json: async () => ({ type: 'file', encoding: 'base64', sha: fileSha, content: bytes.toString('base64') }) };
    }
    const payload = JSON.parse(options.body);
    if (url.includes('content/portfolio.json') && contentPutStatus) {
      return { ok: false, status: contentPutStatus };
    }
    if (url.includes('.admin/credentials.json')) {
      credentialBytes = Buffer.from(payload.content, 'base64');
      credentialSha = 'b'.repeat(40);
    }
    return { ok: true, json: async () => ({ content: { sha: credentialSha }, commit: { sha: 'c'.repeat(40), html_url: 'https://github.com/example/commit/test' } }) };
  });

  const anonymous = response();
  await contentHandler(request('GET'), anonymous);
  assert.equal(anonymous.statusCode, 401);

  const wrongPassword = response();
  await login(request('POST', { password: 'wrong' }), wrongPassword);
  assert.equal(wrongPassword.statusCode, 401);

  const signedIn = response();
  await login(request('POST', { password: process.env.PORTFOLIO_ADMIN_PASSWORD }), signedIn);
  assert.equal(signedIn.statusCode, 200);
  assert.match(signedIn.headers['Set-Cookie'], /HttpOnly; SameSite=Strict/);
  assert.match(signedIn.headers['Set-Cookie'], /; Secure$/);
  const oldCookie = cookieFrom(signedIn);

  const verified = response();
  await session(request('GET', null, { cookie: oldCookie }), verified);
  assert.deepEqual(verified.body, { configured: true, authenticated: true });

  const crossSite = response();
  await contentHandler(request('PUT', { sha: fileSha, content: portfolio }, { cookie: oldCookie, origin: 'https://other.example' }), crossSite);
  assert.equal(crossSite.statusCode, 403);

  const invalid = structuredClone(portfolio);
  invalid.contact.email = 'invalid';
  const invalidResponse = response();
  await contentHandler(request('PUT', { sha: fileSha, content: invalid }, { cookie: oldCookie }), invalidResponse);
  assert.equal(invalidResponse.statusCode, 400);

  const loaded = response();
  await contentHandler(request('GET', null, { cookie: oldCookie }), loaded);
  assert.equal(loaded.statusCode, 200);
  assert.equal(loaded.body.content.contact.email, 'abdulrahuman1204@gmail.com');

  const changed = structuredClone(portfolio);
  changed.hero.role = 'Updated role';
  changed.customSections.push({ id: 'certifications', heading: 'Certifications', paragraphs: ['A new section.'] });
  changed.navigation.items.push({ label: 'Certifications', href: '#certifications' });
  assert.equal(validateContent(changed), null);
  const saved = response();
  await contentHandler(request('PUT', { sha: fileSha, content: changed }, { cookie: oldCookie }), saved);
  assert.equal(saved.statusCode, 200);
  const contentPut = calls.find((call) => call.options.method === 'PUT' && call.url.includes('content/portfolio.json'));
  const contentPayload = JSON.parse(contentPut.options.body);
  assert.equal(contentPayload.branch, 'main');
  assert.equal(JSON.parse(Buffer.from(contentPayload.content, 'base64').toString()).hero.role, 'Updated role');
  assert.equal(JSON.parse(Buffer.from(contentPayload.content, 'base64').toString()).navigation.items.at(-1).href, '#certifications');
  assert.equal(contentPut.options.headers.Authorization, 'Bearer local-test-token');

  contentPutStatus = 403;
  const denied = response();
  await contentHandler(request('PUT', { sha: fileSha, content: changed }, { cookie: oldCookie }), denied);
  assert.equal(denied.statusCode, 502);
  assert.match(denied.body.error, /Contents: Read and write/);
  contentPutStatus = null;

  const uploaded = response();
  await resumeHandler(request('PUT', { contentBase64: pdf.toString('base64') }, { cookie: oldCookie }), uploaded);
  assert.equal(uploaded.statusCode, 200);
  const resumePut = calls.find((call) => call.options.method === 'PUT' && call.url.includes('.pdf'));
  assert.deepEqual(Buffer.from(JSON.parse(resumePut.options.body).content, 'base64'), pdf);

  const changedPassword = response();
  await passwordHandler(request('PUT', { currentPassword: process.env.PORTFOLIO_ADMIN_PASSWORD, newPassword: 'new-unique-test-password-12345' }, { cookie: oldCookie }), changedPassword);
  assert.equal(changedPassword.statusCode, 200);
  assert.ok(credentialBytes);
  assert.doesNotMatch(credentialBytes.toString('utf8'), /new-unique-test-password-12345|local-test-password-only-12345/);
  assert.doesNotMatch(credentialBytes.toString('utf8'), /local-test-recovery-code-only-123456789/);
  const newCookie = cookieFrom(changedPassword);

  const staleSession = response();
  await session(request('GET', null, { cookie: oldCookie }), staleSession);
  assert.equal(staleSession.body.authenticated, false);
  const currentSession = response();
  await session(request('GET', null, { cookie: newCookie }), currentSession);
  assert.equal(currentSession.body.authenticated, true);

  const oldLogin = response();
  await login(request('POST', { password: process.env.PORTFOLIO_ADMIN_PASSWORD }), oldLogin);
  assert.equal(oldLogin.statusCode, 401);
  const newLogin = response();
  await login(request('POST', { password: 'new-unique-test-password-12345' }), newLogin);
  assert.equal(newLogin.statusCode, 200);

  const badRecovery = response();
  await recoverHandler(request('POST', { recoveryCode: 'wrong', newPassword: 'third-unique-test-password-12345' }), badRecovery);
  assert.equal(badRecovery.statusCode, 401);
  const crossSiteRecovery = response();
  await recoverHandler(request('POST', { recoveryCode: process.env.PORTFOLIO_RECOVERY_CODE, newPassword: 'third-unique-test-password-12345' }, { origin: 'https://other.example' }), crossSiteRecovery);
  assert.equal(crossSiteRecovery.statusCode, 403);

  const recovered = response();
  await recoverHandler(request('POST', { recoveryCode: process.env.PORTFOLIO_RECOVERY_CODE, newPassword: 'third-unique-test-password-12345' }), recovered);
  assert.equal(recovered.statusCode, 200);
  const afterRecovery = response();
  await session(request('GET', null, { cookie: newCookie }), afterRecovery);
  assert.equal(afterRecovery.body.authenticated, false);
  const recoverySession = response();
  await session(request('GET', null, { cookie: cookieFrom(recovered) }), recoverySession);
  assert.equal(recoverySession.body.authenticated, true);
  const replacedLogin = response();
  await login(request('POST', { password: 'new-unique-test-password-12345' }), replacedLogin);
  assert.equal(replacedLogin.statusCode, 401);
  const recoveredLogin = response();
  await login(request('POST', { password: 'third-unique-test-password-12345' }), recoveredLogin);
  assert.equal(recoveredLogin.statusCode, 200);
});

test('navigation rejects broken section links and unsafe URLs', () => {
  const broken = structuredClone(portfolio);
  broken.navigation.items.push({ label: 'Missing', href: '#missing' });
  assert.match(validateContent(broken), /does not exist/);
  broken.navigation.items.at(-1).href = 'javascript:alert(1)';
  assert.match(validateContent(broken), /https:\/\/ URL/);
  broken.navigation.items.at(-1).href = 'https://example.com';
  assert.equal(validateContent(broken), null);
});
