# PIANC-COPEDEC XI

Official mobile-first Progressive Web App for the **11th International Conference on Coastal and Port Engineering in Developing Countries (COPEDEC XI)**, hosted at IIT Madras, Chennai.

---

## 🚀 Deploy to GitHub Pages

### First-time setup

1. **Fork / push** this repo to your GitHub account.

2. Go to **Settings → Pages** in your repo:
   - Source: `GitHub Actions`

3. Add your Gemini API key as a secret:
   - Go to **Settings → Secrets and variables → Actions**
   - Click **New repository secret**
   - Name: `GEMINI_API_KEY`
   - Value: your key from [Google AI Studio](https://aistudio.google.com/apikey)

4. Push any commit to `main` — the GitHub Action will build and deploy automatically.

5. Your app will be live at:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```

### Custom domain (optional)
Add a `CNAME` file inside `public/` with your domain name, e.g.:
```
copedec2025.org
```
Then configure your DNS to point to GitHub Pages.

---

## 📱 Install as an App (PWA)

This app is a **Progressive Web App** — it can be installed on Android and iOS like a native app.

### Android
1. Open the deployed URL in **Chrome**
2. Tap the **"Add to Home Screen"** banner, or tap the ⋮ menu → **Install app**
3. The app installs and works offline

### iOS (Safari)
1. Open the URL in **Safari**
2. Tap the **Share** button → **Add to Home Screen**
3. Tap **Add**

### Generate an APK (Android Package)
To distribute as a proper `.apk` file, use **PWABuilder**:

1. Visit [pwabuilder.com](https://pwabuilder.com)
2. Enter your deployed GitHub Pages URL
3. Click **Start** → select **Android**
4. Download the APK and share it, or publish to the Play Store

---

## 🛠 Run Locally

**Prerequisites:** Node.js 18+

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env.local
# Edit .env.local and add your GEMINI_API_KEY

# 3. Start dev server
npm run dev
# Opens at http://localhost:3000
```

### Other commands
```bash
npm run build    # Production build → dist/
npm run preview  # Preview the production build locally
npm run lint     # TypeScript type-check
```

---

## 🖼 PWA Icons

Place your conference logo icons in `public/icons/`. Required sizes:

| File | Size |
|------|------|
| `icon-72x72.png` | 72×72 |
| `icon-96x96.png` | 96×96 |
| `icon-128x128.png` | 128×128 |
| `icon-144x144.png` | 144×144 |
| `icon-152x152.png` | 152×152 |
| `icon-192x192.png` | 192×192 |
| `icon-384x384.png` | 384×384 |
| `icon-512x512.png` | 512×512 |

You can generate all sizes from one image using [realfavicongenerator.net](https://realfavicongenerator.net) or [pwabuilder.com/image-generator](https://www.pwabuilder.com/imageGenerator).

---

## 🏗 Tech Stack

- **React 19** + **TypeScript**
- **Vite 6** (build tool)
- **Tailwind CSS v4**
- **Google Gemini AI** via `@google/genai`
- **PWA** — manifest + service worker

---

## 📄 License

© PIANC-COPEDEC XI. All rights reserved.
