import Image from "next/image";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import AnchorNavigation from "./AnchorNavigation";
import ArrowUpRightIcon from "./ArrowUpRightIcon";
import ProposalForm from "./ProposalForm";
import SiteHeader from "./SiteHeader";

export const metadata: Metadata = {
  title: "Защита объектов от БПЛА и защитные сетки",
  description:
    "Проектирование, изготовление и монтаж защитных сеток и защитных ограждающих конструкций (ЗОК) для промышленных и инфраструктурных объектов.",
  alternates: { canonical: "/" },
};

const services = [
  {
    code: "01 / AUDIT",
    title: "Обследование объекта",
    text: "Анализируем территорию, критические зоны, действующую инфраструктуру и исходные требования.",
    image: "/services/audit-optimized.jpg",
    imageAlt: "Инженеры обследуют промышленный объект и изучают его документацию",
    imagePosition: "center center",
  },
  {
    code: "02 / PROJECT",
    title: "Проектирование",
    text: "Разрабатываем комплексное решение, узлы, спецификации и рабочую документацию.",
    image: "/services/project-optimized.jpg",
    imageAlt: "Проект защитной сетчатой конструкции для промышленного оборудования",
    imagePosition: "center center",
  },
  {
    code: "03 / BUILD",
    title: "Изготовление и монтаж",
    text: "Организуем производство конструкций, поставку и выполнение монтажных работ на объекте.",
    image: "/services/build-optimized.jpg",
    imageAlt: "Монтаж защитной сетчатой конструкции на промышленном объекте",
    imagePosition: "center 34%",
  },
  {
    code: "04 / SERVICE",
    title: "Сопровождение",
    text: "Проводим приёмку, передаём документацию и рекомендации по эксплуатации системы.",
    image: "/services/service-optimized.jpg",
    imageAlt: "Инженеры проверяют установленную защитную конструкцию на объекте",
    imagePosition: "center center",
  },
];

const steps = [
  ["01", "Концепция защиты", "Модель угроз и схема"],
  ["02", "Проектная документация", "Расчёты и спецификации"],
  ["03", "Рабочая документация", "Чертежи и узлы"],
  ["04", "Исполнительный комплект", "Акты и регламенты"],
];

