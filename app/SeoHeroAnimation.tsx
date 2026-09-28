type SeoHeroAnimationProps = {
  variant: "protective-net" | "design-blueprint";
};

function ProtectiveNetAnimation() {
  return (
    <div
      className="seo-visual seo-visual-net"
      data-animate-on-view
      role="img"
      aria-label="Анимация: беспилотный аппарат приближается к защитной сетке и останавливается у сетчатого контура"
    >
      <div className="seo-visual-topline">
        <span>Сетчатый контур / 01</span>
        <span className="seo-visual-status"><i aria-hidden="true" /> Защита активна</span>
      </div>
      <div className="net-scene" aria-hidden="true">
        <span className="net-flight-line"><b>Траектория БПЛА</b></span>
        <div className="net-drone">
          <i className="net-drone-arm arm-a" />
          <i className="net-drone-arm arm-b" />
          <span className="net-rotor rotor-a" />
          <span className="net-rotor rotor-b" />
          <span className="net-rotor rotor-c" />
          <span className="net-rotor rotor-d" />
          <b>БПЛА</b>
        </div>
        <span className="net-impact-wave wave-a" />
        <span className="net-impact-wave wave-b" />
        <span className="net-impact-point">СТОП</span>
        <div className="net-contour">
          <span className="net-mast mast-a" />
          <span className="net-mast mast-b" />
          <span className="net-mast mast-c" />
          <span className="net-mast mast-d" />
          <div className="net-plane" />
          <b>ЗАЩИТНАЯ СЕТКА</b>
        </div>
        <div className="net-object">
          <span>ЗАЩИЩАЕМЫЙ ОБЪЕКТ</span>
          <i className="net-object-building" />
          <i className="net-object-tank" />
        </div>
        <div className="net-result">КОНТУР УДЕРЖИВАЕТ ВОЗДЕЙСТВИЕ</div>
      </div>
      <div className="seo-visual-footer">
        <span><b>01</b> Опоры</span>
        <span><b>02</b> Тросы</span>
        <span><b>03</b> Сетка</span>
      </div>
    </div>
  );
}

function DesignBlueprintAnimation() {
  return (
    <div
      className="seo-visual seo-visual-blueprint"
      data-animate-on-view
      role="img"
      aria-label="Анимация: на инженерном чертеже последовательно появляются опоры, тросовый контур и защитная сетка"
    >
      <div className="seo-visual-topline">
        <span>Проектный контур / 04</span>
        <span className="seo-visual-status"><i aria-hidden="true" /> Модель строится</span>
      </div>
      <div className="blueprint-scene" aria-hidden="true">
        <svg className="blueprint-drawing" viewBox="0 0 640 430" preserveAspectRatio="xMidYMid meet">
          <g className="blueprint-ground">
            <path d="M84 348L514 348L570 309L148 309Z" />
            <path d="M148 309L148 327M514 348L514 330" />
          </g>
          <g className="blueprint-object">
            <path d="M274 318V222H405V318" />
            <path d="M262 222H417L397 190H284Z" />
            <path d="M300 318V260H326V318M348 246H382V275H348Z" />
            <path d="M382 190V154H402V198" />
          </g>
          <g className="blueprint-masts">
            <path d="M150 319V104M138 319L150 104L162 319M138 319H162M141 276H159M143 232H157M145 188H155M147 145H153" />
            <path d="M500 334V78M487 334L500 78L513 334M487 334H513M490 283H510M492 232H508M495 181H505M497 130H503" />
          </g>
          <g className="blueprint-cables">
            <path d="M150 104L500 78M150 104L500 334M150 319L500 78" />
          </g>
          <g className="blueprint-net">
            <path d="M150 104L500 78L500 334L150 319Z" />
            <path d="M193 101V321M237 98V324M281 95V326M325 91V328M369 88V329M413 85V331M457 81V333" />
            <path d="M150 146L500 123M150 189L500 168M150 232L500 211M150 275L500 256" />
          </g>
          <g className="blueprint-measures">
            <path d="M112 104V319M102 104H122M102 319H122" />
            <path d="M150 370H500M150 360V380M500 360V380" />
          </g>
          <g className="blueprint-nodes">
            <circle cx="150" cy="104" r="7" />
            <circle cx="500" cy="78" r="7" />
            <circle cx="150" cy="319" r="7" />
            <circle cx="500" cy="334" r="7" />
          </g>
        </svg>
        <span className="blueprint-dimension dimension-v">H / РАСЧЁТ</span>
        <span className="blueprint-dimension dimension-h">ПРОЛЁТ / РАСЧЁТ</span>
        <span className="blueprint-note note-a">УЗЕЛ 01</span>
        <span className="blueprint-note note-b">УЗЕЛ 04</span>
        <span className="blueprint-scan" />
        <div className="blueprint-ready">РАБОЧАЯ МОДЕЛЬ ГОТОВА</div>
      </div>
      <div className="seo-visual-footer">
        <span><b>01</b> Исходные данные</span>
        <span><b>02</b> Расчёт</span>
        <span><b>03</b> Документация</span>
      </div>
    </div>
  );
}

export default function SeoHeroAnimation({ variant }: SeoHeroAnimationProps) {
  return variant === "protective-net"
    ? <ProtectiveNetAnimation />
    : <DesignBlueprintAnimation />;
}
