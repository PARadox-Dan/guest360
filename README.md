# Guest 360 — Insight Discovery

A standalone version of the insight-discovery prototype, built for the [guest360](https://github.com/PARadox-Dan/guest360) repo.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Push to GitHub and publish

The **guest360** folder in this workspace is a complete, standalone app. To put it in your [guest360](https://github.com/PARadox-Dan/guest360) repo and go live:

1. **In the terminal, go into the guest360 folder and push to your repo** (repo is empty, so first push is easy):
   ```bash
   cd /Users/danowens/Documents/cursor-projects/prototyping-with-cursor/guest360
   git init
   git add .
   git commit -m "Add Guest 360 insight-discovery page"
   git remote add origin https://github.com/PARadox-Dan/guest360.git
   git branch -M main
   git push -u origin main
   ```

2. **Turn on GitHub Pages** (one-time):
   - On GitHub open **https://github.com/PARadox-Dan/guest360**
   - Go to **Settings** → **Pages**
   - Under **Build and deployment**, set **Source** to **GitHub Actions**

3. Wait for the **Deploy to GitHub Pages** workflow to finish (Actions tab). Then your site is live at:

   **https://paradox-dan.github.io/guest360/**

## Tech

- Next.js 15 (static export)
- React 19
- Deployed via GitHub Actions to GitHub Pages
