"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu as MenuIcon, X } from "lucide-react";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const productImages = [
  {
    src: "/images/bitácora nuevo angulo.jpg",
    alt: "Bitácora Reminiscencia vista desde un nuevo ángulo",
  },
  {
    src: "/images/Bitácora cerrada _ vista completa.jpg",
    alt: "Bitácora Reminiscencia cerrada, vista completa",
  },
  {
    src: "/images/Bitácora abierta _ vista previa.jpg",
    alt: "Bitácora Reminiscencia abierta, vista previa",
  },
  {
    src: "/images/bitácora primer primerísimo plano.jpg",
    alt: "Detalle de la cubierta y la cianotipia de la bitácora",
  },
];
const imageSeries = (prefix: string, count = 10) =>
  Array.from({ length: count }, (_, index) => `/images/${prefix} ${index + 1}.jpg`);
const trendGalleryImages: Record<string, string[]> = {
  "Degradados Granulados": imageSeries("degradados granulados"),
  "Tipografía Cinética y Elástica": imageSeries("Tipografía cinética"),
  "Maximalismo Botánico y Veraniego": imageSeries("maximalismo botánico", 3),
  "Retículas Bento y Diseño Modular": imageSeries("Grid Layout"),
  "Neobrutalismo Editorial": [
    ...imageSeries("Neo brutalism", 4),
    "/images/Neo brutalism 4.png",
    ...imageSeries("Neo brutalism", 10).slice(4),
  ],
  "Minimalismo Suizo Contemporáneo": imageSeries("Minimalismo suizo"),
  "Simbolismo Medieval-Moderno y Tarot": imageSeries("Simbolismo medieval"),
  "Estética Zine y Neo-Punk Fotocopiado": imageSeries("Neo punk"),
  "Tipografía Gótica Experimental": imageSeries("gotico experimental"),
  "Estética Táctil y Collage Analógico": imageSeries("Estética tactil"),
  "Diseño Micro-Industrial y Utilitario": imageSeries("diseño micro-industrial"),
  "Minimalismo Audaz con Ink Traps": imageSeries("Minimalismo audaz"),
};
const mockupImages: Record<string, string[]> = {
  Prendas: [
    "/images/Prendas 1.jpg",
    "/images/Prendas 2.jpg",
    "/images/Prendas 3.jpg",
    "/images/Prendas 4.jpg",
  ],
  Dispositivos: ["/images/Dispositivos 1.jpg", "/images/Dispositivos 2.jpg"],
  "Libros y revistas": [
    "/images/Libros y revistas 1.jpg",
    "/images/Libros y revistas 2.jpg",
    "/images/Libros y revistas 3.jpg",
    "/images/Libros y revistas 4.jpg",
  ],
  Papelería: ["/images/Papelería 1.jpg", "/images/Papelería 2.jpg"],
  Embalaje: ["/images/Embalaje 1.jpg", "/images/Embalaje 2.jpg", "/images/Embalaje 3.jpg"],
};
const trendContent: Record<
  string,
  {
    title: string;
    subtitle: string;
    intro: string;
    themes: string[];
    subthemes: string[];
  }
