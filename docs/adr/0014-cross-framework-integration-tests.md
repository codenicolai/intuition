# ADR 0014: Cross-framework integration tests for every major change

- **Status:** accepted
- **Phase:** 1
- **Date:** 2026-10-12

## Context

Unit tests in `@web/test-runner` (ADR 0013) run the component in isolation. They did not catch two problems that only appeared when `iu-button` was used inside real framework apps: Enter not submitting the form and the font changing with the host page (see `docs/JOURNAL.md`, 2026-10-12). The research question is about reuse across frameworks (RNF01, RNF02), so integration in each framework must be verified as part of the process, and the evidence must be kept for the thesis.

## Decision

Every major change runs the same integration suite in three environments before it is considered done:

| Environment | Stack |
|---|---|
| React | React 19 + Vite + TypeScript |
| Vue | Vue 3 + Vite |
| Svelte | Svelte 5 + Vite |

**What counts as a major change**
- A new component.
- A change to the public API or base signature (attributes, properties, events, slots, CSS custom properties, parts).
- A change in behavior (forms, keyboard, focus, accessibility) or in the visual baseline.
- A new framework port (Phase 3) or a change in how the package is built or distributed.

**Test apps**
- One minimal app per framework, created with the official Vite template and stripped of all CSS, so only the component styles are visible.
- All three render the same page with the same markup, state and handlers, adapted only to each framework's syntax.
- The apps consume `@intuition-ui/core` from the local package (`file:../intuition/packages/core`), never from a published version.

**What the suite checks** (Playwright, Chromium)
- The component upgrades and renders with the expected variants, sizes, font, radius and colors.
- Behavior: click, disabled state, form submit and reset, Enter submission, required-field validation.
- Keyboard: Tab focus and activation with Space or Enter.
- Visual snapshots of the full page, each component state (default, hover, focus, loading) and side-by-side comparisons.
- Pixel comparison (RGB) of each component screenshot across the three frameworks, with React as reference. Elements are isolated with an outer margin before the screenshot so neighbors do not enter the clip.

**Evidence**
- Snapshots are saved to `snapshots/` (git-ignored), one folder per framework, file names prefixed with the run date (`YYYY-MM-DD_`), plus a dated `README.md` with the results table.
- Results and integration effort (lines and files changed per framework) are recorded in `docs/JOURNAL.md`.

## Alternatives considered

- Unit tests only: fast, but miss framework-specific behavior (property vs attribute binding, compiler warnings, form handling).
- Manual checks in existing projects (`bextTeste`, `portfolio`): global CSS (Tailwind, site themes) hides or changes the component look, and results are not repeatable.
- Test every change in all frameworks: too costly for small refactors; the "major change" list keeps the effort proportional.
- More frameworks (Angular, Solid, plain HTML): outside the approved scope (RF02); plain HTML is already covered by the demo page.

## Consequences

- Cross-framework regressions are caught before release, and every major step leaves dated visual evidence for the thesis.
- Snapshots are not versioned in git; they must be backed up or copied into the thesis material when needed.
- The suite and the three apps currently live outside the repository. Moving them into the repository (for example `e2e/`) would make runs reproducible by anyone; this is a separate decision.
- The first run (2026-10-12, after the Enter and font fixes): 27/27 tests passed, button screenshots identical across React, Vue and Svelte.

## Traceability

Objective 4, RF02, RNF01, RNF02, RNF04
