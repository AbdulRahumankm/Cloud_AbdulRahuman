import { adminConfigured, allowMethod, hasSession, sendJson } from '../_lib/auth.js';

export default function handler(request, response) {
  if (request.method !== 'GET') return allowMethod(response, ['GET']);
  sendJson(response, 200, {
    configured: adminConfigured(),
    authenticated: hasSession(request),
  });
}
