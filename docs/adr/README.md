# Architecture Decision Records

| ADR | Decision | Status | Phase |
|---|---|---|---|
| [0001](0001-typescript-as-the-implementation-language.md) | TypeScript 7 as the implementation language | accepted | 0 |
| [0002](0002-npm-workspaces-monorepo.md) | npm workspaces monorepo, `core` only for now | accepted | 0 |
| [0003](0003-first-proof-of-concept-with-the-button-only.md) | First proof of concept with the Button only | accepted | 0 |
| [0004](0004-lit-for-authoring-components.md) | Lit for authoring components | accepted | 0 |
| [0005](0005-distribution-tsc-esm-plus-esbuild-cdn-bundle.md) | tsc ESM plus esbuild CDN bundle | accepted | 0 |
| [0006](0006-name-and-brand-intuition-ui.md) | Name and brand: Intuition UI | accepted | 0 |
| [0007](0007-tag-prefix-iu.md) | Tag prefix `iu-` | accepted | 0 |
| [0008](0008-tooling-and-runtime.md) | Node 22, @web/dev-server, @web/test-runner, Biome | accepted | 0 |
| [0009](0009-mit-license.md) | MIT license | accepted | 0 |
| [0010](0010-repository-language-english.md) | Repository language: English | accepted | 0 |
| [0011](0011-python-backends-demo-only-outside-the-metrics.md) | Python backends: demo only, outside the metrics | accepted | 0 |
| [0012](0012-component-conventions.md) | Component conventions (styles, Shadow DOM, forms, Button API) | accepted | 1 |
| [0013](0013-test-setup.md) | Test setup (tests outside `src`, esbuild, @open-wc/testing) | accepted | 1 |
| [0014](0014-cross-framework-integration-tests.md) | Cross-framework integration tests (React, Vue, Svelte) for every major change | accepted | 1 |
| [0015](0015-react-port-generated-from-the-manifest.md) | React port (`@intuition-ui/react`) generated from the manifest with `@lit/react` | accepted | 3 |
| [0016](0016-vue-and-svelte-ports-generated-from-the-manifest.md) | Vue and Svelte ports generated from the manifest | accepted | 3 |

ADRs record major decisions only (architecture, public API, tooling, process).

Template: [template.md](template.md). Revised ADRs are never deleted; they are marked "superseded by ADR NNNN".
