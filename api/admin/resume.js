import {
  allowMethod, isSameOrigin, readJsonBody, requireSession, sendJson,
} from '../_lib/auth.js';
import { getFile, updateFile } from '../_lib/github.js';

const RESUME_PATH = 'public/AbdulRahuman_ITEngineer(1).pdf';

export default async function handler(request, response) {
  if (request.method !== 'PUT') return allowMethod(response, ['PUT']);
  if (!await requireSession(request, response)) return;
  if (!isSameOrigin(request)) return sendJson(response, 403, { error: 'Request origin is not allowed.' });

  const body = readJsonBody(request);
  const encoded = body?.contentBase64;
  if (typeof encoded !== 'string' || encoded.length > 2_800_000 || !/^[A-Za-z0-9+/]*={0,2}$/.test(encoded)) {
    return sendJson(response, 400, { error: 'Choose a PDF smaller than 2 MB.' });
  }
  const bytes = Buffer.from(encoded, 'base64');
  if (
    bytes.length < 100 ||
    bytes.length > 2_000_000 ||
    bytes.subarray(0, 5).toString('ascii') !== '%PDF-' ||
    !bytes.subarray(-1024).toString('latin1').includes('%%EOF')
  ) {
    return sendJson(response, 400, { error: 'The selected file is not a valid PDF under 2 MB.' });
  }

  try {
    const current = await getFile(RESUME_PATH);
    const result = await updateFile(RESUME_PATH, bytes, current.sha, 'Update resume PDF from admin panel');
    return sendJson(response, 200, {
      commitSha: result.commitSha,
      commitUrl: result.commitUrl,
      message: 'Resume saved to GitHub. Vercel will publish it after deployment.',
    });
  } catch (error) {
    if (error.status === 409) return sendJson(response, 409, { error: 'Resume changed elsewhere. Try again after reloading.' });
    return sendJson(response, 502, { error: 'Could not update the resume on GitHub.' });
  }
}
