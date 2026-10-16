# e2e: cross-framework integration tests

Integration suite required by ADR 0014. Three minimal apps (no CSS) consume the local `@intuition-ui/core` and are tested with Playwright in Chromium.

| App | Stack | Port |
|---|---|---|
| `apps/react` | React 19 + Vite + TypeScript | 4301 |
| `apps/vue` | Vue 3 + Vite | 4302 |
| `apps/svelte` | Svelte 5 + Vite | 4303 |

Every app has the same two pages:

- `index.html`: `iu-button` inside a native form (name, e-mail, message; Send, Clear, Ghost `sm`).
- `port.html`: the same form using the framework port (`<Button>` from `@intuition-ui/react`, `<iu-button>` from `@intuition-ui/vue` in kebab-case, `<Button>` from `@intuition-ui/svelte`). The Vue app compiles `PortFormPage.vue` without `isCustomElement` (two plugin instances in its Vite config).
- `events.html`: `iu-event-probe` (test-only element in `shared/`) with four idiomatic listeners, one per event name spelling.

## Run

```sh
# 1. build the library
cd .. && npm install && npm run build
# 2. install and run the suite (isolated from the root workspaces)
cd e2e && npm install
npx playwright install chromium   # first time only
npm test
```

`PW_CHROMIUM_PATH=/path/to/chrome npm test` uses an existing Chromium instead.
The suite builds each app (`dist/`) and serves it with `vite preview`.

To open an app manually: `npm run dev:react` (or `dev:vue`, `dev:svelte`).

## Output

Results go to the repository root `snapshots/` (git-ignored), with the run date in each file name:

- `snapshots/button/<framework>/YYYY-MM-DD_*.png`: page, buttons (default, hover), focus, loading, submitted.
- `snapshots/events/YYYY-MM-DD_event-naming-<framework>.json`: which listener fired for each event name.

## Tests

- `tests/button.spec.ts`: rendering (variants, sizes, font, colors), proxy submit button, click submit with loading state, Enter submission, required validation, reset, ghost click, keyboard, visual snapshots.
- `tests/events.spec.ts`: event naming experiment (`iu-press`, `iupress`, `iuPress`).
- `tests/ports.spec.ts`: each port behaves like the raw element, logs no warnings and renders pixel-identical buttons.
- `tests/vue-kebab.spec.ts`: `<iu-button>` compiles to the Vue port component, and `isCustomElement` would bypass it.
- `tests/ports-report.spec.ts`: report for the thesis; same page with the raw element and with the port, code side by side and byte-identical screens (`snapshots/ports-report/`).