> = {
  agosto: {
    title: "Agosto",
    subtitle: "Dinamismo visual y experimentación sensorial",
    intro:
      "Agosto llega cargado de dinamismo visual, calidez y experimentación sensorial. En esta edición, el diseño gráfico se libera de la rigidez para explorar el ritmo y el color en estado puro: desde degradados granulados con estética aura que aportan atmósfera, hasta tipografías elásticas en constante movimiento y collages botánicos de alto contraste. Un mes dominado por composiciones expresivas, texturas atmosféricas y paletas saturadas que transmiten energía inmediata.",
    themes: [
      "Degradados Granulados",
      "Tipografía Cinética y Elástica",
      "Maximalismo Botánico y Veraniego",
    ],
    subthemes: ["Grainy Aura Gradients", "Kinetic & Stretch Type", "Vibrant Botanical Collage"],
  },
  septiembre: {
    title: "Septiembre",
    subtitle: "Retículas editoriales y composición modular",
    intro:
      "Septiembre marca el retorno a la estructura, la claridad visual y el rigor compositivo. En esta edición, el diseño gráfico prioriza la legibilidad y el equilibrio funcional sin perder fuerza estética: desde retículas bento que organizan la información en bloques precisos, hasta la contundencia cruda del neobrutalismo editorial y la vigencia del minimalismo suizo contemporáneo.",
    themes: [
      "Retículas Bento y Diseño Modular",
      "Neobrutalismo Editorial",
      "Minimalismo Suizo Contemporáneo",
    ],
    subthemes: ["Bento Grid Layout", "Editorial Neo-Brutalism", "Modern Swiss Grid"],
  },
  octubre: {
    title: "Octubre",
    subtitle: "Simbolismo, fotocopia y estética oscura",
    intro:
      "Octubre marca un giro hacia lo introspectivo, lo místico y lo contracultural. Durante este mes, el diseño gráfico abraza el contraste dramático y la carga simbólica: desde la reinterpretación contemporánea de grabados medievales y arquetipos del tarot, hasta la estética cruda del zine fotocopiado y la tipografía gótica experimental.",
    themes: [
      "Simbolismo Medieval-Moderno y Tarot",
      "Estética Zine y Neo-Punk Fotocopiado",
      "Tipografía Gótica Experimental",
    ],
    subthemes: ["Modern Medieval & Mystic", "Punk Zine & Grunge", "Experimental Blackletter"],
  },
  noviembre: {
    title: "Noviembre",
    subtitle: "Materia, oficio y estética utilitaria",
    intro:
      "Noviembre reivindica lo físico y lo comprobablemente humano frente a la saturación digital. En esta edición, el diseño gráfico encuentra su fuerza en la honestidad de los materiales y el rigor técnico: desde el collage analógico y la risografía que celebran el grano del papel real, hasta el diseño micro-industrial inspirado en etiquetas utilitarias y tipografías audaces marcadas por ink traps expresivos.",
    themes: [
      "Estética Táctil y Collage Analógico",
      "Diseño Micro-Industrial y Utilitario",
      "Minimalismo Audaz con Ink Traps",
    ],
    subthemes: [
      "Tactile Craft & Provenance",
      "Utilitarian & Receipt Aesthetic",
      "Bold Minimalism & Ink Traps",
    ],
  },
};
const fonts = [
  {
    name: "AZ Plug Italic",
    sample: "Aa",
    description:
      "AZ Plug Italic es una tipografía con estilo serif (con remates) inspirada en el arte de carteles de principios del siglo XX de Edward Penfield y Franz Hazenplug.",
    style: "serif italic",
  },
  {
    name: "Climate Crisis",
    sample: "Aa",
    description:
      "Climate Crisis es una tipografía variable y de código abierto diseñada para visualizar la urgencia del cambio climático.",
    style: "display",
  },
  {
    name: "Quicksand",
    sample: "Aa",
    description:
      "Quicksand es una tipografía sans-serif geométrica con terminaciones redondeadas, diseñada originalmente en 2008 por Andrew Paglinawan.",
    style: "rounded",
  },
];
const mockups = ["Prendas", "Dispositivos", "Libros y revistas", "Papelería", "Embalaje"];

