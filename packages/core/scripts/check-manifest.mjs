// Fails when the committed custom-elements.json is out of date with the sources.
// Regenerates the manifest into a scratch folder and compares both files.
import { execFileSync } from 'node:child_process';
import { readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

// The analyzer resolves `outdir` inside the working directory, so the scratch
// folder lives under node_modules/.cache (ignored by git).
const scratch = join('node_modules', '.cache', 'cem-check');
rmSync(scratch, { recursive: true, force: true });
try {
  execFileSync(
    'npx',
    ['cem', 'analyze', '--config', 'custom-elements-manifest.config.mjs'],
    { stdio: 'ignore', env: { ...process.env, CEM_OUTDIR: scratch } },
  );
  const fresh = readFileSync(join(scratch, 'custom-elements.json'), 'utf8');
  const committed = readFileSync('custom-elements.json', 'utf8');
  if (fresh !== committed) {
    console.error(
      'custom-elements.json is out of date. Run `npm run analyze -w @intuition-ui/core` and commit the result.',
    );
    process.exit(1);
  }
  console.log('custom-elements.json is up to date.');
} finally {
  rmSync(scratch, { recursive: true, force: true });
}
