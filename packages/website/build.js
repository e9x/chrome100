import { createRequire } from "node:module";
import fs from "fs-extra";

const require = createRequire(import.meta.url);

try {
  await fs.rm("dist", { recursive: true, force: true });
} catch (err) {
  if (err?.code !== "ENOENT") throw err;
}
await fs.copy("public", "dist");
await fs.mkdir("dist/static/");
await fs.copy(
  require.resolve("github-markdown-css"),
  "dist/static/markdown.css"
);
await fs.copy(
  require.resolve("chrome-versions"),
  "dist/static/chrome-versions.js"
);