function Header({
  onMenu,
  onCart,
  count,
}: {
  onMenu: () => void;
  onCart: () => void;
  count: number;
}) {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="NODO, inicio">
        <img src="/images/Logo.png" alt="NODO" />
      </Link>
      <nav className="desktop-nav">
        <a href="#recursos">Recursos</a>
        <Link href="/inspiracion">Inspiración</Link>
        <Link href="/productos">Productos</Link>
        <span className="nav-divider" />
        <a href="#newsletter">Newsletter</a>
      </nav>
      <div className="header-actions">
        <button className="login" onClick={() => alert("Próximamente: acceso a tu cuenta NODO")}>
          Iniciar Sesión
        </button>
        <button
          aria-label="Mi cuenta"
          className="icon-button"
          onClick={() => alert("Próximamente: acceso a tu cuenta NODO")}
        >
          <img src="/images/user%20_%20icon.png" alt="" />
        </button>
        <button aria-label={`Cesta, ${count} productos`} className="icon-button" onClick={onCart}>
          <img src="/images/shopping%20_%20icon.png" alt="" />
          {count > 0 && <b className="cart-count">{count}</b>}
        </button>
        <button aria-label="Abrir menú" className="icon-button mobile-menu-button" onClick={onMenu}>
          <MenuIcon />
        </button>
      </div>
    </header>
  );
}
function PageBar({
  onMenu,
  onBack,
  onCart,
  count,
  showCart = true,
}: {
  onMenu: () => void;
  onBack: () => void;
  onCart: () => void;
  count: number;
  showCart?: boolean;
}) {
  return (
    <div className="page-bar">
      <button className="burst" aria-label="Abrir menú" onClick={onMenu}>
        <img src="/images/Men%C3%BA.png" alt="" />
      </button>
      <Link href="/" className="brand">
        <img src="/images/Logo.png" alt="NODO" />
      </Link>
      <div className="page-actions">
        {showCart && (
          <button className="icon-button" aria-label={`Cesta, ${count} productos`} onClick={onCart}>
            <img src="/images/shopping%20_%20icon.png" alt="" />
            {count > 0 && <b className="cart-count">{count}</b>}
          </button>
        )}
        <button className="burst" aria-label="Atrás" onClick={onBack}>
          <img src="/images/Atr%C3%A1s.png" alt="" />
        </button>
      </div>
    </div>
  );
}
function QuickTools({
  onMenu,
  onCart,
  onSearch,
  showCart = true,
}: {
  onMenu: () => void;
  onCart: () => void;
  onSearch: (query: string) => void;
  showCart?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="utility">
      <span />
      {expanded && (
        <input
          aria-label="Buscar en esta sección"
          placeholder="Buscar..."
          onChange={(event) => onSearch(event.target.value)}
        />
      )}
      <button aria-label="Buscar" onClick={() => setExpanded((value) => !value)}>
        <img className="search-icon" src="/images/Lupa%20_%20icon.png" alt="" />
      </button>
      {showCart && (
        <button aria-label="Abrir cesta" onClick={onCart}>
          <img src="/images/shopping%20_%20icon.png" alt="" />
        </button>
      )}
      <button aria-label="Abrir menú" onClick={onMenu}>
        <img className="menu-icon" src="/images/barra%20_%20icon.png" alt="" />
      </button>
    </div>
  );
}
function Footer() {
  return (
    <>
      <footer className="footer">
        <strong>
          <img src="/images/Logo.png" alt="NODO" />
        </strong>
        <div className="footer-legal">
          <p>
            © 2026 NODO. Todos los derechos reservados. Proyecto creativo y colaborativo
            desarrollado por Anyi Valentina Rico, Paola Andrea Chaparro y Karen Córdoba en Bogotá,
            Colombia.
          </p>
          <p>
            Las tipografías, mockups, paletas y referentes externos recopilados en esta plataforma
            pertenecen a sus respectivos autores y se comparten únicamente con fines educativos, de
            consulta e inspiración.
          </p>
          <p>
            Los productos de la tienda física/digital, así como las piezas gráficas y talleres
            propios, son propiedad intelectual de NODO y sus creadoras.
          </p>
          <p>Política de Privacidad | Términos y Condiciones | Aviso de Derechos de Autor</p>
        </div>
        <div>Instagram (@grainpaper.col)　 ·　 Behance　 ·　 Pinterest　 ·　 TikTok</div>
      </footer>
      <div className="footer-grain">
        <img className="footer-grain-logo" src="/images/Logo%20gra!n.png" alt="gra!n" />
        <a
          className="footer-grain-instagram"
          href="https://www.instagram.com/grainpaper.col?avpt=MWlrNmR5eThvNjlvNw=="
          target="_blank"
          rel="noreferrer"
        >
          <span>
            Ingresa a<br />
            nuestro
            <br />
            Instagram
          </span>
          <img src="/images/qr%20instagram.png" alt="Código QR para visitar el Instagram de NODO" />
        </a>
      </div>
    </>
  );
}
function Notices() {
  return (
    <section className="notices">
      <h2>
        No te <span>lo</span> pierdas...
      </h2>
      <div className="notice-grid">
        <article className="notice-banner-card">
          <img
            src="/images/cartel%20encuadernacion.jpg"
            alt="Cartel del taller de encuadernación artesanal"
          />
        </article>
        <article className="notice-banner-card">
          <img
            src="/images/cartel%20inaguracion.jpg"
            alt="Cartel de inauguración de la tienda GRA!N"
          />
        </article>
        <article className="notice-banner-card">
          <img
            src="/images/cartel%20tipograf%C3%ADa%20expe.jpg"
            alt="Cartel del taller de tipografía experimental"
          />
        </article>
      </div>
    </section>
  );
}

