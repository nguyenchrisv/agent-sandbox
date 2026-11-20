// In-memory todo store. Deliberately small so agents have room to extend it.

export function createStore() {
  const items = new Map();
  let nextId = 1;

  return {
    list() {
      return [...items.values()];
    },

    get(id) {
      return items.get(id) ?? null;
    },

    add(title) {
      if (typeof title !== "string" || title.trim() === "") {
        throw new TypeError("title must be a non-empty string");
      }
      const item = { id: nextId++, title: title.trim(), done: false };
      items.set(item.id, item);
      return item;
    },

    complete(id) {
      const item = items.get(id);
      if (!item) return null;
      item.done = true;
      return item;
    },

    remove(id) {
      return items.delete(id);
    },
  };
}
