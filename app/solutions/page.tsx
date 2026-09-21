import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../SiteHeader";
import { protectedObjectGroups } from "./data";

export const metadata: Metadata = {
  title: "Отраслевые решения",
  description:
    "Защитные ограждающие конструкции для промышленных и инфраструктурных объектов.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <main>
      <SiteHeader current="solutions" />

      <section className="object-scope solutions-page">
        <div className="shell">
          <div className="object-scope-intro">
            <div>
              <span className="section-label light">Отраслевые решения</span>
              <h1>
                Защитные ограждающие конструкции (ЗОК) для промышленных и
                инфраструктурных объектов
              </h1>
            </div>
            <div className="object-scope-copy">
              <p>
                Инженерная система защиты от БПЛА — комплексное решение для
                физической защиты объектов с учётом их конфигурации,
                технологических зон и особенностей эксплуатации.
              </p>
              <p>
                Проектируем и устанавливаем защитные ограждающие конструкции
                для предприятий ТЭК, энергетики, промышленности, связи и
                транспортной инфраструктуры.
              </p>
            </div>
          </div>
          <div className="object-grid">
            {protectedObjectGroups.map((group, index) => (
              <article className="object-card" key={group.title}>
                <div className="object-card-media">
                  <Image
                    src={group.image}
                    alt={group.imageAlt}
                    fill
                    unoptimized
                    sizes="(max-width: 620px) calc(100vw - 48px), (max-width: 980px) calc(100vw - 56px), 48vw"
                  />
                </div>
                <div className="object-card-body">
                  <div className="object-card-head">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h2>{group.title}</h2>
                  </div>
                  <ul>
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta shell solutions-cta">
        <div>
          <span className="section-label">Индивидуальный проект</span>
          <h2>Подберём решение для вашего объекта</h2>
        </div>
        <p>
          Учитываем конфигурацию площадки, критические зоны, режим эксплуатации
          и требования заказчика.
        </p>
        <Link className="button primary" href="/#contacts">Обсудить объект →</Link>
      </section>

      <footer>
        <div className="shell footer-inner">
          <span>ЗАЩИТА БПЛА 86</span>
          <span>Проектирование · Реализация · Сопровождение</span>
          <Link href="/">На главную</Link>
        </div>
      </footer>
    </main>
  );
}
