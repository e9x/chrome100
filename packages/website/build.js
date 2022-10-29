import { createRequire } from "node:module";
import { rm, cp, mkdir } from "node:fs/promises";

const require = createRequire(import.meta.url);

try {
  await rm("dist", { recursive: true, force: true });
} catch (err) {
  if (err?.code !== "ENOENT") throw err;
}

await cp("public", "dist", { recursive: true });
await mkdir("dist/static/");
await cp(require.resolve("chrome-versions"), "dist/static/chrome-versions.js");
