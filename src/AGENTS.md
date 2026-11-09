## Hono CLI

Use the Hono CLI instead of a dev server to check routes. Run it as `bunx hono <command> src/app.ts`:

```bash
bunx hono routes src/app.ts        # list routes
bunx hono request / src/app.ts     # send one request
bunx hono batch - src/app.ts       # several requests from JSONL on stdin
bunx hono snapshot src/app.ts      # capture current behavior as batch lines
bunx hono diff                     # routes that answer differently from the last commit
```

- Always pass `src/app.ts`. It exports the app; `src/index.ts` only starts the server, so the CLI can't load it.
- Don't use `npx hono` (fails with Bun's `.exe` shim) or `bunx --bun hono` (crashes on Bun's runtime).
- Run `bunx hono --help` or `bunx hono <command> --help` for details.
