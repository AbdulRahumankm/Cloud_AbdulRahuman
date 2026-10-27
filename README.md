# Abdul Rahuman portfolio

React/Vite portfolio deployed on Vercel. Public copy lives in `content/portfolio.json`. The password-protected editor at `/admin` can update every section, project and contact detail, and replace the resume PDF. Saving content or a resume creates a commit on `main`; the connected Vercel project must deploy that commit before visitors see the change.

## Admin setup on Vercel

1. In GitHub, create a **fine-grained personal access token** for `AbdulRahumankm/Cloud_AbdulRahuman` only. Grant **Contents: Read and write**. Set an expiry and keep the token private. The token's account must be allowed to commit directly to `main` under repository branch rules.
2. In the Vercel project, open **Settings → Environment Variables**. Add the following to **Production**:

   | Name | Value |
   | --- | --- |
   | `PORTFOLIO_ADMIN_PASSWORD` | A unique password of at least 20 characters |
   | `PORTFOLIO_SESSION_SECRET` | A separate random secret of at least 32 characters |
   | `PORTFOLIO_GITHUB_TOKEN` | The GitHub token from step 1 |

3. Redeploy the latest `main` commit so the new environment variables are available to the functions.
4. Open `https://cloud-abdul-rahuman.vercel.app/admin`, sign in and edit a field. **Save & publish** commits the content to GitHub; wait for Vercel's deployment to complete, then check the live site. Replacing the resume accepts a PDF under 2 MB and commits it to `public/AbdulRahuman_ITEngineer(1).pdf`.

Enter private values in Vercel only. Do not put them in this repository, a public issue, or chat. If a token is exposed, revoke it and create a new one. Keep the existing Vercel Git integration connected to this repository; the admin endpoint does not deploy the site itself.

## Development

```sh
npm ci
npm run dev
npm run lint
npm run build
```

The Vite development server serves the public UI. Vercel Functions under `api/admin/` need Vercel's runtime to operate locally; the admin page's sign-in works on the deployed project after setup.

## How publishing works

The public site imports `content/portfolio.json` at build time. The admin API checks a signed, HttpOnly session cookie and same-origin writes. It uses the server-only `PORTFOLIO_GITHUB_TOKEN` to update the content JSON or resume through GitHub's Contents API. The token is never included in browser code. The content API validates the expected fields, contact email and outbound HTTPS links before committing. A concurrent content edit is rejected so newer GitHub work is not overwritten.
