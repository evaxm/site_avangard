import { cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const staticBuild = resolve(root, "dist/client");
const deployment = resolve(root, "deploy-reg-ru");

await rm(deployment, { recursive: true, force: true });
await cp(staticBuild, deployment, { recursive: true });
await mkdir(resolve(deployment, "api"), { recursive: true });
await cp(resolve(root, "server/inquiry.php"), resolve(deployment, "api/inquiry.php"));

console.log(`REG.RU deployment prepared at ${deployment}`);
