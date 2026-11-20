import { test } from "node:test";
import assert from "node:assert/strict";
import { createStore } from "../src/todos.js";

test("add and list todos", () => {
  const store = createStore();
  const a = store.add("write tests");
  const b = store.add("  ship it  ");
  assert.equal(a.id, 1);
  assert.equal(b.title, "ship it");
  assert.deepEqual(store.list().map((t) => t.id), [1, 2]);
});

test("rejects empty titles", () => {
  const store = createStore();
  assert.throws(() => store.add(""), TypeError);
  assert.throws(() => store.add("   "), TypeError);
  assert.throws(() => store.add(42), TypeError);
});

test("complete and remove", () => {
  const store = createStore();
  const { id } = store.add("task");
  assert.equal(store.complete(id).done, true);
  assert.equal(store.complete(999), null);
  assert.equal(store.remove(id), true);
  assert.equal(store.remove(id), false);
  assert.equal(store.get(id), null);
});
