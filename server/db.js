import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// db.json is the "database" — plain JSON on disk, read/written on every request.
// Good enough for this practice project. Note: most free hosts (Railway, Fly.io,
// Render) give the container an ephemeral filesystem, so this file resets on
// every redeploy/restart. Fine for demoing the app; not a real persistence layer.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'db.json');

// Serializes writes so two requests racing to save don't clobber each other.
let writeQueue = Promise.resolve();

export async function readDb() {
  const raw = await readFile(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

export function writeDb(data) {
  writeQueue = writeQueue.then(() => writeFile(DB_PATH, JSON.stringify(data, null, 2)));
  return writeQueue;
}
