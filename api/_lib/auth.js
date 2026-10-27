import { createHmac, timingSafeEqual } from 'node:crypto';
import { currentCredential } from './credentials.js';

const COOKIE_NAME = 'portfolio_admin_session';
const SESSION_SECONDS = 8 * 60 * 60;

export function adminConfigured() {
  return Boolean(
    process.env.PORTFOLIO_ADMIN_PASSWORD?.length >= 20 &&
    process.env.PORTFOLIO_SESSION_SECRET?.length >= 32 &&
    process.env.PORTFOLIO_RECOVERY_CODE?.length >= 24 &&
    process.env.PORTFOLIO_GITHUB_TOKEN
  );
}

export function sendJson(response, status, body) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.end(JSON.stringify(body));
}

export function allowMethod(response, methods) {
  response.setHeader('Allow', methods.join(', '));
  sendJson(response, 405, { error: 'Method not allowed.' });
}

export function isSameOrigin(request) {
  const origin = request.headers.origin;
  const host = request.headers.host;
  if (!origin || !host) return false;
  const local = /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host);
  return origin === `${local ? 'http' : 'https'}://${host}`;
}

export function readJsonBody(request) {
  if (!request.headers['content-type']?.startsWith('application/json')) return null;
  try {
    return typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
  } catch {
    return null;
  }
}

function signature(payload) {
  return createHmac('sha256', process.env.PORTFOLIO_SESSION_SECRET)
    .update(payload)
    .digest('base64url');
}

function cookieOptions(request, maxAge) {
  const local = /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(request.headers.host || '');
  return `Path=/api/admin; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${local ? '' : '; Secure'}`;
}

export function setSessionCookie(request, response, credentialVersion) {
  const payload = Buffer.from(JSON.stringify({
    version: 1,
    credentialVersion,
    expires: Date.now() + SESSION_SECONDS * 1000,
  })).toString('base64url');
  response.setHeader('Set-Cookie', `${COOKIE_NAME}=${payload}.${signature(payload)}; ${cookieOptions(request, SESSION_SECONDS)}`);
}

export function clearSessionCookie(request, response) {
  response.setHeader('Set-Cookie', `${COOKIE_NAME}=; ${cookieOptions(request, 0)}`);
}

export async function hasSession(request) {
  if (!adminConfigured()) return false;
  const raw = request.headers.cookie || '';
  const cookie = raw.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE_NAME}=`));
  if (!cookie) return false;
  const token = cookie.slice(COOKIE_NAME.length + 1);
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const expected = Buffer.from(signature(parts[0]));
  const supplied = Buffer.from(parts[1]);
  if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) return false;
  try {
    const claims = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
    if (claims.version !== 1 || !Number.isFinite(claims.expires) || claims.expires <= Date.now()) return false;
    const current = await currentCredential();
    return claims.credentialVersion === current.sessionVersion;
  } catch {
    return false;
  }
}

export async function requireSession(request, response) {
  if (await hasSession(request)) return true;
  sendJson(response, 401, { error: 'Please sign in again.' });
  return false;
}
