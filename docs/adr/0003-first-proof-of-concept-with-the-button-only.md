# ADR 0003: First proof of concept with the Button only

- **Status:** accepted
- **Phase:** 0
- **Date:** 2026-09-26

## Context

The pipeline (component, manifest, ports, AI docs, publication) must be validated end to end before investing in AI-specific components.

## Decision

The first component is `iu-button`. AI components (prompt input, streaming output, tool calls) come in Phase 6.

## Alternatives considered

- Start with an AI component: more relevant, but mixes pipeline problems with component complexity.

## Consequences

- Early validation of the whole pipeline.
- RF05 (AI catalog) is deferred to Phase 6.

## Traceability

Objective 2, RF05 (deferred)
