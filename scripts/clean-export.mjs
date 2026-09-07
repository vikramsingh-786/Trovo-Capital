/**
 * Strip macOS metadata from the static export.
 *
 * `next build` copies everything in `public/` verbatim into `out/`, including
 * Finder droppings like `.DS_Store` and AppleDouble `._*` files. Next has no
 * option to exclude them, so they are removed after the build instead — before
 * DevOps ever uploads `out/` to Cloudflare.
 */
import { readdir, rm } from "node:fs/promises";
import { join } from "node:path";

const JUNK = (name) => name === ".DS_Store" || name.startsWith("._");

async function clean(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return []; // nothing to clean
  }

  const removed = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      removed.push(...(await clean(path)));
    } else if (JUNK(entry.name)) {
      await rm(path);
      removed.push(path);
    }
  }
  return removed;
}

const removed = await clean("out");
console.log(
  removed.length
    ? `clean-export: removed ${removed.length} macOS metadata file(s):\n  ${removed.join("\n  ")}`
    : "clean-export: no macOS metadata files in out/",
);
