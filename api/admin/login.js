import {
  adminConfigured, allowMethod, isSameOrigin,
  readJsonBody, sendJson, setSessionCookie,
} from '../_lib/auth.js';
import { verifyPassword } from '../_lib/credentials.js';

export default async function handler(request, response) {
  if (request.method !== 'POST') return allowMethod(response, ['POST']);
  if (!adminConfigured()) return sendJson(response, 503, { error: 'Admin setup is incomplete.' });
  if (!isSameOrigin(request)) return sendJson(response, 403, { error: 'Request origin is not allowed.' });
  const body = readJsonBody(request);
  if (!body || typeof body.password !== 'string') return sendJson(response, 400, { error: 'Enter a password.' });
  try {
    const credential = await verifyPassword(body.password);
    if (!credential) return sendJson(response, 401, { error: 'Incorrect password.' });
    setSessionCookie(request, response, credential.sessionVersion);
    return sendJson(response, 200, { authenticated: true });
  } catch {
    return sendJson(response, 503, { error: 'Admin sign-in is temporarily unavailable.' });
  }
}
