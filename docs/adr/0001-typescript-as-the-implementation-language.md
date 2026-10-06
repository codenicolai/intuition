# ADR 0001: TypeScript as the implementation language

- **Status:** accepted
- **Phase:** 0
- **Date:** 2026-09-26

## Context

The base signature (Custom Elements Manifest) is extracted from source code. Types make it richer and let framework ports ship typed APIs.

## Decision

Write all packages in TypeScript 7 (native compiler), emitting JavaScript plus `.d.ts` files. Lit decorators require `experimentalDecorators: true` and `useDefineForClassFields: false`.

## Alternatives considered

- JavaScript with JSDoc: no compile step, but weaker types for the CEM analyzer and the ports.
- TypeScript 5.x: more mature ecosystem, but TypeScript 7 already compiles Lit decorators (validated in Phase 0).

## Consequences

- Typed ports and better manifest extraction.
- The CEM analyzer bundles its own TypeScript parser; compatibility with TS 7 source must be checked in Phase 2.

## Traceability

Objective 1, RF01, RF02
