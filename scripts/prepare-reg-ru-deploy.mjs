import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const staticBuild = resolve(root, "dist/client");
const deployment = resolve(root, "deploy-reg-ru");

await rm(deployment, { recursive: true, force: true });
await cp(staticBuild, deployment, { recursive: true });

const replacedImageAssets = [
  "hero-protected-facility.png",
  "about-hero.png",
  ...["audit", "project", "build", "service"].map((name) => `services/${name}.jpg`),
  ...["tek", "energy", "communications", "industrial", "nuclear", "transport", "government", "lifesupport"].map((name) => `objects/${name}.jpg`),
  ...Array.from({ length: 16 }, (_, index) => `company/project-${String(index + 1).padStart(2, "0")}.jpg`),
  "construction/system-overview.png",
  "construction/system-layout.png",
  "construction/net-view-01.png",
  "construction/net-view-01.jpg",
  "construction/net-view-02.jpg",
];

await Promise.all(
  replacedImageAssets.map((asset) => rm(resolve(deployment, asset), { force: true })),
);

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("deploy", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

for (const pathname of ["/", "/about", "/solutions", "/policy"]) {
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
