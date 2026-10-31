import {
  allowMethod, isSameOrigin, readJsonBody, requireSession, sendJson,
} from '../_lib/auth.js';
import { getFile, updateFile } from '../_lib/github.js';
import { validateContent } from '../_lib/validate.js';

const CONTENT_PATH = 'content/portfolio.json';

export default async function handler(request, response) {
  if (!['GET', 'PUT'].includes(request.method)) return allowMethod(response, ['GET', 'PUT']);
  if (!await requireSession(request, response)) return;
  if (request.method === 'PUT' && !isSameOrigin(request)) {
    return sendJson(response, 403, { error: 'Request origin is not allowed.' });
  }

  try {
    if (request.method === 'GET') {
      const file = await getFile(CONTENT_PATH);
      const content = JSON.parse(file.bytes.toString('utf8'));
      const error = validateContent(content);
      if (error) return sendJson(response, 502, { error: 'Repository content needs repair.' });
      return sendJson(response, 200, { content, sha: file.sha });
    }

    const body = readJsonBody(request);
    if (!body || !/^[a-f0-9]{40}$/.test(body.sha || '')) {
      return sendJson(response, 400, { error: 'Reload the latest content before saving.' });
    }
    const error = validateContent(body.content);
    if (error) return sendJson(response, 400, { error });
    const bytes = Buffer.from(JSON.stringify(body.content, null, 2) + '\n', 'utf8');
    const result = await updateFile(CONTENT_PATH, bytes, body.sha, 'Update portfolio content from admin panel');
    return sendJson(response, 200, {
      sha: result.sha,
      commitSha: result.commitSha,
      commitUrl: result.commitUrl,
      message: 'Saved to GitHub. Vercel will publish the new content after deployment.',
    });
  } catch (error) {
    if ([409, 422].includes(error.status)) return sendJson(response, 409, { error: 'Content changed elsewhere or GitHub rejected the update. Reload and review before saving.' });
    if ([401, 403].includes(error.status)) return sendJson(response, 502, { error: 'GitHub rejected the write. Check that the token has Contents: Read and write for this repository and that main allows direct commits.' });
    return sendJson(response, 502, { error: `GitHub update failed (${error.status || 'network error'}). Try again later.` });
  }
}
