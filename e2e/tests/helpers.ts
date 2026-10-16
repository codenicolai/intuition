import fs from 'node:fs';
import path from 'node:path';

/** Snapshots and results go to the repository root `snapshots/` (git-ignored). */
export const SNAP_ROOT = path.resolve(import.meta.dirname, '../../snapshots');
// Local date (YYYY-MM-DD), so file names match the day of the run on the machine.
export const DATE = new Date().toLocaleDateString('sv-SE');

export function snapDir(...parts: string[]) {
  const dir = path.join(SNAP_ROOT, ...parts);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/** Prefixes a file name with the run date, e.g. `2026-10-12_01-page.png`. */
export const snap = (dir: string, name: string) => path.join(dir, `${DATE}_${name}`);
