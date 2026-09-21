import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
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
  assert.match(html, /<title>Защита объектов от БПЛА и защитные сетки \| Авангард<\/title>/i);
  assert.match(html, /rel="canonical" href="https:\/\/bpla-zok\.ru\/"/i);
  assert.match(html, /property="og:image" content="https:\/\/bpla-zok\.ru\/og\.png"/i);
  assert.match(html, /type="application\/ld\+json"/i);
  assert.match(html, /https:\/\/bpla-zok\.ru\/#organization/i);
  assert.match(html, /https:\/\/bpla-zok\.ru\/#anti-uav-protection-service/i);
  assert.match(html, /"@type":"FAQPage"/i);
  assert.match(html, /Вопросы о защитных сетках и ЗОК/);
  assert.match(html, /Что входит в систему защиты объекта от БПЛА/);
  assert.match(html, /Инженерная система <span>защиты объектов от БПЛА<\/span>/);
  assert.match(html, /src="\/brand-logo\.png"/);
  assert.match(html, /<span class="mail-pill">ваша почта@<\/span>/);
  assert.doesNotMatch(html, /\/_vinext\/image/);
  assert.match(html, /<span class="contact-email">ваша почта@<\/span>/);
  assert.doesNotMatch(html, /evaa86@list\.ru|mailto:/);
  assert.match(html, />Ханты-Мансийск<\/span><svg[^>]*class="arrow-up-right/);
  assert.match(html, /<form[^>]*class="proposal-form"[^>]*action="\/api\/inquiry\.php"/);
  assert.match(html, /name="Имя"/);
  assert.match(html, /name="Телефон"/);
  assert.match(html, /name="Почта"/);
  assert.match(html, /name="Город"/);
  assert.match(html, /<input(?=[^>]*type="checkbox")(?=[^>]*name="Согласие на обработку персональных данных")(?=[^>]*required)[^>]*>/);
  assert.match(html, /href="\/policy"/);
  assert.match(html, /Я ознакомлен\(а\) с/);
  assert.match(html, /Получить КП/);
  assert.match(html, /name="website"/);
  assert.match(html, /class="phone-input"[^>]*pattern=/);
  assert.match(html, /placeholder="\+7 \(___\) ___-__-__"/);
  assert.doesNotMatch(html, /Формат: \+7 900 000-00-00/);
  assert.doesNotMatch(html, /3d_pechat_86|Промышленная, 19|На связи · до 18:00/i);
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
  assert.match(html, /alt="Промышленная площадка с резервуарами под защитной сетчатой конструкцией"/);
  assert.match(html, /alt="Установленная защитная сетчатая конструкция, второй ракурс"/);
  assert.match(html, /Анимация поэтапной сборки защитной конструкции вокруг объекта/);
  assert.match(html, /Фундаментные блоки/);
  assert.match(html, /Решётчатые опоры/);
  assert.match(html, /Силовые тросы/);
  assert.match(html, /Контур замкнут · объект защищён/);
  assert.match(html, /Анимация: БПЛА подлетает к защитной сетке и останавливается при касании/);
  assert.match(html, /Беспилотный аппарат/);
  assert.match(html, /Защищаемый объект/);
  assert.match(html, /БПЛА → касание сетки → остановка/);
  assert.match(html, /Объект успешно защищён/);
  assert.doesNotMatch(html, /Открыть крупнее/);
  assert.match(html, /href="\/solutions"[^>]*>Отраслевые решения/);
  assert.doesNotMatch(html, /<nav[^>]*>[\s\S]*?>Документы<\/a>[\s\S]*?<\/nav>/);
  assert.doesNotMatch(html, /<section class="object-scope"/);
  assert.doesNotMatch(html, /Компетенции на стыке инженерных дисциплин/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("serves industry solutions as a separate page", async () => {
  const response = await render("/solutions");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>Отраслевые решения \| Авангард<\/title>/i);
  assert.match(html, /rel="canonical" href="https:\/\/bpla-zok\.ru\/solutions"/i);
  assert.match(html, /href="\/solutions" aria-current="page">Отраслевые решения/);
  assert.doesNotMatch(html, /<nav[^>]*>[\s\S]*?>Документы<\/a>[\s\S]*?<\/nav>/);
  assert.match(html, /Защитные ограждающие конструкции \(ЗОК\) для промышленных и/);
  assert.match(html, /Объекты ТЭК/);
  assert.match(html, /Атомная энергетика/);
  assert.match(html, /Транспортная инфраструктура/);
  assert.match(html, /Инфраструктура жизнеобеспечения/);
  assert.match(html, /Газораспределительные станции \(ГРС\)/);
  assert.match(html, /alt="Резервуарный парк под защитной сетчатой конструкцией"/);
  assert.match(html, /alt="Электрическая подстанция под защитной сетчатой конструкцией"/);
  assert.match(html, /alt="Объект связи и обработки данных под защитной сетчатой конструкцией"/);
  assert.match(html, /alt="Промышленное оборудование под защитной сетчатой конструкцией"/);
  assert.match(html, /alt="Объект атомной энергетики под защитной сетчатой конструкцией"/);
  assert.match(html, /alt="Железнодорожная инфраструктура под защитной сетчатой конструкцией"/);
  assert.match(html, /alt="Объект государственной инфраструктуры под защитной сетчатой конструкцией"/);
  assert.match(html, /alt="Объект инфраструктуры жизнеобеспечения под защитной сетчатой конструкцией"/);
});

test("uses vector arrows instead of platform emoji glyphs", async () => {
  const home = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const about = await readFile(new URL("../app/about/page.tsx", import.meta.url), "utf8");

  assert.match(home, /<ArrowUpRightIcon\s*\/>/);
  assert.match(about, /<ArrowUpRightIcon\s*\/>/);
  assert.doesNotMatch(home, /↗/);
  assert.doesNotMatch(about, /↗/);
});

test("serves an empty policy page on this site", async () => {
  const response = await render("/policy");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Политика обработки персональных данных/);
  assert.match(html, /class="policy-content"/);
  assert.match(html, /name="robots" content="noindex, follow"/i);
  assert.doesNotMatch(html, /ab-guard\.ru/);
});

test("uses unique canonical metadata for the company page", async () => {
  const response = await render("/about");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>О компании \| Авангард<\/title>/i);
  assert.match(html, /rel="canonical" href="https:\/\/bpla-zok\.ru\/about"/i);
  assert.match(html, /Жилой комплекс из 5 домов — 54 тыс\. м² жилого фонда со встроенным детским садом в рамках КРТ/);
  assert.match(html, /Жилой дом с офисными помещениями на 8700 м²/);
  assert.match(html, /Благоустройство микрорайона в рамках КРТ/);
  assert.match(html, /Отделка мест общего пользования/);
  assert.match(html, />Промышленный парк</);
  assert.doesNotMatch(html, /Северин|Долина ручьёв|Импульс/);
});

test("ships search-engine and server support files", async () => {
  const [robots, sitemap, htaccess, missingPage] = await Promise.all([
    readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
    readFile(new URL("../public/.htaccess", import.meta.url), "utf8"),
    readFile(new URL("../public/404.html", import.meta.url), "utf8"),
  ]);

  assert.match(robots, /Sitemap: https:\/\/bpla-zok\.ru\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/bpla-zok\.ru\/solutions<\/loc>/);
  assert.doesNotMatch(sitemap, /\/policy/);
  assert.match(htaccess, /ErrorDocument 404 \/404\.html/);
  assert.match(missingPage, /<meta name="robots" content="noindex, follow">/);
});

test("handles Telegram group migrations without exposing credentials", async () => {
  const handler = await readFile(new URL("../server/inquiry.php", import.meta.url), "utf8");

  assert.match(handler, /migrate_to_chat_id/);
  assert.match(handler, /persist_migrated_chat_id/);
  assert.doesNotMatch(handler, /8675090069:AA/);
});

test("includes the supplied image assets", async () => {
  const assets = [
    "public/services/audit-optimized.jpg",
    "public/services/project-optimized.jpg",
    "public/services/build-optimized.jpg",
    "public/services/service-optimized.jpg",
    "public/brand-logo.png",
    "public/hero-protected-facility-optimized.jpg",
    "public/about-hero-optimized.jpg",
    "public/construction/system-overview-optimized.jpg",
    "public/construction/system-layout-optimized.jpg",
    "public/construction/net-view-01-optimized.jpg",
    "public/construction/net-view-02-optimized.jpg",
    "public/objects/tek-optimized.jpg",
    "public/objects/energy-optimized.jpg",
    "public/objects/communications-optimized.jpg",
    "public/objects/industrial-optimized.jpg",
    "public/objects/nuclear-optimized.jpg",
    "public/objects/transport-optimized.jpg",
    "public/objects/government-optimized.jpg",
    "public/objects/lifesupport-optimized.jpg",
  ];

  await Promise.all(
    assets.map((asset) =>
      access(new URL(`../${asset}`, import.meta.url)),
    ),
  );
});

test("keeps the construction diagram at its content height", async () => {
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(
    css,
    /\.construction-card\.diagram\s*\{[^}]*align-self:\s*start;/,
  );
});

test("keeps anchor navigation immediately scrollable", async () => {
  const css = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(css, /html\s*\{[^}]*scroll-behavior:\s*auto;/);
  assert.match(css, /html\s*\{[^}]*overflow-y:\s*scroll;/);
  assert.match(css, /html\s*\{[^}]*min-height:\s*100%;/);
  assert.match(css, /body\s*\{[^}]*min-height:\s*100%;/);
  assert.doesNotMatch(css, /html\s*\{[^}]*scroll-behavior:\s*smooth;/);
  assert.doesNotMatch(css, /body\s*\{[^}]*overflow-x:/);
  assert.doesNotMatch(css, /main\s*\{[^}]*overflow-x:/);

  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const navigation = await readFile(
    new URL("../app/AnchorNavigation.tsx", import.meta.url),
    "utf8",
  );

  assert.match(page, /<AnchorNavigation\s*\/>/);
  assert.match(navigation, /event\.preventDefault\(\)/);
  assert.match(navigation, /history\.replaceState/);
  assert.match(navigation, /window\.scrollTo/);
  assert.doesNotMatch(navigation, /location\.hash\s*=/);
});
