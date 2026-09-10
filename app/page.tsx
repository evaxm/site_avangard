const services = [
  {
    code: "01 / AUDIT",
    title: "Обследование объекта",
    text: "Анализируем территорию, критические зоны, действующую инфраструктуру и исходные требования.",
  },
  {
    code: "02 / PROJECT",
    title: "Проектирование",
    text: "Разрабатываем комплексное решение, узлы, спецификации и рабочую документацию.",
  },
  {
    code: "03 / BUILD",
    title: "Изготовление и монтаж",
    text: "Организуем производство конструкций, поставку и выполнение монтажных работ на объекте.",
  },
  {
    code: "04 / SERVICE",
    title: "Сопровождение",
    text: "Проводим приёмку, передаём документацию и рекомендации по эксплуатации системы.",
  },
];

const steps = [
  ["01", "Концепция защиты", "Модель угроз и схема"],
  ["02", "Проектная документация", "Расчёты и спецификации"],
  ["03", "Рабочая документация", "Чертежи и узлы"],
  ["04", "Исполнительный комплект", "Акты и регламенты"],
];

const advantages = [
  ["Промышленные объекты", "Понимаем требования к производственным площадкам и непрерывности технологических процессов."],
  ["Инженерные конструкции", "Прорабатываем защитные контуры с учётом геометрии, нагрузок и условий эксплуатации."],
  ["Комплексная интеграция", "Увязываем физическую защиту с инфраструктурой и режимом работы конкретного объекта."],
  ["Управление проектом", "Сохраняем логику решения от обследования до монтажа и передачи документации."],
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
            <a href="#experience">Опыт команды</a>
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
          <div className="machine-screen">
            <div className="protection-net">
              <span>Защитная сетка</span>
            </div>
            <div className="protected-object" aria-hidden="true">
              <span>Важный объект</span>
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
            </div>
            <div className="impact" aria-hidden="true">
              <b>СТОП</b>
              <i className="spark spark-one" />
              <i className="spark spark-two" />
              <i className="spark spark-three" />
              <i className="spark spark-four" />
            </div>
            <div className="impact-caption">Сетка принимает удар · объект защищён</div>
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
              <span className="card-code">{service.code}</span>
              <span className="card-mark" aria-hidden="true">↗</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="advantages" id="experience">
        <div className="shell">
          <div className="section-head compact">
            <div>
              <span className="section-label">Опыт команды</span>
              <h2>Компетенции на стыке инженерных дисциплин</h2>
            </div>
          </div>
          <div className="advantage-grid">
            {advantages.map(([title, text], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
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
