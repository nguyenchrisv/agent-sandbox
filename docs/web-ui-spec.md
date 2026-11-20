# Mini project: Todo Web UI

A small browser front-end for the existing todo API, built in four small PRs.
Everything stays **dependency-free**: Node standard library on the server, plain HTML/CSS/JavaScript in the browser (no frameworks, no build step, no CDN scripts).

Read `AGENTS.md` first. All of its rules apply.

## End state
Running `npm start` and opening `http://localhost:3000/` shows a page where you can:
- see all todos
- add a todo
- mark a todo done
- delete a todo
- filter All / Active / Done
- see clear error messages when something fails

## Target layout
```
src/
  todos.js        (existing store)
  server.js       (API + static file serving)
public/
  index.html
  app.js
  style.css
test/
  todos.test.js
  server.test.js
  static.test.js  (new, Task 2)
```

---

## Task 1: PATCH endpoint to complete a todo
**Branch:** `<prefix>/patch-complete` · **Issue:** "Task 1: PATCH /todos/:id"

The store already has `complete(id)`, but the API has no route for it.

**Acceptance criteria**
- `PATCH /todos/:id` with JSON body `{ "done": true }` marks the todo done and returns `200` with the updated todo.
- Unknown id → `404 { "error": "not found" }`.
- Body missing `done`, `done` not `true`, or invalid JSON → `400` with an `error` message.
- Existing behaviour is unchanged; all existing tests still pass.
- New tests cover: success, 404, invalid JSON, missing/false `done`.

**Out of scope:** un-completing (`done: false` → 400 is fine for now), any UI.

---

## Task 2: Serve static files from `public/`
**Branch:** `<prefix>/static-files` · **Issue:** "Task 2: static file serving"

**Acceptance criteria**
- `GET /` returns `public/index.html` with `content-type: text/html; charset=utf-8`.
- `GET /app.js` → `text/javascript; charset=utf-8`; `GET /style.css` → `text/css; charset=utf-8`.
- Unknown files → `404`.
- **Path traversal is impossible:** requests like `/../package.json`, `/%2e%2e/package.json` or `/..%2fsrc/server.js` must return `404` (or `400`), never file contents. Resolve the path and verify it stays inside `public/`.
- API routes (`/health`, `/todos…`) keep working exactly as before.
- Create minimal placeholder `public/index.html`, `public/app.js`, `public/style.css` so the tests have something to serve.
- New `test/static.test.js` covers: index, both content types, 404, and at least three traversal attempts.

---

## Task 3: The UI
**Branch:** `<prefix>/todo-ui` · **Issue:** "Task 3: todo UI"

**Acceptance criteria**
- `index.html`: a heading, an add-todo form (text input + button), a list, and a small status/error area.
- `app.js` uses `fetch` against the existing API to load, add, complete (PATCH from Task 1) and delete todos, re-rendering after each change.
- **Never use `innerHTML` with todo titles.** Build elements with `document.createElement` and `textContent`, so titles like `<img src=x onerror=alert(1)>` render as plain text.
- Empty or whitespace-only titles are rejected in the browser before sending, and the API's `400` message is shown if the server rejects one.
- Basic accessibility: the input has a `<label>`, buttons have clear text, and the form submits with Enter.
- `style.css`: clean and readable, no external fonts or assets.
- Server tests still pass. Describe the manual browser checks you did in the PR (or explain how you verified the page if you can't open a browser).

---

## Task 4: Filters and polish
**Branch:** `<prefix>/filters-polish` · **Issue:** "Task 4: filters + polish"

**Acceptance criteria**
- All / Active / Done filter buttons; the active filter is visibly highlighted and remembered when the page reloads (use `location.hash`, not cookies or storage).
- Empty-state message per filter (e.g. "Nothing done yet").
- Completed todos are visually distinct (e.g. strike-through + muted colour).
- Network failures show a friendly message instead of failing silently.
- No new server behaviour, so no new server tests are required. Keep the existing ones passing.

---

## Order and dependencies
Do the tasks **in order, one PR each**. Start each task from an up-to-date `main` *after the previous PR has been merged*. Don't stack branches.

## Review
Each PR is reviewed against these acceptance criteria plus `AGENTS.md`:
- conventional commits, one per logical change
- the PR description sections, including the self-review checklist
- tests for every behaviour change
- no dependencies, no secrets
- security items called out above (path traversal, `textContent`)
