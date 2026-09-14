import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const staticBuild = resolve(root, "dist/client");
const deployment = resolve(root, "deploy-reg-ru");

await rm(deployment, { recursive: true, force: true });
await cp(staticBuild, deployment, { recursive: true });

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("deploy", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

for (const pathname of ["/", "/about", "/policy"]) {
  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  if (!response.ok) {
    throw new Error(`Unable to render ${pathname}: HTTP ${response.status}`);
  }

  const output = pathname === "/"
    ? resolve(deployment, "index.html")
    : resolve(deployment, pathname.slice(1), "index.html");

  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, await response.text(), "utf8");
}

await mkdir(resolve(deployment, "api"), { recursive: true });
await cp(resolve(root, "server/inquiry.php"), resolve(deployment, "api/inquiry.php"));

console.log(`REG.RU deployment prepared at ${deployment}`);
