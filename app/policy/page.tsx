import Image from "next/image";
import Link from "next/link";

export default function PolicyPage() {
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
            <Link href="/about">О компании</Link>
            <Link href="/#construction">Конструкция системы</Link>
            <Link href="/#documents">Документы</Link>
            <Link href="/#contacts">Контакты</Link>
          </nav>
          <div className="header-contacts">
            <span className="mail-pill">ваша почта@</span>
            <a className="phone-pill" href="tel:+79954933770">+7 (995) 493-37-70</a>
          </div>
        </div>
      </header>

      <section className="policy-page shell">
        <span className="section-label">Документы</span>
        <h1>Политика обработки персональных данных</h1>
        <div className="policy-content" aria-label="Текст политики обработки персональных данных" />
      </section>
    </main>
  );
}
