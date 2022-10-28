import fs from "fs-extra";

try {
  await fs.rm("dist", { recursive: true, force: true });
} catch (err) {
  if (err?.code !== "ENOENT") throw err;
}

await fs.copy("public", "dist");
await fs.mkdir("dist/static/");
await fs.copy(
  "node_modules/github-markdown-css/github-markdown.css",
  "dist/static/markdown.css"
);
