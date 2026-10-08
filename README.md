# Sex or No Sex

A deliberately direct, one-phone game for 2–50 consenting adults. Each person answers privately. The app reveals only reciprocal YES pairs, or a simple NO SEX result. A result never removes anyone's right to change their mind.

Everything runs in the browser. Answers stay in React memory and disappear on refresh or **Start Over**. There is no backend, account, analytics, storage, or answer network request.

## Development

```bash
git clone https://github.com/USERNAME/REPOSITORY-NAME.git
cd REPOSITORY-NAME
npm install
npm run dev
```

Open the local URL printed by Vite. Node.js 22 is recommended.

## Test and build

```bash
npm test
npm run build
```

The production site is built into `dist/`. Use `npm run preview` to inspect it locally.

## Deploy to GitHub Pages

1. Push this repository to GitHub with `main` as its default branch.
2. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
3. Push to `main` or run the **Deploy to GitHub Pages** workflow manually.
4. Wait for the workflow to finish. The site will be at `https://USERNAME.github.io/REPOSITORY-NAME/`.

The workflow runs `npm ci`, tests, builds the Vite app, uploads `dist/`, and deploys through the official GitHub Pages Actions. Commit `package-lock.json` so `npm ci` works.

### Base path

`vite.config.ts` automatically reads `GITHUB_REPOSITORY` during GitHub Actions and sets Vite's base path to `/<repository-name>/`. Local development and local builds use `/`.

If the repository is renamed or hosted under a custom domain, set the `VITE_BASE_PATH` environment variable during the build. For example:

```bash
VITE_BASE_PATH=/new-repo-name/ npm run build
```

For a root custom domain, use `VITE_BASE_PATH=/`. The path must begin and end with `/`.

## Privacy

The app does not save individual answers. Keep the phone with the person whose turn it is. Refreshing the page clears the current session. Only mutual YES pairs are shown for groups; the two-person result never identifies who chose NO.
