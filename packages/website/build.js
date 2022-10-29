import { rm, cp } from "node:fs/promises";

try {
  await rm("dist", { recursive: true, force: true });
} catch (err) {
  if (err?.code !== "ENOENT") throw err;
}

await cp("public", "dist", { recursive: true });
