import Page from "../page";

export function generateStaticParams() {
  return [
    { slug: ["recursos"] },
    { slug: ["recursos", "tipografias"] },
    { slug: ["recursos", "formatos"] },
    { slug: ["inspiracion"] },
    { slug: ["tendencias"] },
    ...[
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ].map((month) => ({ slug: ["tendencias", month] })),
    { slug: ["productos"] },
    { slug: ["productos", "bitacora"] },
  ];
}

export default function RoutePage() {
  return <Page />;
}
