# ADR 0002: npm workspaces monorepo

- **Status:** accepted
- **Phase:** 0
- **Date:** 2026-09-26

## Context

The project will have several packages (`core`, `react`, `vue`, `svelte`) that must stay in sync with one signature.

## Decision

Use npm workspaces with packages under `packages/*`. Create only `core` now; each port is added in Phase 3 with its own ADR.

## Alternatives considered

- pnpm workspaces: faster and stricter, but requires an extra tool.
- npm plus Turborepo or Nx: build caching and orchestration, excessive for four packages.

## Consequences

- No extra tooling; ships with Node.
- Ports added incrementally keep each step small.

## Traceability

Objective 3, RNF04
