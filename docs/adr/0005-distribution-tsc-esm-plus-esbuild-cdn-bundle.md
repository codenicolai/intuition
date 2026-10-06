# ADR 0005: Distribution: tsc ESM plus esbuild CDN bundle

- **Status:** accepted
- **Phase:** 0
- **Date:** 2026-09-26

## Context

Lit recommends publishing unbundled ES modules so applications can deduplicate Lit, and bundling only for CDN use ([Lit: Publishing](https://lit.dev/docs/tools/publishing/)). Consumers without a bundler (plain HTML, Django, Flask, Rails) cannot resolve the bare `lit` import without an import map.

## Decision

Publish two outputs from `@intuition-ui/core`:
1. `dist/`: unbundled ESM plus `.d.ts`, compiled by `tsc`, for applications with a bundler.
2. `dist/cdn/intuition.min.js`: single minified ESM file with Lit included, built by `esbuild`, exposed as `@intuition-ui/core/cdn`.

## Alternatives considered

- `tsc` only: simpler, but no-bundler users must configure an import map.
- Single bundle only: serves everyone, but JS apps may end up with two copies of Lit.
- Rollup or Vite library mode for the bundle: more configuration for the same result.

## Consequences

- Works for bundler-based apps and for any backend that renders HTML.
- Two outputs to keep consistent; bundle size of the CDN file is a Phase 7 metric.

## Traceability

RNF01, RNF02, RNF05
