# Spark Lab Storefront

Official web platform for **Spark Lab Sri Lanka** — providing IoT, robotics, electronics components, AI project building tools, and maker support.

> **Build. Test. Innovate.**

---

## Technical Stack

- **Frontend**: React 18, Vite, React Router 6, Lucide Icons
- **Catalog Management**: Google Sheets CSV API (No database or backend redeployment required)
- **AI Advisor**: Secure client-safe project advisor service with serverless AI integration support
- **Ordering**: Direct WhatsApp customer order integration
- **Styling**: Modern responsive CSS with custom design tokens, dark tech background themes, and responsive design

---

## Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Configure your Google Sheets catalog credentials in `.env`:
   ```env
   VITE_GOOGLE_SHEET_ID=your_google_sheet_id_here
   VITE_GOOGLE_SHEET_TAB=Website Products
   ```

> [!CAUTION]
> **Security Notice**: Never prefix private API keys (such as `OPENAI_API_KEY` or `GEMINI_API_KEY`) with `VITE_`. Store private API keys strictly in server-side function environment variables (e.g. Netlify Functions or Vercel Serverless Functions).

---

## Local Development Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Run Code Linting**:
   ```bash
   npm run lint
   ```

4. **Test Production Build Locally**:
   ```bash
   npm run build
   npm run preview
   ```

---

## Deployment Configuration & Instructions

The storefront is fully compatible with modern static web hosts (Netlify, Vercel, Cloudflare Pages).

### Netlify Deployment

1. Connect your GitHub repository to Netlify.
2. Build Settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
3. Environment Variables:
   - Add `VITE_GOOGLE_SHEET_ID` and `VITE_GOOGLE_SHEET_TAB` in **Site Settings > Environment Variables**.
4. SPA Routing is pre-configured via `public/_redirects`.

### Vercel Deployment

1. Connect your GitHub repository to Vercel.
2. Framework Preset: **Vite**
3. Build & Output Settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Environment Variables:
   - Add `VITE_GOOGLE_SHEET_ID` and `VITE_GOOGLE_SHEET_TAB` in **Project Settings > Environment Variables**.
5. SPA Routing is pre-configured via `vercel.json`.

---

## Deployment Checklist

Before triggering a public production release:

- [ ] Google Sheet tab `Website Products` is publicly accessible via link ("Anyone with the link can view").
- [ ] Environment variables (`VITE_GOOGLE_SHEET_ID`, `VITE_GOOGLE_SHEET_TAB`) are configured on the hosting provider.
- [ ] No private API secrets are exposed in client-side `VITE_` variables.
- [ ] `npm run lint` passes with 0 errors.
- [ ] `npm run build` generates `dist/` cleanly.
- [ ] Direct deep links (e.g., `/shop`, `/project-builder`, `/product/:slug`) render properly after browser refresh.
- [ ] WhatsApp ordering links open correctly on desktop and mobile.
