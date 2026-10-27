import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import login from '../api/admin/login.js';
import session from '../api/admin/session.js';
import contentHandler from '../api/admin/content.js';
import resumeHandler from '../api/admin/resume.js';
import portfolio from '../content/portfolio.json' with { type: 'json' };

process.env.PORTFOLIO_ADMIN_PASSWORD = 'local-test-password-only-12345';
process.env.PORTFOLIO_SESSION_SECRET = 'local-test-session-secret-only-123456789';
process.env.PORTFOLIO_GITHUB_TOKEN = 'local-test-token';

const host = 'cloud-abdul-rahuman.vercel.app';
const headers = { host, origin: `https://${host}`, 'content-type': 'application/json' };
const fileSha = 'a'.repeat(40);

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

test('admin session requires login, rejects cross-site writes, and publishes validated content', async (context) => {
  const anonymous = response();
  await contentHandler(request('GET'), anonymous);
  assert.equal(anonymous.statusCode, 401);

  const wrongPassword = response();
  login(request('POST', { password: 'wrong' }), wrongPassword);
  assert.equal(wrongPassword.statusCode, 401);

  const signedIn = response();
  login(request('POST', { password: process.env.PORTFOLIO_ADMIN_PASSWORD }), signedIn);
  assert.equal(signedIn.statusCode, 200);
  assert.match(signedIn.headers['Set-Cookie'], /HttpOnly; SameSite=Strict/);
  assert.match(signedIn.headers['Set-Cookie'], /; Secure$/);
  const cookie = signedIn.headers['Set-Cookie'].split(';')[0];

  const verified = response();
  session(request('GET', null, { cookie }), verified);
  assert.deepEqual(verified.body, { configured: true, authenticated: true });

  const crossSite = response();
  await contentHandler(request('PUT', { sha: fileSha, content: portfolio }, { cookie, origin: 'https://other.example' }), crossSite);
  assert.equal(crossSite.statusCode, 403);

  const invalid = structuredClone(portfolio);
  invalid.contact.email = 'invalid';
  const invalidResponse = response();
  await contentHandler(request('PUT', { sha: fileSha, content: invalid }, { cookie }), invalidResponse);
  assert.equal(invalidResponse.statusCode, 400);

  const calls = [];
  context.mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push({ url, options });
    if (options.method === 'GET') {
      return { ok: true, json: async () => ({ type: 'file', encoding: 'base64', sha: fileSha, content: Buffer.from(JSON.stringify(portfolio)).toString('base64') }) };
    }
    return { ok: true, json: async () => ({ content: { sha: 'b'.repeat(40) }, commit: { sha: 'c'.repeat(40), html_url: 'https://github.com/example/commit/test' } }) };
  });

  const loaded = response();
  await contentHandler(request('GET', null, { cookie }), loaded);
  assert.equal(loaded.statusCode, 200);
  assert.equal(loaded.body.content.contact.email, 'abdulrahuman1204@gmail.com');

  const changed = structuredClone(portfolio);
  changed.hero.role = 'Updated role';
  const saved = response();
  await contentHandler(request('PUT', { sha: fileSha, content: changed }, { cookie }), saved);
  assert.equal(saved.statusCode, 200);
  assert.equal(calls[1].options.method, 'PUT');
  const payload = JSON.parse(calls[1].options.body);
  assert.equal(payload.branch, 'main');
  assert.equal(payload.sha, fileSha);
  assert.equal(JSON.parse(Buffer.from(payload.content, 'base64').toString()).hero.role, 'Updated role');
  assert.equal(calls[1].options.headers.Authorization, 'Bearer local-test-token');

  const pdf = readFileSync(new URL('../public/AbdulRahuman_ITEngineer(1).pdf', import.meta.url));
  const uploaded = response();
  await resumeHandler(request('PUT', { contentBase64: pdf.toString('base64') }, { cookie }), uploaded);
  assert.equal(uploaded.statusCode, 200);
  const pdfPayload = JSON.parse(calls[3].options.body);
  assert.equal(pdfPayload.branch, 'main');
  assert.deepEqual(Buffer.from(pdfPayload.content, 'base64'), pdf);
});
