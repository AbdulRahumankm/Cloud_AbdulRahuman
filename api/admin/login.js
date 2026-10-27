import {
  adminConfigured, allowMethod, isSameOrigin, passwordMatches,
  readJsonBody, sendJson, setSessionCookie,
} from '../_lib/auth.js';

export default function handler(request, response) {
  if (request.method !== 'POST') return allowMethod(response, ['POST']);
  if (!adminConfigured()) return sendJson(response, 503, { error: 'Admin setup is incomplete.' });
  if (!isSameOrigin(request)) return sendJson(response, 403, { error: 'Request origin is not allowed.' });
  const body = readJsonBody(request);
  if (!body || typeof body.password !== 'string') return sendJson(response, 400, { error: 'Enter a password.' });
  if (!passwordMatches(body.password)) return sendJson(response, 401, { error: 'Incorrect password.' });
  setSessionCookie(request, response);
  sendJson(response, 200, { authenticated: true });
}
