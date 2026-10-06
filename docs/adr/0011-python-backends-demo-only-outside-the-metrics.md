# ADR 0011: Python backends: demo only, outside the metrics

- **Status:** accepted
- **Phase:** 0
- **Date:** 2026-09-26

## Context

Web Components run in the browser, so any backend that renders HTML can use them. Python frameworks such as NiceGUI accept arbitrary tags through `ui.element` ([docs](https://nicegui.io/documentation/element)); Reflex wraps React components only ([docs](https://reflex.dev/docs/custom-components/overview/)).

## Decision

Include a lightweight Python demo (Django, Flask or NiceGUI using the CDN bundle) as evidence of agnosticism. Metrics remain in React, Vue and Svelte, as in the approved proposal.

## Alternatives considered

- Future work only.
- Include Python in the metrics: expands the approved scope; would require the advisor's agreement.

## Consequences

- Strengthens the agnosticism claim at low cost.
- Depends on ADR 0005 (CDN bundle).

## Traceability

Objective 4, RNF02
