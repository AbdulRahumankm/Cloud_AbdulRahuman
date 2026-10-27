import {
  adminConfigured, allowMethod, isSameOrigin, readJsonBody, sendJson, setSessionCookie,
} from '../_lib/auth.js';
import { recoveryCodeMatches, replacePassword } from '../_lib/credentials.js';
import { getFile } from '../_lib/github.js';

const CREDENTIAL_PATH = '.admin/credentials.json';

export default async function handler(request, response) {
  if (request.method !== 'POST') return allowMethod(response, ['POST']);
  if (!adminConfigured()) return sendJson(response, 503, { error: 'Admin setup is incomplete.' });
  if (!isSameOrigin(request)) return sendJson(response, 403, { error: 'Request origin is not allowed.' });

  const body = readJsonBody(request);
  if (
    typeof body?.recoveryCode !== 'string' ||
    typeof body?.newPassword !== 'string' ||
    body.newPassword.length < 20 ||
    body.newPassword.length > 256
  ) return sendJson(response, 400, { error: 'Enter your recovery code and a new password of 20–256 characters.' });
  if (!recoveryCodeMatches(body.recoveryCode)) {
    return sendJson(response, 401, { error: 'Recovery code is incorrect.' });
  }

  try {
    let sha;
    try {
      sha = (await getFile(CREDENTIAL_PATH)).sha;
    } catch (error) {
      if (error.status !== 404) throw error;
    }
    const result = await replacePassword(body.newPassword, sha);
    setSessionCookie(request, response, result.sessionVersion);
    return sendJson(response, 200, {
      message: 'Password reset. Other admin sessions have been signed out.',
      commitUrl: result.commitUrl,
    });
  } catch (error) {
    if ([409, 422].includes(error.status)) return sendJson(response, 409, { error: 'Password changed elsewhere. Please try again.' });
    return sendJson(response, 503, { error: 'Could not reset the password. Try again later.' });
  }
}
