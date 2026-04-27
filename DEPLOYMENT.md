# Deploying E-commerce-web_site

Three pieces, in this order: **database → backend → frontend**. Each step
below tells you exactly what to click and what to paste.

---

## 1. MongoDB Atlas (database)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) → sign up (free) → **Create a cluster** → pick the **M0 Free** tier → any region close to you.
2. **Database Access** (left sidebar) → **Add New Database User** → username/password auth → save the password somewhere, you'll need it in a moment.
3. **Network Access** (left sidebar) → **Add IP Address** → **Allow Access From Anywhere** (`0.0.0.0/0`). Render's servers don't have a fixed IP, so this is required, not just convenient.
4. **Database → Connect** → **Drivers** → copy the connection string. It looks like:
   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Edit it: put your real password in place of `<password>`, and add a database name before the `?`:
   ```
   mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```
   Save this — it's your `MONGO_URI`.

---

## 2. Backend → Render

1. Push your latest code to GitHub first (Render deploys from the repo).
2. [render.com](https://render.com) → sign up with GitHub → **New +** → **Web Service** → pick `Azizbeccoder/E-commerce-web_site`.
3. Fill in:
   | Field | Value |
   |---|---|
   | Name | `ecommerce-api` (anything) |
   | Root Directory | `backend` |
   | Runtime | Node |
   | Build Command | `npm install` |
   | Start Command | `npm start` |
   | Instance Type | Free |

4. **Environment** tab → add these (values from your local `backend/.env`):
   | Key | Value |
   |---|---|
   | `MONGO_URI` | the Atlas string from step 1 |
   | `JWT_SECRET` | your existing secret (or generate a new one — see `.env.example`) |
   | `NODE_ENV` | `production` |
   | `PAYPAL_CLIENT_ID` | your PayPal sandbox client id |
   | `CLIENT_URL` | leave as `http://localhost:5173` for now — **you'll update this in step 4** once you have your Vercel URL |

5. **Create Web Service**. First deploy takes a few minutes — watch the Logs tab. When it says `Server running on port: ...`, it's live.
6. Copy the URL Render gives you, top of the page — something like `https://ecommerce-api-xxxx.onrender.com`. This is your **backend URL**.
7. Sanity check: open `https://ecommerce-api-xxxx.onrender.com/api/products` in a browser. You should get JSON back (an empty array is fine if the database has no products yet).

> Free-tier Render services sleep after 15 minutes idle and take ~30–50s to wake on the next request. That's normal for a portfolio project, not a bug.

**Railway** is a drop-in alternative if you'd rather use that: same env vars, Root Directory `backend`, Start Command `npm start`, and it gives you a URL the same way.

---

## 3. Frontend → Vercel

1. [vercel.com](https://vercel.com) → sign up with GitHub → **Add New → Project** → pick `Azizbeccoder/E-commerce-web_site`.
2. **Root Directory** → click Edit → set to `frontend`.
3. Framework Preset should auto-detect **Vite**. Build Command `npm run build`, Output Directory `dist` (defaults — leave them).
4. **Environment Variables** → add:
   | Key | Value |
   |---|---|
   | `VITE_API_URL` | your Render backend URL from step 2, e.g. `https://ecommerce-api-xxxx.onrender.com` |
5. **Deploy**. When it finishes, Vercel gives you a URL like `https://e-commerce-web-site.vercel.app`. This is your **live demo URL** — put it at the top of the README.

---

## 4. Connect the two (the step people skip)

Cookies and CORS only work when each side knows the other's exact URL.

1. Back in **Render** → your service → **Environment** → edit `CLIENT_URL` to your real Vercel URL:
   ```
   CLIENT_URL=https://e-commerce-web-site.vercel.app
   ```
   Save → Render redeploys automatically.
2. Open the Vercel URL, try registering an account, then logging in.
3. If login fails, open the browser DevTools → Network tab → click the failed request:
   - **CORS error in console** → `CLIENT_URL` on Render doesn't exactly match the Vercel URL (check for a trailing slash or `www`).
   - **Request succeeds but you're logged out on refresh** → the `jwt` cookie isn't being set. Confirm Render's `NODE_ENV` is exactly `production` — the cookie code only switches to cross-site mode (`SameSite=None; Secure`) when that's set.
   - **404 on every API call** → `VITE_API_URL` on Vercel doesn't match the Render URL, or has a typo. Redeploy after fixing it (env var changes need a redeploy to take effect).

---

## What was changed to make this deployable

The app originally assumed frontend and backend run on the same domain
(`localhost` in dev, via Vite's proxy). Splitting them across Vercel and
Render breaks two things silently, both fixed as part of this deploy prep:

- **No CORS was configured** (`cors` was installed but never used in
  `index.js`) — cross-origin requests would be blocked outright.
- **The auth cookie was `SameSite=Strict`** — browsers refuse to send a
  `Strict` cookie on a cross-site request, so login would appear to succeed
  but every subsequent request would look logged-out. It's now
  `SameSite=None; Secure` in production, `Lax` in local dev.

---

## Local development still works exactly as before

```bash
# backend
cd backend && npm install && npm run dev

# frontend, separate terminal
cd frontend && npm install && npm run dev
```

Leave `frontend/.env`'s `VITE_API_URL` empty locally — Vite's proxy
(`vite.config.js`) forwards `/api` calls to `localhost:5000` automatically.
