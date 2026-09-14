import Image from "next/image";
import Link from "next/link";

const workGroups = [
  {
    number: "01",
    title: "Земляные работы",
    items: [
      "Планировка площадей",
      "Разработка грунтов",
      "Укрепление и уплотнение грунтов",
      "Устройство дренажей",
      "Благоустройство и озеленение",
    ],
  },
  {
    number: "02",
    title: "Несущие и ограждающие конструкции",
    items: [
      "Монтаж металлоконструкций и установка арматуры",
      "Устройство конструкций из монолитного бетона",
      "Устройство железобетонных конструкций",
      "Монтаж сборных бетонных и железобетонных конструкций",
      "Кладка из камня, кирпича и блоков",
      "Установка деревянных конструкций и изделий",
    ],
  },
  {
    number: "03",
    title: "Наружные инженерные сети",
    items: [
      "Устройство колодцев, площадок, оголовков и лотков",
      "Установка запорной арматуры",
      "Монтаж санитарно-технического оборудования",
      "Прокладка тепловых сетей с температурой теплоносителя до 115 °C",
      "Прокладка сетей водоснабжения и канализации",
      "Устройство дорожных оснований и покрытий при благоустройстве территории",
    ],
  },
  {
    number: "04",
    title: "Защита конструкций и оборудования",
    items: [
      "Гидроизоляция строительных конструкций",
      "Кровельные работы",
      "Теплоизоляция строительных конструкций",
      "Теплоизоляция трубопроводов и оборудования",
      "Антикоррозионная защита конструкций и оборудования",
    ],
  },
  {
    number: "05",
    title: "Отделочные работы",
    items: [
      "Демонтажные работы и устройство стяжки",
      "Штукатурка и шпаклёвка стен, потолков и откосов",
      "Покраска, оклейка стен и плиточные работы",
      "Укладка ламината и паркетной доски",
      "Электромонтажные и сантехнические работы",
      "Установка радиаторов и дверей",
    ],
  },
];

const projects = [
  { title: "Жилой комплекс «Северин»", images: ["01"] },
  { title: "Промышленный парк «Импульс»", images: ["02", "03", "04"] },
  { title: "Технологический центр с офисными и жилыми помещениями", images: ["05"] },
  { title: "Жилой дом на 296 квартир", images: ["06"] },
  { title: "Жилой дом «Долина ручьёв»", images: ["07"] },
  { title: "Отделка мест общего пользования в ЖК «Северин»", images: ["08", "09"] },
  { title: "Благоустройство ЖК «Северин»", images: ["10", "11"] },
  { title: "Сети электроснабжения", images: ["12", "13"] },
  { title: "Инженерные сети", images: ["14"] },
  { title: "Монолитные и общестроительные работы", images: ["15", "16"] },
];

export default function AboutPage() {
  return (
    <main>
      <header className="site-header">
        <div className="shell nav">
          <Link className="brand" href="/" aria-label="Авангард — на главную">
            <Image
              className="brand-logo"
              src="/brand-logo.png"
              alt="Авангард"
              width={1774}
              height={887}
              priority
              unoptimized
            />
          </Link>
          <nav className="nav-links" aria-label="Основная навигация">
            <Link href="/">Главная</Link>
            <Link href="/about" aria-current="page">О компании</Link>
            <Link href="/#construction">Конструкция системы</Link>
            <Link href="/#documents">Документы</Link>
            <Link href="/#contacts">Контакты</Link>
          </nav>
          <div className="header-contacts">
            <span className="mail-pill">ваша почта@</span>
            <a className="phone-pill" href="tel:+79954933770">
              +7 (995) 493-37-70
            </a>
          </div>
        </div>
      </header>

      <section className="about-hero shell">
        <div className="about-heading">
          <div className="eyebrow">
            <span className="live-dot" aria-hidden="true" />
            Ханты-Мансийск · Строительная отрасль
          </div>
          <h1>О компании</h1>
          <p className="lead">
            Строительная компания зарегистрирована в Ханты-Мансийске
            Ханты-Мансийского автономного округа — Югры.
          </p>
        </div>
        <aside className="about-summary">
          <Image
            className="about-summary-image"
            src="/about-hero.png"
            alt="Строительная площадка и проектная документация"
            width={1672}
            height={941}
            priority
            unoptimized
          />
          <div className="about-summary-content">
            <span className="summary-year">2026</span>
            <h2>Команда с практическим опытом</h2>
            <p>
              Для расширения возможностей предприятия компания усилила
              инженерно-техническое и административно-управленческое направление
              специалистами с результативным опытом в строительстве.
            </p>
            <div className="summary-tag">Генеральный подряд · Строительно-монтажные работы</div>
          </div>
        </aside>
      </section>

      <div className="materials shell" aria-label="Направления работы">
        {["ГЕНПОДРЯД", "КОНСТРУКЦИИ", "ИНЖЕНЕРНЫЕ СЕТИ", "ОТДЕЛКА", "БЛАГОУСТРОЙСТВО"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <section className="project-gallery">
        <div className="shell">
          <div className="section-head compact project-head">
            <div>
              <span className="section-label light">Опыт команды · Реализованные объекты</span>
              <h2>
                <span>Строительные проекты</span>
                <span className="project-head-accent">разного масштаба и назначения</span>
              </h2>
            </div>
            <p>
              Специалисты команды выполняли функции генерального подрядчика в
              коммерческих проектах, а также при строительстве объектов по
              государственным и муниципальным контрактам. Ниже представлена
              подборка объектов и этапов работ из материалов компании.
            </p>
          </div>
          <div className="project-list">
            {projects.map((project, projectIndex) => (
              <article className="project-item" key={project.title}>
                <div className="project-meta">
                  <span>{String(projectIndex + 1).padStart(2, "0")}</span>
                  <h3>{project.title}</h3>
                </div>
                <div className={"project-images count-" + project.images.length}>
                  {project.images.map((image, imageIndex) => (
                    <Image
                      key={image}
                      src={"/company/project-" + image + ".jpg"}
                      alt={project.title + (project.images.length > 1 ? ", вид " + (imageIndex + 1) : "")}
                      width={1280}
                      height={853}
                      unoptimized
                      sizes="(max-width: 620px) calc(100vw - 28px), (max-width: 980px) calc(50vw - 28px), 35vw"
                      loading="lazy"
                    />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="work-section">
        <div className="shell">
          <div className="section-head">
            <div>
              <span className="section-label">Виды работ</span>
              <h2>Комплекс строительных компетенций</h2>
            </div>
            <p>
              Перечень охватывает подготовку площадки, возведение конструкций,
              устройство сетей, защиту оборудования и отделочные работы.
            </p>
          </div>
          <div className="work-grid">
            {workGroups.map((group) => (
              <article className="work-card" key={group.number}>
                <span className="work-number">{group.number}</span>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta shell">
        <div>
          <span className="section-label">Сотрудничество</span>
          <h2>Готовы обсудить строительную задачу</h2>
        </div>
        <p>
          Компания заинтересована в долгосрочных партнёрских отношениях,
          добросовестном исполнении договорных обязательств и сотрудничестве
          по направлениям строительно-монтажных работ.
        </p>
        <Link className="round-link" href="/#contacts" aria-label="Перейти к контактам">↗</Link>
      </section>

      <footer>
        <div className="shell footer-inner">
          <span>ЗАЩИТА БПЛА 86</span>
          <span>Строительство · Инженерные решения · Сопровождение</span>
          <Link href="/">На главную</Link>
        </div>
      </footer>
    </main>
  );
}
