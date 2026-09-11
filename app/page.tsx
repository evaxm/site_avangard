import Image from "next/image";

const services = [
  {
    code: "01 / AUDIT",
    title: "Обследование объекта",
    text: "Анализируем территорию, критические зоны, действующую инфраструктуру и исходные требования.",
    image: "/services/audit.jpg",
    imageAlt: "Инженеры обследуют промышленный объект и изучают его документацию",
    imagePosition: "center center",
  },
  {
    code: "02 / PROJECT",
    title: "Проектирование",
    text: "Разрабатываем комплексное решение, узлы, спецификации и рабочую документацию.",
    image: "/services/project.jpg",
    imageAlt: "Проект защитной сетчатой конструкции для промышленного оборудования",
    imagePosition: "center center",
  },
  {
    code: "03 / BUILD",
    title: "Изготовление и монтаж",
    text: "Организуем производство конструкций, поставку и выполнение монтажных работ на объекте.",
    image: "/services/build.jpg",
    imageAlt: "Монтаж защитной сетчатой конструкции на промышленном объекте",
    imagePosition: "center 34%",
  },
  {
    code: "04 / SERVICE",
    title: "Сопровождение",
    text: "Проводим приёмку, передаём документацию и рекомендации по эксплуатации системы.",
    image: "/services/service.jpg",
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

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <div className="shell nav">
          <a className="brand" href="#top" aria-label="Инженерная защита 86 — на главную">
            ЗАЩИТА БПЛА <b>86</b>
          </a>
          <nav className="nav-links" aria-label="Основная навигация">
            <a href="#top">Главная</a>
            <a href="/about">О компании</a>
            <a href="#construction">Конструкция системы</a>
            <a href="#documents">Документы</a>
            <a href="#contacts">Контакты</a>
          </nav>
          <a className="phone-pill" href="tel:+79954933770">
            +7 (995) 493-37-70
          </a>
        </div>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="live-dot" aria-hidden="true" />
            Ханты-Мансийск · Инженерные решения
          </div>
          <h1>
            Инженерная система <span>защиты от БПЛА</span>
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
            aria-label="Анимация: БПЛА подлетает к защитной сетке и останавливается при касании, защищаемый объект остаётся за сеткой"
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
                  sizes="(max-width: 620px) calc(100vw - 52px), (max-width: 980px) calc(50vw - 39px), 25vw"
                  style={{ objectPosition: service.imagePosition }}
                />
              </div>
              <div className="service-card-body">
                <div className="service-card-meta">
                  <span className="card-code">{service.code}</span>
                  <span className="card-mark" aria-hidden="true">↗</span>
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
          <figure className="construction-overview">
            <Image
              src="/construction/system-overview.png"
              alt="Схема основных элементов системы защитной сетки"
              width={1672}
              height={941}
              sizes="(max-width: 620px) calc(100vw - 28px), (max-width: 980px) calc(100vw - 36px), (max-width: 1484px) calc(100vw - 64px), 1420px"
              quality={92}
            />
            <figcaption>Состав и основные элементы защитной конструкции</figcaption>
          </figure>
          <div className="construction-gallery">
            <figure className="construction-card diagram">
              <Image
                src="/construction/system-layout.png"
                alt="Схема размещения защитной сетки вокруг группы промышленных ёмкостей"
                width={1448}
                height={1086}
                sizes="(max-width: 980px) calc(100vw - 36px), 56vw"
                quality={92}
              />
              <figcaption>Пример схемы размещения</figcaption>
            </figure>
            <figure className="construction-card photo">
              <Image
                src="/construction/net-view-01.jpg"
                alt="Установленная защитная сетчатая конструкция, первый ракурс"
                width={1448}
                height={1086}
                sizes="(max-width: 620px) calc(100vw - 28px), (max-width: 980px) calc(50vw - 25px), 38vw"
              />
              <figcaption>Общий вид конструкции · ракурс 01</figcaption>
            </figure>
            <figure className="construction-card photo">
              <Image
                src="/construction/net-view-02.jpg"
                alt="Установленная защитная сетчатая конструкция, второй ракурс"
                width={1448}
                height={1086}
                sizes="(max-width: 620px) calc(100vw - 28px), (max-width: 980px) calc(50vw - 25px), 38vw"
              />
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
          ↗
        </a>
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
          <span className="section-label light">Контакты</span>
          <h2>Обсудим ваш объект?</h2>
          <p>
            Для первого разговора достаточно описать площадку, критические зоны
            и ожидаемый результат.
          </p>
          <div className="contact-links">
            <a href="tel:+79954933770">+7 (995) 493-37-70</a>
            <a href="https://t.me/3d_pechat_86" target="_blank" rel="noreferrer">
              @3d_pechat_86 <span aria-hidden="true">↗</span>
            </a>
          </div>
          <a
            className="address"
            href="https://yandex.ru/maps/?text=Ханты-Мансийск%2C%20Промышленная%2C%2019"
            target="_blank"
            rel="noreferrer"
          >
            Ханты-Мансийск, Промышленная, 19
          </a>
          <div className="open-status"><span /> На связи · до 18:00</div>
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
    </main>
  );
}
