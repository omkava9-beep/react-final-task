Phase 5: add `products.js` here — fetch wrapper around https://fakestoreapi.com/products.

Phase 7: add `auth.js` and `orders.js` here — fetch wrappers around the fake
backend (`server/`, started with `npm run server`). Read the base URL
from `import.meta.env.VITE_API_URL` (see `.env.example` at the repo root).

- `auth.js`: signup = `POST /users`, login = `GET /users?email=...&password=...`
- `orders.js`: place order = `POST /orders`, fetch history = `GET /orders?userId=...`
- Full request/response shapes are documented in the Swagger UI at `http://localhost:4000/docs` while the backend is running — try requests there before wiring up `fetch` calls.

Delete this file once you've added your service files.
