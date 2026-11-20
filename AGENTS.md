# Rules for AI agents working in this repo

Two agents work here and their work is being compared:

| Agent | Platform | Commit author | Branch prefix |
|---|---|---|---|
| Sebastian | OpenClaw | `Sebastian (OpenClaw)` | `sebastian/` |
| Bagman | Hermes Agent | `Bagman (Hermes Agent)` | `bagman/` |

Both agents push using tokens on the repo owner's account, so PRs show as opened by @nguyenchrisv. Your commit author name and branch prefix are how your work is identified. End every PR description with a line: `— Sebastian` or `— Bagman`.

Follow these rules exactly.

## Project
- Dependency-free Node.js todo API. Code in `src/`, tests in `test/`.
- Commands: `npm test` runs all tests; `node --test test/<file>.test.js` runs one file; `npm start` serves on `:3000`.

## Workflow
- Make minimal changes. Do the task you were given; don't refactor unrelated code.
- Run `npm test` after every change and fix failures before moving on. Add or update tests for every behaviour you change.
- If you're unsure between two approaches, pick the simpler one and explain the alternative in the PR description.

## Commits
- One commit per logical change. Use conventional prefixes: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.
- Subject line under ~50 characters; add a short body explaining *why* when it isn't obvious.

## Branches and pull requests
- Never push to `main`. It is protected and pushes will be rejected.
- Create one branch per task using your prefix, e.g. `sebastian/add-due-dates` or `bagman/add-due-dates`.
- Open a pull request into `main` when the task is done. In the PR description include:
  1. **What** you changed and **why**
  2. **How you tested it**: the commands you ran and their results
  3. **Self-review**: check your own diff for bugs, security issues and style. List findings grouped as CRITICAL / WARNING / INFO, ending with "X critical, Y warnings, Z info" (fix all CRITICAL before opening the PR)
  4. **Uncertainties**: anything you weren't sure about or didn't finish
- Keep PRs small and focused on the single task you were given.

## Code
- Node.js standard library only. **Do not add dependencies** unless the task explicitly asks for one; installing packages runs third-party code.
- Keep the existing style: ES modules, 2-space indentation, double quotes.
- No leftover debug logging (`console.log`) outside `src/server.js` startup.

## Out of scope (don't modify unless the task explicitly asks)
- `.github/` (CI workflows, CODEOWNERS)
- `AGENTS.md` (this file; the repo owner maintains it)
- `package.json` `engines`/`scripts`, `.gitignore`

## Safety
- Never commit secrets, tokens, API keys, or `.env` files.
- If a task is ambiguous, say so in the PR description instead of guessing silently.

## Maintaining these rules (repo owner)
When an agent makes a mistake, add a one-line rule here so it doesn't happen again. Prune duplicates and outdated rules periodically to keep this file short.
