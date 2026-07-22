const services = [
  {
    code: "01 / PLAY",
    title: "Фигурки и игрушки",
    text: "Персонажи, миниатюры, декор и модели для творчества и коллекций.",
  },
  {
    code: "02 / STYLE",
    title: "Аксессуары",
    text: "Украшения, органайзеры и предметы интерьера с индивидуальным дизайном.",
  },
  {
    code: "03 / PRO",
    title: "Прототипы",
    text: "Проверка формы, механики и эргономики до запуска изделия в серию.",
  },
  {
    code: "04 / FIX",
    title: "Детали",
    text: "Корпуса, крепления, переходники и запчасти по модели или образцу.",
  },
];

const steps = [
  ["01", "Расскажите об идее", "Звонок или сообщение"],
  ["02", "Пришлите модель или образец", "STL / STEP / фото"],
  ["03", "Согласуем материал и стоимость", "Точный расчёт"],
  ["04", "Напечатаем и сообщим о готовности", "Контроль качества"],
];

const advantages = [
  ["Точная печать", "Современные FDM-принтеры и аккуратная настройка каждого проекта."],
  ["Помощь с моделью", "Проверим ваш файл или разработаем дизайн с нуля по задаче."],
  ["Разные материалы", "Подберём пластик под внешний вид, прочность и условия использования."],
  ["Быстрый результат", "Согласуем реальный срок заранее и держим вас в курсе."],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <div className="shell nav">
          <a className="brand" href="#top" aria-label="3D Печать 86 — на главную">
            3D ПЕЧАТЬ <b>86</b>
          </a>
          <nav className="nav-links" aria-label="Основная навигация">
            <a href="#services">Что печатаем</a>
            <a href="#advantages">Почему мы</a>
            <a href="#process">Как заказать</a>
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
            Ханты-Мансийск · FDM-производство
          </div>
          <h1>
            Идея становится <span>объектом</span>
          </h1>
          <p className="lead">
            Печатаем прототипы, детали, фигурки и уникальные изделия на заказ.
            Поможем с моделью, подберём материал и точно воплотим задумку.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#contacts">
              Рассчитать заказ <span aria-hidden="true">→</span>
            </a>
            <a className="button secondary" href="#services">
              Посмотреть возможности
            </a>
          </div>
          <p className="microcopy">Консультация по модели и материалу — бесплатно</p>
        </div>

        <div className="machine" aria-label="Стилизованная схема процесса 3D-печати">
          <div className="machine-bar">
            <span>Процесс печати</span>
            <span>ХМ 86 / online</span>
          </div>
          <div className="machine-screen">
            <div className="machine-rail" />
            <div className="nozzle" />
            <div className="beam" />
            <div className="printed-part">
              <span>3D</span>
            </div>
            <div className="print-bed" />
          </div>
          <div className="metrics">
            <div><b>0,2 мм</b><small>высота слоя</small></div>
            <div><b>±0,1</b><small>точность</small></div>
            <div><b>FDM</b><small>технология</small></div>
          </div>
        </div>
      </section>

      <div className="materials shell" aria-label="Материалы для печати">
        {["PLA", "PETG", "ABS", "ASA", "WOOD", "CARBON", "PC"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <section className="section shell" id="services">
        <div className="section-head">
          <div>
            <span className="section-label">Возможности</span>
            <h2>Печатаем то, что нужно именно вам</h2>
          </div>
          <p>
            От единичного подарка до функционального прототипа. Разберём задачу
            и предложим практичный способ производства.
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

      <section className="advantages" id="advantages">
        <div className="shell">
          <div className="section-head compact">
            <div>
              <span className="section-label">Почему мы</span>
              <h2>Технологично. Понятно. По вашей задаче.</h2>
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
          <span className="section-label">Есть только идея?</span>
          <h2>Это уже достаточно, чтобы начать.</h2>
        </div>
        <p>
          Не обязательно разбираться в форматах и материалах. Опишите задачу,
          покажите пример или пришлите фото — мы подскажем следующий шаг.
        </p>
        <a className="round-link" href="https://t.me/3d_pechat_86" target="_blank" rel="noreferrer" aria-label="Написать в Telegram">
          ↗
        </a>
      </section>

      <div className="shell bottom-grid">
        <section className="steps" id="process">
          <span className="section-label light">Как заказать</span>
          <h2>От запроса до готовой детали</h2>
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
          <span className="section-label light">Связаться</span>
          <h2>Обсудим ваш проект?</h2>
          <p>
            Подскажем, как лучше реализовать идею, и рассчитаем стоимость без
            лишней технической сложности.
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
          <div className="open-status"><span /> Открыто · до 18:00</div>
          <span className="contact-watermark" aria-hidden="true">86</span>
        </section>
      </div>

      <footer>
        <div className="shell footer-inner">
          <span>3D ПЕЧАТЬ 86</span>
          <span>FDM · Дизайн · Реверс-инжиниринг</span>
          <span>Ханты-Мансийск</span>
        </div>
      </footer>
    </main>
  );
}
