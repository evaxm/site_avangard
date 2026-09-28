import Image from "next/image";
import Link from "next/link";
import SiteHeader from "./SiteHeader";

export type SeoLandingData = {
  path: string;
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  introTitle: string;
  intro: string[];
  featuresTitle: string;
  features: Array<{ title: string; text: string }>;
  processTitle: string;
  processIntro: string;
  process: Array<{ title: string; text: string }>;
  faqTitle: string;
  faq: Array<{ question: string; answer: string }>;
};

const relatedPages = [
  { href: "/zok-ot-bpla", title: "ЗОК от БПЛА", text: "Назначение, состав и применение защитных ограждающих конструкций." },
  { href: "/zashchitnye-setki-ot-bpla", title: "Защитные сетки от БПЛА", text: "Сетчатый контур для физической защиты промышленных объектов." },
  { href: "/proektirovanie-zok", title: "Проектирование ЗОК", text: "Обследование, концепция, расчёты и рабочая документация." },
  { href: "/solutions", title: "Отраслевые решения", text: "Объекты ТЭК, энергетики, промышленности и инфраструктуры." },
];

export default function SeoLandingPage({ data }: { data: SeoLandingData }) {
  const schemas = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: "https://bpla-zok.ru/" },
          { "@type": "ListItem", position: 2, name: data.title, item: `https://bpla-zok.ru${data.path}` },
        ],
      },
      {
        "@type": "Service",
        name: data.title,
        description: data.lead,
        serviceType: "Инженерная защита объектов от БПЛА",
        provider: { "@id": "https://bpla-zok.ru/#organization" },
        areaServed: { "@type": "Country", name: "Россия" },
        url: `https://bpla-zok.ru${data.path}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: data.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <main>
      <SiteHeader />

      <section className="seo-hero">
        <div className="shell seo-hero-grid">
          <div className="seo-hero-copy">
            <nav className="breadcrumbs" aria-label="Навигационная цепочка">
              <Link href="/">Главная</Link><span>/</span><span>{data.eyebrow}</span>
            </nav>
            <span className="section-label light">{data.eyebrow}</span>
            <h1>{data.title}</h1>
            <p>{data.lead}</p>
            <div className="seo-hero-actions">
              <Link className="button primary" href="/#contacts">Получить расчёт →</Link>
              <Link className="seo-text-link" href="/solutions">Посмотреть отраслевые решения</Link>
            </div>
          </div>
          <div className="seo-hero-media">
            <Image src={data.image} alt={data.imageAlt} fill priority unoptimized sizes="(max-width: 900px) calc(100vw - 36px), 44vw" />
          </div>
        </div>
      </section>

      <section className="seo-content shell">
        <div className="seo-intro">
          <span className="section-label">Инженерный подход</span>
          <h2>{data.introTitle}</h2>
          <div>{data.intro.map((text) => <p key={text}>{text}</p>)}</div>
        </div>

        <div className="seo-block">
          <div className="seo-block-head">
            <span className="section-label">Состав решения</span>
            <h2>{data.featuresTitle}</h2>
          </div>
          <div className="seo-feature-grid">
            {data.features.map((feature, index) => (
              <article key={feature.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="seo-process">
          <div className="seo-block-head">
            <span className="section-label light">Этапы работ</span>
            <h2>{data.processTitle}</h2>
            <p>{data.processIntro}</p>
          </div>
          <ol>
            {data.process.map((step, index) => (
              <li key={step.title}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <div><h3>{step.title}</h3><p>{step.text}</p></div>
              </li>
            ))}
          </ol>
        </div>

        <section className="faq seo-faq" aria-labelledby="seo-faq-title">
          <div className="faq-heading">
            <span className="section-label">Вопросы и ответы</span>
            <h2 id="seo-faq-title">{data.faqTitle}</h2>
            <p>Ответы основаны на проектном подходе: параметры конструкции определяются для конкретного объекта.</p>
          </div>
          <div className="faq-list">
            {data.faq.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="seo-related" aria-labelledby="seo-related-title">
          <div className="seo-block-head">
            <span className="section-label">По теме</span>
            <h2 id="seo-related-title">Решения и материалы</h2>
          </div>
          <div className="seo-related-grid">
            {relatedPages.filter((page) => page.href !== data.path).map((page) => (
              <Link href={page.href} key={page.href}>
                <h3>{page.title}</h3><p>{page.text}</p><span>Подробнее →</span>
              </Link>
            ))}
          </div>
        </section>
      </section>

      <section className="seo-cta">
        <div className="shell">
          <div><span className="section-label light">Коммерческое предложение</span><h2>Обсудим защиту вашего объекта</h2></div>
          <p>Для первого разговора достаточно описать площадку, критические зоны и ожидаемый результат.</p>
          <Link className="button primary" href="/#contacts">Получить расчёт →</Link>
        </div>
      </section>

      <footer>
        <div className="shell footer-inner">
          <span>ЗАЩИТА БПЛА 86</span>
          <span>Проектирование · Реализация · Сопровождение</span>
          <Link href="/">На главную</Link>
        </div>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
    </main>
  );
}
