// Minimal JSON API over the todo store, using only Node's standard library.
import http from "node:http";
import { createStore } from "./todos.js";

export function createServer(store = createStore()) {
  return http.createServer(async (req, res) => {
    const send = (status, body) => {
      res.writeHead(status, { "content-type": "application/json" });
      res.end(body === undefined ? "" : JSON.stringify(body));
    };

    const url = new URL(req.url, "http://localhost");
    const match = url.pathname.match(/^\/todos(?:\/(\d+))?$/);

    if (url.pathname === "/health") return send(200, { ok: true });
    if (!match) return send(404, { error: "not found" });

    const id = match[1] ? Number(match[1]) : null;

    try {
      if (req.method === "GET" && id === null) return send(200, store.list());
      if (req.method === "GET") {
        const item = store.get(id);
        return item ? send(200, item) : send(404, { error: "not found" });
      }
      if (req.method === "POST" && id === null) {
        let raw = "";
        for await (const chunk of req) raw += chunk;
        const { title } = JSON.parse(raw || "{}");
        return send(201, store.add(title));
      }
      if (req.method === "DELETE" && id !== null) {
        return store.remove(id) ? send(204) : send(404, { error: "not found" });
      }
      return send(405, { error: "method not allowed" });
    } catch (err) {
      return send(400, { error: err.message });
    }
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT ?? 3000);
  createServer().listen(port, () => console.log(`agent-sandbox listening on :${port}`));
}
