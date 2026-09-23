import Image from "next/image";
import Link from "next/link";

type SiteHeaderProps = {
  current?: "home" | "about" | "solutions";
};

export default function SiteHeader({ current }: SiteHeaderProps) {
  return (
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
          <Link href="/" aria-current={current === "home" ? "page" : undefined}>Главная</Link>
          <Link href="/about" aria-current={current === "about" ? "page" : undefined}>О компании</Link>
          <Link href="/#construction">Конструкция системы</Link>
          <Link href="/solutions" aria-current={current === "solutions" ? "page" : undefined}>Отраслевые решения</Link>
          <Link href="/#contacts">Контакты</Link>
        </nav>
        <div className="header-contacts">
          <a className="mail-pill" href="mailto:86.avangard@bk.ru">
            86.avangard@bk.ru
          </a>
          <a className="phone-pill" href="tel:+79825582286">
            8 982 558 22 86
          </a>
        </div>
      </div>
    </header>
  );
}