function Home() {
  const [currentMonth, setCurrentMonth] = useState<string | null>(null);

  useEffect(() => {
    setCurrentMonth(months[new Date().getMonth()].toLowerCase());
  }, []);

  return (
    <>
      <section className="hero-grid" aria-label="Banner principal">
        <img src="/images/banner.jpg.jpeg" alt="Banner principal de NODO" />
      </section>
      <section className="monthly section-wrap">
        <h2>Tendencias del mes</h2>
        <div className="monthly-layout">
          <div className="mini-stamps" aria-label="Enlaces a recursos">
            <Link href="/tendencias/octubre" aria-label="Ver tendencias de octubre">
              <span className="stamp-image">
                <img className="stamp-default" src="/trend-stamp-a.png" alt="" />
                <img className="stamp-preview" src="/images/vista%20previa%20_%20oct.png" alt="" />
              </span>
            </Link>
            <Link href="/tendencias/septiembre" aria-label="Ver tendencias de septiembre">
              <span className="stamp-image">
                <img className="stamp-default" src="/trend-stamp-grid.png" alt="" />
                <img className="stamp-preview" src="/images/vista%20previa%20_%20sep.png" alt="" />
              </span>
            </Link>
            <Link href="/tendencias/agosto" aria-label="Ver tendencias de agosto">
              <span className="stamp-image">
                <img className="stamp-default" src="/trend-stamp-stretch.png" alt="" />
                <img className="stamp-preview" src="/images/vista%20previa%20_%20ago.png" alt="" />
              </span>
            </Link>
          </div>
          <article className="monthly-copy">
            <div className="rule" />
            <h3>
              Pulso Gráfico.
              <br />
              Edición Mensual
            </h3>
            <p>
              Descubre cómo evoluciona el diseño gráfico a lo largo del año. Explora nuevas
              tendencias y movimientos visuales emergentes.
            </p>
            <Link className="pill blue-pill" href="/tendencias">
              Ver todas las tendencias ↗
            </Link>
          </article>
          <Link
            className="monthly-image"
            href={currentMonth ? `/tendencias/${currentMonth}` : "/tendencias"}
            aria-label={`Descubrir tendencias${currentMonth ? ` de ${currentMonth}` : ""}`}
          >
            <span className="monthly-image-stack">
              <img
                className="monthly-image-default"
                src="/0b341d8b-replacement-image-1.png"
                alt="Collage editorial colorido de NODO"
              />
              <img
                className="monthly-image-preview"
                src="/images/vista%20previa%20_%20este%20mes.png"
                alt=""
              />
            </span>
          </Link>
        </div>
      </section>
      <div className="color-stripe" aria-hidden="true" />
      <section id="recursos" className="home-anchor-section">
        <Resources showFooter={false} />
      </section>
      <section id="newsletter" className="home-anchor-section">
        <Notices />
      </section>
      <Footer />
    </>
  );
}
function Resources({ showFooter = true }: { showFooter?: boolean }) {
  return (
    <>
      <section className="resources-page">
        <div>
          <img className="resources-banner" src="/images/Recursos.png" alt="Recursos" />
        </div>
        <div className="resource-links">
          <Link href="/recursos/tipografias">
            <img src="/images/Tipograf%C3%ADas.png" alt="Tipografías" />
          </Link>
          <Link href="/recursos/formatos">
            <img src="/images/Formatos.png" alt="Formatos" />
          </Link>
          <Link href="/inspiracion">
            <img src="/images/Mockups.png" alt="Mockups" />
          </Link>
        </div>
      </section>
      <p className="center-note">Herramientas para llevar tus ideas más lejos.</p>
      {showFooter && <Footer />}
    </>
  );
}
function Newsletter() {
  return (
    <>
      <Notices />
      <Footer />
    </>
  );
}
function Typography() {
  return (
    <>
      <section className="black-title typography-banner">
        <img
          src="/images/Tendencias%20_%20banner-01.jpg"
          alt="Tipografías — Cabinet Grotesk Variable"
        />
      </section>
      <div className="font-list">
        {fonts.map((font, i) => (
          <article className="font-row" key={font.name}>
            <div className={`font-sample sample-${i}`}>
              {i === 0 ? (
                <img src="/images/Tipografias-31.png" alt="Muestra de AZ Plug Italic" />
              ) : i === 1 ? (
                <img src="/images/Tipografias-32.png" alt="Muestra de Climate Crisis" />
              ) : i === 2 ? (
                <img src="/images/Tipografias-33.png" alt="Muestra de Quicksand" />
              ) : (
                font.sample
              )}
            </div>
            <div className="font-info">
              <h2 className={font.style}>{font.name}</h2>
              <p>{font.description}</p>
              <div className="tags">
                <span>Estilo</span>
                <span>Creador</span>
                <span>Aplicaciones</span>
                <span>Formatos de descarga</span>
              </div>
              <button
                className="download"
                onClick={() =>
                  alert(
                    "El archivo original de esta tipografía aún no está disponible. Aquí se añadirá su descarga oficial.",
                  )
                }
              >
                DESCARGAR ↗
              </button>
            </div>
          </article>
        ))}
      </div>
      <Footer />
    </>
  );
}
function Formats() {
  return (
    <>
      <section className="format-banner format-image-banner">
        <img src="/images/Formatos%20_%20banner.jpg" alt="Formatos" />
      </section>
      <article className="guide">
        <h2>
          Guía definitiva de tamaños de papel
          <br />
          en diseño gráfico: <b>Medidas, usos y sangrados</b>
        </h2>
        <p>
          En el diseño editorial e impreso, elegir las dimensiones correctas no es solo una cuestión
          estética, sino técnica. Utilizar formatos estandarizados optimiza el aprovechamiento del
          papel en imprenta, reduce costos y asegura que tus piezas encajen perfectamente en sobres,
          carpetas o exhibidores. A continuación, repasamos los formatos más utilizados en diseño
          gráfico, junto con sus medidas exactas y el sangrado recomendado —un margen de seguridad
          de 3 mm por lado que evita filos blancos no deseados al momento de guillotinar el papel.
        </p>
        <div className="guide-columns">
          <div className="guide-column series-column">
            <section>
              <h3>
                Serie A<br />
                <small>(Estándar ISO)</small>
              </h3>
              <p>
                <b>A2 (42.0 cm x 59.4 cm | Sangrado: 42.6 cm x 60.0 cm):</b> Es un formato de gran
                impacto visual. Se utiliza principalmente para pósteres promocionales, cartelería en
                puntos de venta, planos arquitectónicos y calendarios de pared.
              </p>
              <p>
                <b>A3 (29.7 cm x 42.0 cm | Sangrado: 30.3 cm x 42.6 cm):</b> El doble de una hoja
                estándar. Ideal para carteles de interior, menús de restaurantes extendidos,
                infografías y presentaciones visuales.
              </p>
              <p>
                <b>A4 (21.0 cm x 29.7 cm | Sangrado: 21.6 cm x 30.3 cm):</b> El rey de la papelería
                corporativa. El estándar para hojas membretadas, informes, catálogos, revistas y
                currículums.
              </p>
              <p>
                <b>A5 (14.8 cm x 21.0 cm | Sangrado: 15.4 cm x 21.6 cm):</b> Equivale a la mitad de
                un A4. Su portabilidad lo hace perfecto para flyers, cuadernos y programas.
              </p>
              <p>
                <b>A6 (10.5 cm x 14.8 cm | Sangrado: 11.1 cm x 15.4 cm):</b> Un formato compacto y
                económico. Se emplea mucho para volantes promocionales de reparto masivo,
                invitaciones, tarjetas de felicitación y pequeños recetarios.
              </p>
            </section>
          </div>
          <div className="guide-column special-column">
            <section>
              <h3>Formatos especiales y de marketing</h3>
              <p>
                <b>
                  D.L. (Dimensión Lengthwise) — 11.0 cm x 22.0 cm (Sangrado: 11.6 cm x 22.6 cm):
                </b>{" "}
                Este formato alargado corresponde exactamente a un tercio de una hoja A4, por lo que
                es el estándar por excelencia para los trípticos plegados. Además de folletos
                informativos, se utiliza muchísimo para sobres comerciales estándar, vales de
                regalo, menús de bebidas y entradas o boletos para eventos.
              </p>
              <p>
                <b>Postal (Post Card) — 14.0 cm x 10.0 cm (Sangrado: 14.6 cm x 10.6 cm):</b> Con una
                orientación horizontal clásica, es una pieza versátil que va mucho más allá del
                correo tradicional. En diseño de marca actual se emplea con frecuencia como tarjeta
                de agradecimiento dentro de los empaques de e-commerce, invitaciones informales,
                recordatorios de citas o flyers de mano con un acabado más rígido y coleccionable.
              </p>
              <p>
                <b>
                  Tarjeta de presentación (Business Card) — 9.0 cm x 5.5 cm (Sangrado: 9.6 cm x 6.1
                  cm):
                </b>{" "}
                Es la pieza fundamental de la identidad corporativa y el networking, diseñada para
                caber cómodamente en cualquier billetera o tarjetero. Más allá de mostrar datos de
                contacto, este formato se adapta muy bien como tarjeta de fidelización para clientes
                frecuentes o como etiqueta colgante (hang tag) para productos y prendas de vestir.
              </p>
              <p>
                <b>Marcapáginas (Bookmark) — 5.0 cm x 14.8 cm (Sangrado: 5.6 cm x 15.4 cm):</b> Su
                proporción estrecha y vertical lo convierte en un recurso muy atractivo para el
                merchandising editorial y promocional. Al tener exactamente la misma altura que un
                formato A5 o A6, es ideal para acompañar libros y cuadernos, pero también funciona
                de maravilla como cupón de descuento, separador de agenda o pieza recordatoria de
                marca con un diseño vertical llamativo.
              </p>
            </section>
          </div>
        </div>
        <h2 className="tips-heading">
          CONSEJOS
          <br />
          <small>antes de mandar a imprenta</small>
        </h2>
        <div className="blue-note">
          <p>
            <b>Respeta siempre el sangrado:</b> Extiende los fondos de color, fotografías o texturas
            hasta la línea de sangrado (3 mm adicionales a cada lado) para que el corte final quede
            limpio.
          </p>
          <p>
            <b>Cuida los márgenes internos:</b> Así como dejas espacio hacia afuera para el corte,
            mantén los textos y logotipos importantes al menos a 4 o 5 mm hacia adentro del borde
            final.
          </p>
          <p>
            <b>Configura el color y la resolución:</b> Trabaja siempre en perfil de color CMYK y
            asegúrate de que todas las imágenes enlazadas tengan una resolución mínima de 300 ppp
            (dpi).
          </p>
        </div>
      </article>
      <Footer />
    </>
  );
}
function Inspiration({ onMenu, onCart }: { onMenu: () => void; onCart: () => void }) {
  const [filter, setFilter] = useState("Todos");
  const [query, setQuery] = useState("");
  const data = mockups
    .flatMap((cat) => mockupImages[cat].map((img) => ({ cat, img })))
    .map((item, i) => ({ ...item, i }));
  return (
    <>
      <section className="format-banner format-image-banner mockup-image-banner">
        <img src="/images/Mockups%20_%20banner.jpg" alt="Mockups" />
      </section>
      <div className="mockup-top">
        <QuickTools onMenu={onMenu} onCart={onCart} onSearch={setQuery} showCart={false} />
        <h1>
          ¡Consigue
          <br />
          <b>los mejores mockups!</b>
        </h1>
        <div className="filters">
          {mockups.map((item, i) => (
            <button
              key={item}
              className={`filter filter-${i}`}
              onClick={() => setFilter(filter === item ? "Todos" : item)}
              aria-pressed={filter === item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="masonry">
        {data
          .filter(
            (item) =>
              (filter === "Todos" || item.cat === filter) &&
              item.cat.toLowerCase().includes(query.toLowerCase()),
          )
          .map((item) => (
            <figure className={`masonry-item item-${item.i % 5}`} key={item.i}>
              <img src={item.img} alt={`Mockup de ${item.cat.toLowerCase()}`} />
              <figcaption>{item.cat}</figcaption>
            </figure>
          ))}
      </div>
      <Footer />
    </>
  );
}
function Trends({ onMenu, onCart }: { onMenu: () => void; onCart: () => void }) {
  const [query, setQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const monthNavRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setSelectedMonth(months[new Date().getMonth()].toLowerCase());
  }, []);

  const moveMonths = (direction: -1 | 1) => {
    const monthNav = monthNavRef.current;
    if (monthNav) {
      monthNav.scrollBy({ left: direction * monthNav.clientWidth * 0.75, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="hero-grid format-image-banner" aria-label="Banner de tendencias">
        <img src="/images/tendencias%20banner%20nuevo.png" alt="Tendencias" />
      </section>
      <QuickTools onMenu={onMenu} onCart={onCart} onSearch={setQuery} showCart={false} />
      <div className="month-picker">
        <button
          className="month-arrow"
          type="button"
          aria-label="Meses anteriores"
          onClick={() => moveMonths(-1)}
        >
          <img src="/images/Mover%20izquierda.png" alt="" />
        </button>
        <nav className="month-nav" aria-label="Tendencias por mes" ref={monthNavRef}>
          {months
            .filter((m) => m.toLowerCase().includes(query.toLowerCase()))
            .map((m) => (
              <button
                type="button"
                key={m}
                aria-pressed={selectedMonth === m.toLowerCase()}
                className={selectedMonth === m.toLowerCase() ? "selected" : ""}
                onClick={() => setSelectedMonth(m.toLowerCase())}
              >
                {m}
              </button>
            ))}
        </nav>
        <button
          className="month-arrow"
          type="button"
          aria-label="Meses siguientes"
          onClick={() => moveMonths(1)}
        >
          <img src="/images/Mover%20derecha.png" alt="" />
        </button>
      </div>
      {selectedMonth && <TrendMonth month={selectedMonth} />}
      <Footer />
    </>
  );
}
function TrendMonth({ month }: { month: string }) {
  const item = trendContent[month.toLowerCase()];
  const isAugust = month.toLowerCase() === "agosto";
  if (!item)
    return (
      <section className="month-empty" aria-live="polite">
        <div className="month-name">
          <h1>{months.find((m) => m.toLowerCase() === month.toLowerCase()) ?? month}</h1>
        </div>
        <p>Lo sentimos. Seguimos trabajando para traerte las mejores tendencias de este mes.</p>
      </section>
    );
  return (
    <div className={`trend-month${isAugust ? " trend-month-august" : ""}`} aria-live="polite">
      <div className="month-name">
        <h1>{item.title}</h1>
      </div>
      <div className="month-intro">
        <p>{item.intro}</p>
      </div>
      {item.themes.map((theme, i) => (
        <section className={`trend-theme${isAugust ? " trend-theme-august" : ""}`} key={theme}>
          <h2>{theme}</h2>
          <h3>
            {isAugust && i === 0 ? "y Aura (Grainy Aura Gradients)" : `(${item.subthemes[i]})`}
          </h3>
          <p className="theme-summary">
            {
              [
                "Uso de transiciones de color vibrantes y difusas con textura de ruido analógico para transmitir calidez y movimiento.",
                "Letras estiradas, onduladas o repetidas que simulan vibración y ritmo visual en carteles e identidades.",
                "Mezcla de fotografía recortada con ilustraciones florales y colores saturados.",
              ][i % 3]
            }
          </p>
          <TrendGallery theme={theme} images={trendGalleryImages[theme]} />
        </section>
      ))}
    </div>
  );
}

function TrendGallery({ theme, images }: { theme: string; images: string[] }) {
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const moveGallery = (direction: -1 | 1) => {
    const gallery = galleryRef.current;
    if (gallery) {
      gallery.scrollBy({ left: direction * gallery.clientWidth * 0.75, behavior: "smooth" });
    }
  };

  return (
    <div className="trend-gallery-wrap">
      <button
        type="button"
        className="trend-gallery-arrow trend-gallery-arrow-left"
        aria-label={`Imágenes anteriores de ${theme}`}
        onClick={() => moveGallery(-1)}
      >
        <ArrowLeft aria-hidden="true" />
      </button>
      <div className="trend-gallery" ref={galleryRef}>
        {images.map((image, index) => (
          <img key={image} src={image} alt={`${theme}, referencia visual editorial ${index + 1}`} />
        ))}
      </div>
      <button
        type="button"
        className="trend-gallery-arrow trend-gallery-arrow-right"
        aria-label={`Imágenes siguientes de ${theme}`}
        onClick={() => moveGallery(1)}
      >
        <ArrowRight aria-hidden="true" />
      </button>
    </div>
  );
}

function Products() {
  return (
    <>
      <section className="products-hero" aria-label="Productos">
        <img src="/images/Productos _ banner-05.jpg" alt="Productos" />
      </section>
      <section className="product-intro-banner" aria-label="GRA!N, libretas artesanales">
        <img
          src="/images/banners gra!n-06.png"
          alt="GRA!N, libretas artesanales y personalizables"
          loading="lazy"
        />
      </section>
      <section className="collection-intro" aria-labelledby="collection-title">
        <div className="collection-intro-heading">
          <h2 id="collection-title">Nueva Colección</h2>
          <p>Reminiscencia</p>
        </div>
        <img
          className="collection-mascot"
          src="/images/oso.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
        <img
          className="collection-butterfly"
          src="/images/Mariposa.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
        <p className="collection-description">
          Inspirada en la huella del tiempo y la nostalgia. Una entrega artesanal donde el papel
          pergamino actúa como un velo sobre el azul de Prusia, emulando el instante en que un
          recuerdo vuelve a tomar forma.
        </p>
      </section>
      <Link
        className="product-banner-link"
        href="/productos/bitacora"
        aria-label="Ver y comprar la Bitácora Reminiscencia"
      >
        <img
          src="/images/banners gra!n-07.png"
          alt="Bitácora Reminiscencia, ver producto"
          loading="lazy"
        />
      </Link>
      <Footer />
    </>
  );
}
function ProductDetail({ onAdd, onBuy }: { onAdd: () => void; onBuy: (quantity: number) => void }) {
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const moveImage = (direction: -1 | 1) => {
    setActiveImage(
      (current) => (current + direction + productImages.length) % productImages.length,
    );
  };
  return (
    <>
      <section className="product-detail">
        <div className="product-photo">
          <div className="product-main-image">
            <img src={productImages[activeImage].src} alt={productImages[activeImage].alt} />
          </div>
          <div className="product-gallery-controls">
            <button
              type="button"
              className="product-gallery-arrow"
              aria-label="Imagen anterior"
              onClick={() => moveImage(-1)}
            >
              <img src="/images/flecha izquierda.png" alt="" />
            </button>
            <div className="thumbs">
              {productImages.map((image, index) => (
                <button
                  type="button"
                  key={image.src}
                  className={`product-thumbnail${activeImage === index ? " is-active" : ""}`}
                  aria-label={`Ver imagen ${index + 1}: ${image.alt}`}
                  aria-pressed={activeImage === index}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image.src} alt="" />
                </button>
              ))}
            </div>
            <button
              type="button"
              className="product-gallery-arrow"
              aria-label="Imagen siguiente"
              onClick={() => moveImage(1)}
            >
              <img src="/images/flecha derecha.png" alt="" />
            </button>
          </div>
        </div>
        <div className="product-buy">
          <h1>Bitácora Reminiscencia</h1>
          <strong className="price">$65.000,00</strong>
          <div className="buy-row">
            <div className="quantity">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Restar">
                −
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)} aria-label="Sumar">
                ＋
              </button>
            </div>
            <button className="add-cart" onClick={() => Array.from({ length: qty }).forEach(onAdd)}>
              Añadir a la cesta
            </button>
          </div>
          <button className="buy-now" onClick={() => onBuy(qty)}>
            Comprar ahora
          </button>
          <h2>Reminiscencia. Un viaje a la nostalgia infantil</h2>
          <p>
            Hecha a mano, íntima y llena de historias. Esta no es una simple libreta, sino un
            espacio vivo diseñado para resguardar tus recuerdos. Uniendo la química de la imagen con
            la delicadeza del oficio editorial, cada detalle de esta bitácora GRA!N invita a
            interactuar con el pasado, revelándolo capa por capa.
          </p>
          <h3>Una experiencia tridimensional de la nostalgia</h3>
          <p>
            <b>Portada externa con ventana:</b> Su cubierta rígida, revestida en lino de tono
            natural, incorpora un visor calado en el plano frontal que rompe la bidimensionalidad y
            enmarca un fragmento del interior, funcionando como un diafragma que invita a espiar el
            alma de la pieza antes de abrirla.
          </p>
          <p>
            <b>Primera capa interior en papel pergamino:</b> Inmediatamente tras la portada y
            visible a través del calado, se sitúa una hoja de papel vegetal de alto gramaje (115-140
            g/m²), de tono lechoso y semitransparencia mate, con la frase conceptual impresa en
            primer plano. Este soporte actúa como una gasa óptica que suaviza la ilustración del
            fondo, recreando la ilusión de sobreexposición y recuerdos lejanos.
          </p>
          <p>
            <b>Segunda capa interior con cianotipia (la revelación):</b> La guarda base, conformada
            por una misma hoja doblada de papel cálcio, contiene la gráfica completa trabajada en
            azul de Prusia y blanco, inspirada en el revelado fotosensible al sol con siluetas
            botánicas y figurativas. Al abrir la bitácora y levantar el pergamino, el velo
            desaparece para revelar toda la nitidez, saturación y textura original de la obra.
          </p>
          <h3>Especificaciones y materiales</h3>
          <p>
            <b>Dimensiones:</b> Un dieciseisavo de pliego (13 × 18 cm), un formato íntimo y
            manejable para llevar a todas partes.
          </p>
          <p>
            <b>Páginas:</b> 64 hojas (128 páginas) de papel Durex, ideal para escribir, bocetar o
            intervenir con técnicas mixtas.
          </p>
          <p>
            <b>Acabados:</b> Lomo y cubierta en tela de lino natural con encuadernación artesanal de
            apertura cómoda.
          </p>
          <p>
            <b>Concepto visual:</b> Fusión de cianotipia artesanal y veladuras de doble exposición
            que evocan la memoria infantil y la nostalgia.
          </p>
          <p className="product-closing">
            Tu refugio para el pasado y el presente, listo para ser habitado.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default function Page() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [count, setCount] = useState(0);
  const route = pathname.split("/").filter(Boolean);
  const add = () => setCount((c) => c + 1);
  const back = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = route[0] === "tendencias" ? "/tendencias" : "/";
  };
  let content;
  if (!route.length) content = <Home />;
  else if (route[0] === "recursos" && route[1] === "tipografias") content = <Typography />;
  else if (route[0] === "recursos" && route[1] === "formatos") content = <Formats />;
  else if (route[0] === "recursos") content = <Resources />;
  else if (route[0] === "newsletter") content = <Newsletter />;
  else if (route[0] === "inspiracion")
    content = <Inspiration onMenu={() => setMenu(true)} onCart={() => setCartOpen(true)} />;
  else if (route[0] === "tendencias" && route[1]) content = <TrendMonth month={route[1]} />;
  else if (route[0] === "tendencias")
    content = <Trends onMenu={() => setMenu(true)} onCart={() => setCartOpen(true)} />;
  else if (route[0] === "productos" && route[1])
    content = (
      <ProductDetail
        onAdd={add}
        onBuy={(quantity) => {
          setCount((current) => current + quantity);
          setCartOpen(true);
        }}
      />
    );
  else if (route[0] === "productos") content = <Products />;
  else content = <Home />;
  return (
    <>
      {route.length === 0 ? (
        <Header onMenu={() => setMenu(true)} onCart={() => setCartOpen(true)} count={count} />
      ) : (
        <PageBar
          onMenu={() => setMenu(true)}
          onBack={back}
          onCart={() => setCartOpen(true)}
          count={count}
        />
      )}
      <main>{content}</main>
      {menu && (
        <div
          className="menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          <div className="menu-panel">
            <div className="menu-head">
              <Link href="/" className="menu-logo" onClick={() => setMenu(false)}>
                <img src="/images/Logo.png" alt="NODO" />
              </Link>
              <button aria-label="Cerrar menú" onClick={() => setMenu(false)}>
                <X />
              </button>
            </div>
            {[
              ["Inicio", "/"],
              ["Recursos", "/recursos"],
              ["Inspiración", "/inspiracion"],
              ["Productos", "/productos"],
            ].map(([label, url]) => (
              <Link key={url} href={url} onClick={() => setMenu(false)}>
                {label}
                <ArrowUpRight />
              </Link>
            ))}
          </div>
          <button className="menu-scrim" onClick={() => setMenu(false)} aria-label="Cerrar menú" />
        </div>
      )}
      {cartOpen && (
        <div className="cart-overlay">
          <button
            className="cart-scrim"
            onClick={() => setCartOpen(false)}
            aria-label="Cerrar cesta"
          />
          <aside className="cart-panel">
            <button className="close-cart" onClick={() => setCartOpen(false)} aria-label="Cerrar">
              <X />
            </button>
            <h2>Tu cesta</h2>
            {count ? (
              <>
                <div className="cart-item">
                  <p>
                    Bitácora Reminiscencia <b>× {count}</b>
                  </p>
                  <button
                    className="cart-remove"
                    type="button"
                    onClick={() => setCount((current) => Math.max(0, current - 1))}
                    aria-label="Quitar una bitácora Reminiscencia de la cesta"
                  >
                    − Quitar uno
                  </button>
                </div>
                <strong>$ {(65000 * count).toLocaleString("es-CO")},00</strong>
                <p className="cart-note">
                  La cesta está lista. El pago no está disponible todavía.
                </p>
                <button
                  className="buy-now"
                  onClick={() =>
                    alert(
                      "No hay una pasarela de pago configurada. Tu cesta se mantiene guardada en esta sesión.",
                    )
                  }
                >
                  Continuar al pago
                </button>
              </>
            ) : (
              <p>Tu cesta está vacía.</p>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
