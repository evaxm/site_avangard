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
          <span className="mail-pill">ваша почта@</span>
          <a className="phone-pill" href="tel:+79954933770">
            +7 (995) 493-37-70
          </a>
        </div>
      </div>
    </header>
  );
}
