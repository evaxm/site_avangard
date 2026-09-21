import type { Metadata, Viewport } from "next";
import { Manrope, Space_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = new URL("https://bpla-zok.ru");

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f3eb",
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Защита объектов от БПЛА и защитные сетки | Авангард",
    template: "%s | Авангард",
  },
  description:
    "Проектирование, изготовление и монтаж защитных сеток и защитных ограждающих конструкций (ЗОК) для промышленных и инфраструктурных объектов.",
  keywords: [
    "защита от БПЛА",
    "защитные ограждающие конструкции",
    "защита промышленных объектов",
    "инженерная защита",
    "Ханты-Мансийск",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "Авангард",
    title: "Защита объектов от БПЛА и защитные сетки | Авангард",
    description:
      "Проектирование, изготовление и монтаж защитных сеток и защитных ограждающих конструкций (ЗОК) для промышленных и инфраструктурных объектов.",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "Промышленный объект под защитной сетчатой конструкцией",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Защита объектов от БПЛА и защитные сетки | Авангард",
    description:
      "Проектирование, изготовление и монтаж защитных сеток и защитных ограждающих конструкций (ЗОК) для промышленных и инфраструктурных объектов.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg" },
  other: {
    "geo.region": "RU-KHM",
    "geo.placename": "Ханты-Мансийск",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://bpla-zok.ru/#organization",
      name: "Авангард",
      url: "https://bpla-zok.ru/",
      logo: "https://bpla-zok.ru/brand-logo.png",
      telephone: "+7-995-493-37-70",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ханты-Мансийск",
        addressRegion: "Ханты-Мансийский автономный округ — Югра",
        addressCountry: "RU",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://bpla-zok.ru/#website",
      url: "https://bpla-zok.ru/",
      name: "Авангард — защита объектов от БПЛА",
      inLanguage: "ru-RU",
      publisher: { "@id": "https://bpla-zok.ru/#organization" },
    },
    {
      "@type": "Service",
      "@id": "https://bpla-zok.ru/#anti-uav-protection-service",
      name: "Защита объектов от БПЛА: защитные сетки и ЗОК",
      serviceType: "Проектирование, изготовление и монтаж защитных ограждающих конструкций",
      provider: { "@id": "https://bpla-zok.ru/#organization" },
      areaServed: { "@type": "Country", name: "Россия" },
      url: "https://bpla-zok.ru/",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} ${spaceMono.variable}`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
