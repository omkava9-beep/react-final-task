# React Capstone Task — "ShopEase" (Mini E-Commerce Store)

- **For:** Interns who have completed Sections 1–23 of the React course
- **Duration:** 2 working days (~16 hours), broken into 8 phases
- **AI tools:** ❌ Not allowed for writing code or logic (Google/MDN/official docs are fine)
- **UI/Design:** ✅ Provided separately (HTML/CSS). You only write the React logic — component structure, state, hooks, routing, API calls, forms, auth.
- **Submission:** Public GitHub repo + live deployed link (Vercel/Netlify) + README

---

## 0. Before You Start — Readiness Check

You should be able to answer these confidently without looking anything up. If not, go back and revise before starting the clock:

1. What's the difference between state and props?
2. When does a component re-render?
3. Why can't you call hooks conditionally?
4. What's the difference between `useState` and `useReducer` — when would you pick one over the other?
5. What problem does Context solve? What problem does it *not* solve (i.e. why does Redux still exist)?
6. What does the dependency array in `useEffect` actually do? What happens with `[]` vs no array vs `[x]`?
7. What is a controlled input?
8. What's the difference between a portal and just rendering a `<div>` normally?

If any of these feel shaky, this is the moment to fix that — not mid-task.

---

## 1. The Project

**ShopEase** is a small e-commerce storefront. A user can:

- Browse a product catalog (name, image, price, category)
- Search and filter products (by category, by price)
- View a product detail page
- Add/remove products to a cart, update quantity
- See the cart total update live
- Sign up / log in / log out
- Check out (shipping details form → order summary → place order) — checkout is only reachable when logged in
- View their past orders on an "My Orders" page
- See loading and error states while data is fetched
- See a friendly fallback UI if something crashes, instead of a blank white screen

The **HTML/CSS/JSX markup and styling will be provided to you.** Your job is entirely the *logic layer*: wiring up state, effects, context, reducers, Redux, routing, forms, and auth around that markup. Do not spend time on visual design — copy what's provided and make it work.

