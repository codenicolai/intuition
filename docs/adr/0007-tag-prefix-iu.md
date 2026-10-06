# ADR 0007: Tag prefix `iu-`

- **Status:** accepted
- **Phase:** 0
- **Date:** 2026-09-26

## Context

Custom element names need a prefix with a hyphen. The proposal used `ui-`, which is generic and may collide with other libraries. Known prefixes to avoid include `sl-`, `wa-`, `cds-`, `md-`, `ion-`, `sp-`, `ix-`, `ino-` and `tui-`.

## Decision

Use the prefix `iu-` (from Intuition UI), e.g. `<iu-button>`. A web search found no library using it.

## Alternatives considered

- `intu-`, `intui-`: more readable, longer.
- `int-`: resembles "integer".
- `iui-`, `itn-`: short, less readable.
- `intuition-`: unambiguous, verbose.

## Consequences

- Short tags, easy to type and to generate.
- Short prefix has a higher theoretical collision risk; revisit if a conflict appears.
- Proposal examples (`ui-button`, `ui-press`) must be updated in the thesis.

## Traceability

RF01, RF03
