# agent-sandbox

A small, dependency-free Node.js todo API used as a shared practice repo for comparing
OpenClaw (Sebastian) and Hermes Agent (Bagman) on real coding tasks.

## Run

```bash
npm start          # listens on :3000 (override with PORT)
npm test           # node:test, no dependencies
```

## API

| Method | Path          | Description        |
|--------|---------------|--------------------|
| GET    | `/health`     | Health check       |
| GET    | `/todos`      | List todos         |
| GET    | `/todos/:id`  | Get one todo       |
| POST   | `/todos`      | Create `{ title }` |
| DELETE | `/todos/:id`  | Delete a todo      |

## How work gets in

Agents work on their own branches and open pull requests. `main` is protected:
PRs need passing CI and approval from @nguyenchrisv. See [AGENTS.md](AGENTS.md).
