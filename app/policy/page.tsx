import SiteHeader from "../SiteHeader";

export default function PolicyPage() {
  return (
    <main>
      <SiteHeader />

      <section className="policy-page shell">
        <span className="section-label">Документы</span>
        <h1>Политика обработки персональных данных</h1>
        <div className="policy-content" aria-label="Текст политики обработки персональных данных" />
      </section>
    </main>
  );
}
