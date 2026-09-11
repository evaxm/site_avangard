import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
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
}

test("server-renders the home page with all service images", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Инженерная система защиты от БПЛА<\/title>/i);
  assert.match(html, /Инженерная система/);
  assert.match(html, /Обследование объекта/);
  assert.match(html, /Проектирование/);
  assert.match(html, /Изготовление и монтаж/);
  assert.match(html, /Сопровождение/);
  assert.match(html, /alt="Инженеры обследуют промышленный объект и изучают его документацию"/);
  assert.match(html, /alt="Проект защитной сетчатой конструкции для промышленного оборудования"/);
  assert.match(html, /alt="Монтаж защитной сетчатой конструкции на промышленном объекте"/);
  assert.match(html, /alt="Инженеры проверяют установленную защитную конструкцию на объекте"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("includes the optimized service image assets", async () => {
  const assets = ["audit.jpg", "project.jpg", "build.jpg", "service.jpg"];

  await Promise.all(
    assets.map((asset) =>
      access(new URL(`../public/services/${asset}`, import.meta.url)),
    ),
  );
});
