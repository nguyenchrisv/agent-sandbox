# Rules for AI agents working in this repo

Two agents work here and their work is being compared:

| Agent | Platform | Commit author | Branch prefix |
|---|---|---|---|
| Sebastian | OpenClaw | `Sebastian (OpenClaw)` | `sebastian/` |
| Hermes | Hermes Agent | `Hermes (Hermes Agent)` | `hermes/` |

Both agents push using tokens on the repo owner's account, so PRs show as opened by @nguyenchrisv. Your commit author name and branch prefix are how your work is identified. End every PR description with a line: `— Sebastian` or `— Hermes`.

Follow these rules exactly.

## Branches and pull requests
- Never push to `main`. It is protected and pushes will be rejected.
- Create one branch per task using your prefix, e.g. `sebastian/add-due-dates` or `hermes/add-due-dates`.
- Open a pull request into `main` when the task is done. In the PR description include:
  1. What you changed and why
  2. How you tested it (commands you ran and their results)
  3. Anything you were unsure about or did not finish
- Keep PRs small and focused on the single task you were given.

## Code
- Node.js only, standard library only. Do not add dependencies unless the task explicitly asks for one.
- Run `npm test` before every push. All tests must pass.
- Add or update tests for every behaviour you change.
- Keep the existing style: ES modules, 2-space indentation, double quotes.

## Safety
- Never commit secrets, tokens, API keys, or `.env` files.
- Do not modify `.github/`, `AGENTS.md`, or `CODEOWNERS` unless the task explicitly asks you to.
- If a task is ambiguous, say so in the PR description instead of guessing silently.
