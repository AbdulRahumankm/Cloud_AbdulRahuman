const REPOSITORY = 'AbdulRahumankm/Cloud_AbdulRahuman';
const BRANCH = 'main';

async function githubRequest(method, path, body) {
  const response = await fetch(`https://api.github.com/repos/${REPOSITORY}/contents/${path}${method === 'GET' ? '?ref=' + BRANCH : ''}`, {
    method,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.PORTFOLIO_GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      'User-Agent': 'Cloud-AbdulRahuman-Portfolio-Admin',
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });
  if (!response.ok) {
    const error = new Error(`GitHub returned ${response.status}.`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export async function getFile(path) {
  const file = await githubRequest('GET', path);
  if (file.type !== 'file' || file.encoding !== 'base64') {
    throw new Error('Unexpected GitHub file response.');
  }
  return {
    sha: file.sha,
    bytes: Buffer.from(file.content.replace(/\s/g, ''), 'base64'),
  };
}

export async function updateFile(path, bytes, sha, message) {
  const result = await githubRequest('PUT', path, {
    message,
    content: bytes.toString('base64'),
    sha,
    branch: BRANCH,
  });
  return {
    sha: result.content?.sha,
    commitSha: result.commit?.sha,
    commitUrl: result.commit?.html_url,
  };
}
