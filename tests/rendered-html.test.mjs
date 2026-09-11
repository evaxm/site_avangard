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

test("server-renders the home page with service and construction images", async () => {
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
  assert.match(html, /Конструкция системы защитной сетки/);
  assert.match(html, /alt="Схема основных элементов системы защитной сетки"/);
  assert.match(html, /alt="Схема размещения защитной сетки вокруг группы промышленных ёмкостей"/);
  assert.match(html, /alt="Установленная защитная сетчатая конструкция, первый ракурс"/);
  assert.match(html, /alt="Установленная защитная сетчатая конструкция, второй ракурс"/);
  assert.match(html, /Анимация: БПЛА подлетает к защитной сетке и останавливается при касании/);
  assert.match(html, /Беспилотный аппарат/);
  assert.match(html, /Защищаемый объект/);
  assert.match(html, /БПЛА → касание сетки → остановка/);
  assert.match(html, /Защитные ограждающие конструкции \(ЗОК\) для промышленных и/);
  assert.match(html, /Объекты ТЭК/);
  assert.match(html, /Атомная энергетика/);
  assert.match(html, /Транспортная инфраструктура/);
  assert.match(html, /Инфраструктура жизнеобеспечения/);
  assert.match(html, /Газораспределительные станции \(ГРС\)/);
  assert.doesNotMatch(html, /Компетенции на стыке инженерных дисциплин/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("includes the supplied image assets", async () => {
  const assets = [
    "public/services/audit.jpg",
    "public/services/project.jpg",
    "public/services/build.jpg",
    "public/services/service.jpg",
    "public/construction/system-overview.png",
    "public/construction/system-layout.png",
    "public/construction/net-view-01.jpg",
    "public/construction/net-view-02.jpg",
  ];

  await Promise.all(
    assets.map((asset) =>
      access(new URL(`../${asset}`, import.meta.url)),
    ),
  );
});
