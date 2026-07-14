import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { randomUUID } from 'node:crypto';
import { readDb, writeDb } from './db.js';
import { openapiSpec } from './openapi.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'shopease-server', docs: '/docs' });
});

// ---- Users (fake auth: no hashing, no real sessions — practice project only) ----

app.get('/users', async (req, res) => {
  const { email, password } = req.query;
  const db = await readDb();
  let users = db.users;
  if (email) users = users.filter((u) => u.email === email);
  if (password) users = users.filter((u) => u.password === password);
  res.json(users.map(withoutPassword));
});

app.post('/users', async (req, res) => {
  const { name, email, password } = req.body ?? {};
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email, and password are required' });
  }

  const db = await readDb();
  if (db.users.some((u) => u.email === email)) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const user = { id: randomUUID(), name, email, password };
  db.users.push(user);
  await writeDb(db);
  res.status(201).json(withoutPassword(user));
});

function withoutPassword(user) {
  const { password, ...rest } = user;
  return rest;
}

// ---- Orders ----

app.get('/orders', async (req, res) => {
  const { userId } = req.query;
  const db = await readDb();
  let orders = db.orders;
  if (userId) orders = orders.filter((o) => o.userId === userId);
  res.json(orders);
});

app.post('/orders', async (req, res) => {
  const { userId, items, total, shipping } = req.body ?? {};
  if (!userId || !Array.isArray(items) || items.length === 0 || typeof total !== 'number') {
    return res.status(400).json({ error: 'userId, items (non-empty array), and total are required' });
  }

  const db = await readDb();
  const order = {
    id: randomUUID(),
    userId,
    items,
    total,
    shipping: shipping ?? null,
    status: 'Processing',
    date: new Date().toISOString(),
  };
  db.orders.push(order);
  await writeDb(db);
  res.status(201).json(order);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`shopease-server listening on port ${PORT}`);
});
