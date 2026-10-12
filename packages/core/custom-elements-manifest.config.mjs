// Custom Elements Manifest: the base signature of the library (Phase 2).
// Generated from the TypeScript sources and their JSDoc tags.

/** Keeps only the public surface: drops private/protected members and `@internal` ones. */
function publicApiOnly() {
  return {
    name: 'intuition-public-api-only',
    packageLinkPhase({ customElementsManifest }) {
      for (const mod of customElementsManifest.modules) {
        for (const decl of mod.declarations ?? []) {
          if (!decl.members) continue;
          decl.members = decl.members.filter(
            (m) => !m.privacy || m.privacy === 'public',
          );
        }
      }
    },
  };
}

export default {
  globs: ['src/**/*.ts'],
  exclude: ['src/**/*.styles.ts'],
  // CEM_OUTDIR lets scripts/check-manifest.mjs write to a temporary folder.
  outdir: process.env.CEM_OUTDIR ?? '.',
  litelement: true,
  plugins: [publicApiOnly()],
};