const faqItems = [
  {
    question: "Что входит в систему защиты объекта от БПЛА?",
    answer:
      "В состав защитной ограждающей конструкции входят фундаментные блоки, решётчатые опоры, силовые тросы и защитная сетка. Конфигурация определяется для конкретного объекта.",
  },
  {
    question: "С чего начинается проектирование защитной сетки?",
    answer:
      "Работа начинается с обследования территории, анализа критических зон, действующей инфраструктуры и исходных требований. Затем разрабатываются концепция, расчёты, спецификации и рабочая документация.",
  },
  {
    question: "Для каких объектов проектируются защитные сетки и ЗОК?",
    answer:
      "Решения разрабатываются для промышленных и инфраструктурных объектов с учётом конфигурации площадки, технологических зон и режима эксплуатации.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function Home() {
  return (
    <main>
      <AnchorNavigation />
      <SiteHeader current="home" />

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <Image
            className="hero-copy-image"
            src="/hero-protected-facility-optimized.jpg"
            alt="Промышленный объект под защитной сетчатой конструкцией"
            fill
            priority
            unoptimized
            sizes="(max-width: 980px) calc(100vw - 36px), 1420px"
          />
          <div className="eyebrow">
            <span className="live-dot" aria-hidden="true" />
            Ханты-Мансийск · Инженерные решения
          </div>
          <h1>
            Инженерная система <span>защиты объектов от БПЛА</span>
          </h1>
          <p className="lead">
            Проектирование и реализация комплексных решений для физической
            защиты промышленных объектов.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#contacts">
              Обсудить объект <span aria-hidden="true">→</span>
            </a>
            <a className="button secondary" href="/about">
              О компании
            </a>
          </div>
          <p className="microcopy">Первичная консультация и разбор задачи — бесплатно</p>
        </div>

        <div className="machine" aria-label="Схема защиты критически важного промышленного объекта от удара БПЛА">
          <div className="machine-bar">
            <span>Инженерный контур</span>
            <span>Объект защищён / online</span>
          </div>
          <div
            className="machine-screen"
            role="img"
            aria-label="Анимация: БПЛА подлетает к защитной сетке и останавливается при касании, после чего появляется сообщение об успешной защите объекта"
          >
            <div className="flight-path" aria-hidden="true">
              <span>Траектория БПЛА</span>
            </div>
            <div className="protection-net">
              <span>Защитная сетка</span>
            </div>
            <div className="protected-object" aria-hidden="true">
              <span>Защищаемый объект</span>
              <div className="plant-building" />
              <i className="plant-stack" />
              <i className="plant-tank" />
            </div>
            <div className="drone" aria-hidden="true">
              <i className="drone-arm arm-one" />
              <i className="drone-arm arm-two" />
              <span className="rotor rotor-one" />
              <span className="rotor rotor-two" />
              <span className="rotor rotor-three" />
              <span className="rotor rotor-four" />
              <div className="drone-core">БПЛА</div>
              <span className="drone-label">Беспилотный аппарат</span>
            </div>
            <span className="impact-ring" aria-hidden="true" />
            <div className="impact" aria-hidden="true">
              <b>СТОП</b>
              <i className="spark spark-one" />
              <i className="spark spark-two" />
              <i className="spark spark-three" />
              <i className="spark spark-four" />
            </div>
            <div className="protection-success" aria-hidden="true">
              <i /> Объект успешно защищён
            </div>
            <div className="impact-caption">БПЛА → касание сетки → остановка</div>
          </div>
          <div className="metrics">
            <div><b>Аудит</b><small>обследование</small></div>
            <div><b>Проект</b><small>документация</small></div>
            <div><b>Монтаж</b><small>реализация</small></div>
          </div>
        </div>
      </section>

      <div className="materials shell" aria-label="Этапы реализации">
        {["ОБСЛЕДОВАНИЕ", "КОНЦЕПЦИЯ", "ПРОЕКТ", "ПРОИЗВОДСТВО", "МОНТАЖ", "ПРИЁМКА"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <section className="section shell" id="company">
        <div className="section-head">
          <div>
            <span className="section-label">Наш подход</span>
            <h2>Защита начинается с инженерной модели угроз</h2>
          </div>
          <p>
            Рассматриваем объект как единую систему: территорию, здания,
            технологические зоны, маршруты персонала и действующие меры безопасности.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.code}>
              <div className="service-card-media">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  unoptimized
                  sizes="(max-width: 620px) calc(100vw - 52px), (max-width: 980px) calc(50vw - 39px), 25vw"
                  style={{ objectPosition: service.imagePosition }}
                />
              </div>
              <div className="service-card-body">
                <div className="service-card-meta">
                  <span className="card-code">{service.code}</span>
                  <span className="card-mark" aria-hidden="true"><ArrowUpRightIcon /></span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="construction" id="construction">
        <div className="shell">
          <div className="section-head compact">
            <div>
              <span className="section-label">Система защиты</span>
              <h2>Конструкция системы защитной сетки</h2>
            </div>
            <p>
              Основные элементы конструкции, схема размещения и общий вид
              установленной сетки.
            </p>
          </div>
          <div className="assembly-demo" aria-label="Анимация поэтапной сборки защитной конструкции вокруг объекта">
            <div className="assembly-demo-head">
              <span>Сценарий монтажа / 01—04</span>
              <span className="assembly-demo-status"><i aria-hidden="true" /> Система собирается</span>
            </div>
            <div className="assembly-screen">
              <div className="assembly-object" aria-label="Защищаемый промышленный объект">
                <span className="assembly-object-roof" />
                <span className="assembly-object-body" />
                <span className="assembly-object-pipe" />
                <b>Объект</b>
              </div>

              {["a", "b", "c", "d"].map((position) => (
                <span className={`assembly-base assembly-${position}`} key={`base-${position}`} />
              ))}
              {["a", "b", "c", "d"].map((position) => (
                <span className={`assembly-mast assembly-${position}`} key={`mast-${position}`} />
              ))}

              <span className="assembly-cable cable-left" />
              <span className="assembly-cable cable-right" />
              <span className="assembly-cable cable-top-left" />
              <span className="assembly-cable cable-top-right" />
              <div className="assembly-net" aria-hidden="true" />
              <div className="assembly-ready">Контур замкнут · объект защищён</div>
            </div>
            <ol className="assembly-timeline">
              <li style={{ "--stage": 0 } as CSSProperties}><b>01</b><span>Фундаментные блоки</span></li>
              <li style={{ "--stage": 1 } as CSSProperties}><b>02</b><span>Решётчатые опоры</span></li>
              <li style={{ "--stage": 2 } as CSSProperties}><b>03</b><span>Силовые тросы</span></li>
              <li style={{ "--stage": 3 } as CSSProperties}><b>04</b><span>Защитная сетка</span></li>
            </ol>
          </div>
          <figure className="construction-overview">
            <a className="construction-image-link" href="/construction/system-overview-optimized.jpg" target="_blank" rel="noreferrer" aria-label="Открыть схему основных элементов в полном размере">
              <Image
                src="/construction/system-overview-optimized.jpg"
                alt="Схема основных элементов системы защитной сетки"
                width={1672}
                height={941}
                unoptimized
                sizes="(max-width: 620px) calc(100vw - 56px), (max-width: 980px) calc(100vw - 72px), 1040px"
                quality={92}
              />
            </a>
            <figcaption>Состав и основные элементы защитной конструкции</figcaption>
          </figure>
          <div className="construction-gallery">
            <figure className="construction-card diagram">
              <a className="construction-image-link" href="/construction/system-layout-optimized.jpg" target="_blank" rel="noreferrer" aria-label="Открыть схему размещения в полном размере">
                <Image
                  src="/construction/system-layout-optimized.jpg"
                  alt="Схема размещения защитной сетки вокруг группы промышленных ёмкостей"
                  width={1448}
                  height={1086}
                  unoptimized
                  sizes="(max-width: 620px) 82vw, (max-width: 980px) 31vw, 350px"
                  quality={92}
                />
              </a>
              <figcaption>Пример схемы размещения</figcaption>
            </figure>
            <figure className="construction-card photo">
              <a className="construction-image-link" href="/construction/net-view-01-optimized.jpg" target="_blank" rel="noreferrer" aria-label="Открыть фотографию конструкции, первый ракурс">
                <Image
                  src="/construction/net-view-01-optimized.jpg"
                  alt="Промышленная площадка с резервуарами под защитной сетчатой конструкцией"
                  width={1254}
                  height={1254}
                  unoptimized
                  sizes="(max-width: 620px) 82vw, (max-width: 980px) 31vw, 350px"
                />
              </a>
              <figcaption>Общий вид конструкции · ракурс 01</figcaption>
            </figure>
            <figure className="construction-card photo">
              <a className="construction-image-link" href="/construction/net-view-02-optimized.jpg" target="_blank" rel="noreferrer" aria-label="Открыть фотографию конструкции, второй ракурс">
                <Image
                  src="/construction/net-view-02-optimized.jpg"
                  alt="Установленная защитная сетчатая конструкция, второй ракурс"
                  width={1448}
                  height={1086}
                  unoptimized
                  sizes="(max-width: 620px) 82vw, (max-width: 980px) 31vw, 350px"
                />
              </a>
              <figcaption>Общий вид конструкции · ракурс 02</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="project-band shell">
        <div>
          <span className="section-label">Комплексный подход</span>
          <h2>Решение под конкретный объект.</h2>
        </div>
        <p>
          Не предлагаем типовую конструкцию. Учитываем конфигурацию площадки,
          критические зоны, режим эксплуатации и требования заказчика.
        </p>
        <a className="round-link" href="#contacts" aria-label="Перейти к контактам">
          <ArrowUpRightIcon />
        </a>
      </section>

      <section className="faq shell" aria-labelledby="faq-title">
        <div className="faq-heading">
          <span className="section-label">Защита объектов от БПЛА</span>
          <h2 id="faq-title">Вопросы о защитных сетках и ЗОК</h2>
          <p>
            Кратко о составе, проектировании и применении защитных
            ограждающих конструкций.
          </p>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="shell bottom-grid">
        <section className="steps" id="documents">
          <span className="section-label light">Документы</span>
          <h2>Документированное решение</h2>
          <div className="step-list">
            {steps.map(([number, title, note]) => (
              <div className="step" key={number}>
                <i>{number}</i>
                <span>{title}</span>
                <small>{note}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="contact" id="contacts">
          <div className="contact-layout">
            <div className="contact-intro">
              <span className="section-label light">Контакты</span>
              <h2>Обсудим ваш объект?</h2>
              <p>
                Для первого разговора достаточно описать площадку, критические зоны
                и ожидаемый результат.
              </p>
              <div className="contact-links">
                <a href="tel:+79825582286">8 982 558 22 86</a>
                <a className="contact-email" href="mailto:86.avangard@bk.ru">
                  86.avangard@bk.ru
                </a>
              </div>
              <a
                className="address"
                href="https://yandex.ru/maps/?text=Ханты-Мансийск"
                target="_blank"
                rel="noreferrer"
              >
                <span>Ханты-Мансийск</span><ArrowUpRightIcon />
              </a>
            </div>

            <div className="proposal-card">
              <div className="proposal-heading">
                <span>Коммерческое предложение</span>
                <h3>Получить расчёт для вашего объекта</h3>
              </div>
              <ProposalForm />
            </div>
          </div>
          <span className="contact-watermark" aria-hidden="true">86</span>
        </section>
      </div>

      <footer>
        <div className="shell footer-inner">
          <span>ЗАЩИТА БПЛА 86</span>
          <span>Проектирование · Реализация · Сопровождение</span>
          <span>Ханты-Мансийск</span>
        </div>
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </main>
  );
}
