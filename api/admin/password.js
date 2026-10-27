import {
  adminConfigured, allowMethod, isSameOrigin, readJsonBody, requireSession,
  sendJson, setSessionCookie,
} from '../_lib/auth.js';
import { replacePassword, verifyPassword } from '../_lib/credentials.js';

export default async function handler(request, response) {
  if (request.method !== 'PUT') return allowMethod(response, ['PUT']);
  if (!adminConfigured()) return sendJson(response, 503, { error: 'Admin setup is incomplete.' });
  if (!await requireSession(request, response)) return;
  if (!isSameOrigin(request)) return sendJson(response, 403, { error: 'Request origin is not allowed.' });

  const body = readJsonBody(request);
  if (
    typeof body?.currentPassword !== 'string' ||
    typeof body?.newPassword !== 'string' ||
    body.newPassword.length < 20 ||
    body.newPassword.length > 256
  ) return sendJson(response, 400, { error: 'Enter your current password and a new password of 20–256 characters.' });
  if (body.currentPassword === body.newPassword) {
    return sendJson(response, 400, { error: 'Choose a different new password.' });
  }

  try {
    const current = await verifyPassword(body.currentPassword);
    if (!current) return sendJson(response, 401, { error: 'Current password is incorrect.' });
    const result = await replacePassword(body.newPassword, current.sha);
    setSessionCookie(request, response, result.sessionVersion);
    return sendJson(response, 200, {
      message: 'Password changed. Other admin sessions have been signed out.',
      commitUrl: result.commitUrl,
    });
  } catch (error) {
    if ([409, 422].includes(error.status)) return sendJson(response, 409, { error: 'Password was changed elsewhere. Sign in again.' });
    return sendJson(response, 503, { error: 'Could not change the password. Try again later.' });
  }
}
