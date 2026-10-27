import { allowMethod, clearSessionCookie, isSameOrigin, sendJson } from '../_lib/auth.js';

export default function handler(request, response) {
  if (request.method !== 'POST') return allowMethod(response, ['POST']);
  if (!isSameOrigin(request)) return sendJson(response, 403, { error: 'Request origin is not allowed.' });
  clearSessionCookie(request, response);
  sendJson(response, 200, { authenticated: false });
}