### Tech stack — allowed, and nothing else
- React (Vite, functional components + hooks — one class component required, see Phase 8)
- React Router v6+ (routing only)
- Redux Toolkit (state management only)
- A small custom Node/Express server (`server/`) as a fake backend for users/orders — its own process, its own port, persists to `server/db.json` on disk. Talk to it with native `fetch`, exactly like a real REST API (used purely as a backend, not as a UI/logic shortcut)
- [Fake Store API](https://fakestoreapi.com/) (or any similar free public product API) as your product catalog source, fetched with native `fetch`


### 🚫 No other third-party libraries — at all
This task exists to prove you can build things with plain React/JS, not that you can install a package that does it for you. Specifically **not allowed**:
- Drag-and-drop libraries — not needed here, but the rule stands generally.
- Form libraries (`react-hook-form`, `formik`, `yup`, etc.) — write the checkout form's controlled inputs and validation by hand.
- HTTP libraries (`axios`) — use `fetch`.
- UI/component kits (MUI, Ant Design, Bootstrap, Chakra, shadcn, etc.) — the provided HTML/CSS is all the UI you get.
- Icon packs, animation libraries, toast/notification libraries, carousels/sliders — build any of this yourself with plain JS/CSS if it's part of the provided design.
- Any utility library (`lodash`, `classnames`, `uuid`, etc.) — write the few lines of JS yourself instead.

If you genuinely think you need something outside this list, ask first — don't just `npm install` your way past a hard part. Struggling through the hard part with plain hooks and vanilla JS is the actual point of this task.

### Suggested folder structure
```
src/
  components/       → dumb/presentational components (given markup goes here)
  pages/            → route-level components (Home, ProductDetail, Cart, Checkout, Login, Signup, Orders, NotFound)
  context/          → AuthContext (Context + useReducer)
  hooks/            → custom hooks (useLocalStorage, useFetch, useDebounce, etc.)
  store/            → Redux Toolkit slices + store config (cart, orders)
  services/         → API calls (products.js, auth.js, orders.js)
  App.jsx
  main.jsx
server/             → the fake backend (separate Node/Express app, own package.json)
  index.js          → routes: GET/POST /users, GET/POST /orders
  db.js             → reads/writes db.json
  db.json           → the "database" (plain JSON on disk)
```

### Running the provided boilerplate
This repo already has Phase 1 done for you — Vite + Tailwind set up, all pages/components built as static markup with dummy data. You're starting from Phase 2.

- `npm install` at the repo root, then `npm install --prefix server` (or `cd server && npm install`) for the backend
- `npm run dev` — frontend, on `http://localhost:5173`
- `npm run server` — the fake backend, on `http://localhost:4000`. You only need this from Phase 7 onward (auth/orders), but it's harmless to leave running the whole time.
- Copy `.env.example` to `.env.local` if you want to change the backend URL the frontend calls (defaults to `http://localhost:4000`).
- The backend is a normal Express app (`server/index.js`) with Swagger UI at `http://localhost:4000/docs` — open it and try the `/users` and `/orders` endpoints there before wiring up `fetch` calls, so you know the exact request/response shape instead of guessing.
- It's plain JSON-on-disk, not a real database — when you deploy it (Railway/Fly.io/Render/etc.), most free tiers have an ephemeral filesystem, so `db.json` resets on redeploy/restart. That's expected for this task; call it out as a known limitation in your README rather than trying to work around it.

### Ground rules
- **Commit after every phase**, not just at the end. Each phase below has a suggested commit message — use it or something equally descriptive. A single giant commit at the end tells us you didn't actually work in phases, and it will be treated as not meeting the requirement.
- Write clean, readable code: meaningful names, no commented-out dead code, no `console.log` left in the final version.
- Handle loading and error states everywhere you fetch data. "It works when the network is fast and nothing goes wrong" is not production-level.
- If you get stuck for more than ~20 minutes on one thing, note it in your README under "Challenges" and move on — partial, honest progress beats a perfect but incomplete submission.

---

## Phase 1 — Project Setup & Static UI Wiring (1.5h)

**Goal:** Get the provided design running as real React components.

- Scaffold the app with Vite.
- Set up ESLint/ˀ (optional but recommended).
- Break the provided HTML/CSS into logical components (`Navbar`, `ProductCard`, `ProductGrid`, `CartIcon`, `CartItem`, `Modal`, `Button`, etc.) and folders as above.
- Get the static (non-functional) UI rendering pixel-identical to the provided design, using hardcoded/dummy product data passed via **props**.
- No state or logic yet — this phase is purely: markup → components → props.

**Commit:** `chore: project setup + static UI converted to components`

---

## Phase 2 — Component Architecture, Props & Local State (2h)

**Goal:** Make the store interactive using only `useState`.

- Implement Add to Cart, Remove from Cart, and Update Quantity — all via local state (`useState`) in a parent component, passed down through props.
- Implement client-side filtering (by category, by price range) and search (by product name) on the catalog page — again, plain `useState`.
- Show a live cart total (item count + price) computed from that state.
- Practice prop drilling here on purpose (you'll fix it in Phase 3) — pass the cart state and handlers down 2–3 levels so you *feel* the pain Context solves.

**Commit:** `feat: cart CRUD and product filtering with local state`

---

## Phase 3 — Context API + useReducer for Global State (2h)

**Goal:** Remove prop drilling for the cart.

- Create a `CartContext` + `useReducer` (actions: `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QUANTITY`, `CLEAR_CART`). This replaces the prop-drilled cart state from Phase 2.
- Any component that needs cart data (navbar cart icon, cart page, checkout summary) should now consume it via `useContext`, not via props passed down multiple levels.
- Derive the cart total/item count from the reducer's state wherever it's needed, instead of storing it separately (avoid duplicated/out-of-sync state).

**Commit:** `refactor: migrate cart state to Context + useReducer`

---

## Phase 4 — Side Effects, Custom Hooks & Persistence (2h)

**Goal:** Make the cart survive a refresh and extract reusable logic.

- Write a custom hook `useLocalStorage(key, initialValue)` and use it so the cart persists across page reloads (so a user doesn't lose their cart if they refresh).
- Use `useEffect` correctly: sync cart state to `localStorage` on every change.
- Write a `useDebounce` custom hook and use it on the product search input, so filtering doesn't re-run on every keystroke.
- Be deliberate about dependency arrays — no infinite loops, no missing-dependency warnings you can't explain.

**Commit:** `feat: cart persistence via localStorage + custom hooks (useLocalStorage, useDebounce)`

---

## Phase 5 — Fetching the Catalog, HTTP States & the Checkout Form (3h)

**Goal:** Replace hardcoded products with a real API, and build a proper checkout form.

- Fetch the product catalog from [Fake Store API](https://fakestoreapi.com/products) (or similar) using native `fetch`, wrapped in a `services/products.js`.
- Every async operation must show: a loading state, a success state, and an error state (with a retry option on failure). No silent failures. Apply this to the product listing and the product detail page (fetch by id).
- Build a proper **Checkout form**: controlled inputs (name, address, city, postal code, payment-style dummy fields), validation (required fields, postal code format, etc.), inline error messages, and a `useRef` to auto-focus the first field when the checkout page loads.
- Use a portal (`createPortal`) to render an "Order Confirmation" modal (shown after a successful order) outside the normal DOM hierarchy, into a `#modal-root`.

**Commit:** `feat: fetch product catalog from API with loading/error states + validated checkout form via portal`

---

## Phase 6 — Redux Toolkit Migration (2h)

**Goal:** Get hands-on with Redux as an alternative to Context for larger-scale state.

- Install Redux Toolkit, set up a `store`, and create a `cartSlice` (using `createSlice`) that mirrors the actions from your `CartContext` reducer.
- Migrate cart state from Context+useReducer to Redux.
- Create an `ordersSlice` with a `createAsyncThunk` for placing an order (POSTs the cart + shipping details to the fake backend's `/orders` endpoint under the logged-in user's id) and for fetching a user's past orders (`GET /orders?userId=...`), with `pending/fulfilled/rejected` handled via `extraReducers`.
- Remove the now-unused `CartContext` code once Redux fully replaces it.

**Commit:** `refactor: migrate cart state to Redux Toolkit + add orders slice with async thunks`

---

## Phase 7 — Routing & Authentication (2.5h)

**Goal:** Turn this into a real multi-page app with protected checkout/orders.

- Set up React Router: `/` (product listing), `/products/:id` (product detail), `/cart`, `/checkout`, `/login`, `/signup`, `/orders` (My Orders), and a catch-all 404 page.
- Start the fake backend alongside the frontend: `npm run server` (runs the Express app in `server/`, on its own port, reading/writing `server/db.json`). It stays running the whole time you work on auth/orders.
- Implement auth against the fake backend, in `services/auth.js`:
  - **Sign up:** `POST /users` with `{ name, email, password }` (this task doesn't require hashing — it's a fake backend for local practice, not production).
  - **Log in:** `GET /users?email=...&password=...` and check you got a match back.
  - **Log out:** clear the stored session.
  - Persist the logged-in user (e.g. in `localStorage`) so a refresh doesn't log them out.
- Store the authenticated user in an `AuthContext` (Context + `useReducer`, similar pattern to Phase 3 — this is intentional, so you use Context for auth even though cart moved to Redux, and understand when each tool fits).
- Create a `ProtectedRoute` wrapper — unauthenticated users trying to access `/checkout` or `/orders` should be redirected to `/login` (browsing the catalog and adding to cart should still work while logged out).
- "My Orders" page fetches and lists the logged-in user's past orders from the fake backend (`GET /orders?userId=...`).

**Commit:** `feat: routing, auth (signup/login/logout), and protected checkout/orders routes`

---

## Phase 8 — Portals/Refs Polish, Class Component, Optimization & Deployment (1h)

**Goal:** Final production touches, then ship it.

- Add **one class-based component**: an `ErrorBoundary` (this is one of the few genuinely practical uses of class components in modern React — wrap your route content in it so a crash shows a fallback UI instead of a blank screen).
- Apply at least one real optimization and be ready to explain *why* it was needed: `React.memo` on `ProductCard` (so re-filtering the list doesn't re-render every unchanged card), or `useMemo`/`useCallback` where you can show it prevents wasted work. Don't sprinkle these everywhere "just in case" — that's not what they're for.
- Quick pass: remove leftover `console.log`s, dead code, unused imports.
- Deploy **both** halves of the app:
  - Frontend (`/`) to Vercel/Netlify.
  - Backend (`server/`) to Railway/Fly.io/Render or similar. Set the frontend's `VITE_API_URL` env var (on the hosting platform, not just locally) to the deployed backend's URL.
  - This is not optional — auth and orders only work on the live link if the backend is actually deployed and reachable.
- Confirm the live link actually works end-to-end: browsing, cart, signup/login/logout against the live backend, checkout, placing an order, viewing it on My Orders, and refresh-on-a-sub-route all functioning.
- Write the README (see below).

**Commit:** `feat: error boundary + performance optimization` and `chore: deploy + README`

---

## README requirements (in the repo root)

- Short project description
- Tech stack used
- How to run locally, including that the fake backend needs to run alongside the frontend (`npm run server`, then `npm run dev` in a second terminal) — call out the backend's URL/port if you changed it, and mention any `.env` variables needed (never commit real secrets, use `.env.example`)
- Live link(s) — **both** the deployed frontend (Vercel/Netlify) and the deployed backend (Railway/Fly.io/Render/etc.), with `VITE_API_URL` on the frontend deployment pointing at the deployed backend's URL. Auth/orders must actually work on the live link, not just locally
- Phase checklist (copy the 8 phases above, check off what's done)
- "Challenges" section: anything you got stuck on and how you resolved it (or didn't)

## Submission

Reply with:
1. Public GitHub repo link (commit history should visibly show the phase-by-phase progression)
2. Live deployed frontend link
3. Live deployed backend link (the `server/` app)

---

## What we're actually evaluating

Not pixel-perfection (that's the provided design's job) — we're looking at:
- Do you reach for the *right* tool (state vs context vs reducer vs Redux) rather than the first one you remember?
- Do you handle loading/error/empty states, or only the happy path?
- Is your code something a teammate could read and extend without a walkthrough?
- Does the commit history actually reflect incremental, phase-based work?
