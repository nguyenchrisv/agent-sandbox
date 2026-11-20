import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "../src/server.js";

let server;
let base;

before(async () => {
  server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

test("health check", async () => {
  const res = await fetch(`${base}/health`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
});

test("create, fetch and delete a todo", async () => {
  const created = await fetch(`${base}/todos`, {
    method: "POST",
    body: JSON.stringify({ title: "from test" }),
  });
  assert.equal(created.status, 201);
  const { id } = await created.json();

  const fetched = await fetch(`${base}/todos/${id}`);
  assert.equal((await fetched.json()).title, "from test");

  const deleted = await fetch(`${base}/todos/${id}`, { method: "DELETE" });
  assert.equal(deleted.status, 204);
});

test("bad input returns 400", async () => {
  const res = await fetch(`${base}/todos`, { method: "POST", body: "{}" });
  assert.equal(res.status, 400);
});
