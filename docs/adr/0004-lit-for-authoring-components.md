# ADR 0004: Lit for authoring components

- **Status:** accepted
- **Phase:** 0
- **Date:** 2026-09-26

## Context

The core must be framework agnostic and lightweight. Web Components run in the browser, so the same code serves JavaScript frameworks and server-rendered backends (including Python).

## Decision

Write components with Lit 3 (about 5 KB), as a runtime dependency of `@intuition-ui/core`.

## Alternatives considered

- Vanilla Custom Elements: zero dependencies, but rendering and reactivity written by hand.
- Stencil: generates framework wrappers automatically, heavier and more opinionated, and reduces the role of the signature-based ports.
- FAST: similar to Lit, smaller ecosystem.

## Consequences

- Reactive properties and templates out of the box; first-class support in the CEM analyzer and `@lit/react`.
- Adds one runtime dependency (RNF05).

## Traceability

Objective 2, RNF05
