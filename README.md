# Abdul Rahuman portfolio

React/Vite portfolio deployed on Vercel. Public copy lives in `content/portfolio.json`. The password-protected editor at `/admin` can update every section, project and contact detail, replace the resume PDF, change the admin password, and recover access with a private recovery code. Saving content, a resume, or a password creates a commit on `main`; the connected Vercel project must deploy that commit before visitors see content changes.

The **Site & menu** tab lets the admin add, edit, reorder and remove navigation links. Use `#about`, `#skills`, `#contact` or another existing section ID for an internal link, or an `https://` URL for an external link. The **Custom sections** tab lets the admin add a new text section with a unique ID, heading and paragraphs; link to it from the menu with `#your-id`.

## Admin setup on Vercel

1. In GitHub, create a **fine-grained personal access token** for `AbdulRahumankm/Cloud_AbdulRahuman` only. Grant **Contents: Read and write**. Set an expiry and keep the token private. The token's account must be allowed to commit directly to `main` under repository branch rules.
2. In the Vercel project, open **Settings → Environment Variables**. Add the following to **Production**:

   | Name | Value |
   | --- | --- |
   | `PORTFOLIO_ADMIN_PASSWORD` | A unique password of at least 20 characters |
   | `PORTFOLIO_SESSION_SECRET` | A separate random secret of at least 32 characters |
   | `PORTFOLIO_RECOVERY_CODE` | A separate random recovery code of at least 24 characters; store a copy in your password manager |
   | `PORTFOLIO_GITHUB_TOKEN` | The GitHub token from step 1 |

3. Redeploy the latest `main` commit so the new environment variables are available to the functions.
4. Open `https://cloud-abdul-rahuman.vercel.app/admin`, sign in and edit a field. **Save & publish** commits the content to GitHub; wait for Vercel's deployment to complete, then check the live site. Replacing the resume accepts a PDF under 2 MB and commits it to `public/AbdulRahuman_ITEngineer(1).pdf`.

## Password change and recovery

- **Change password:** Sign in, open **Security** in the admin editor, enter the current password and a new one of at least 20 characters.
- **Forgot password:** On the sign-in page, select **Forgot password?**, enter the private recovery code and a new password. This requires the recovery code saved at setup; it does not send email.
- Both actions invalidate existing admin sessions. The password record is encrypted with `PORTFOLIO_SESSION_SECRET` before it is committed to `.admin/credentials.json`; the plaintext password and recovery code are never committed. The original `PORTFOLIO_ADMIN_PASSWORD` is only the bootstrap password until the first change or reset. Keep it configured, but it no longer signs in after that.
- If the recovery code is lost, the Vercel project owner can replace `PORTFOLIO_RECOVERY_CODE` in Production and redeploy. If `PORTFOLIO_SESSION_SECRET` is rotated, use the recovery code to set a new admin password afterward.

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

The public site imports `content/portfolio.json` at build time. The admin API checks a signed, HttpOnly session cookie and same-origin writes. It uses the server-only `PORTFOLIO_GITHUB_TOKEN` to update the content JSON, resume or encrypted password record through GitHub's Contents API. The token is never included in browser code. The content API validates the expected fields, contact email and outbound HTTPS links before committing. A concurrent edit is rejected so newer GitHub work is not overwritten.
