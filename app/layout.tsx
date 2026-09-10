import type { Metadata } from "next";
import { headers } from "next/headers";
import { Manrope, Space_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "pechat3d-khm-9954933770.evaa86.chatgpt.site";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const siteUrl = new URL(`${protocol}://${host}`);

  return {
    metadataBase: siteUrl,
    title: "Инженерная система защиты от БПЛА",
    description:
      "Проектирование и реализация комплексных решений для физической защиты промышленных объектов.",
    keywords: [
      "защита от БПЛА",
      "физическая защита промышленных объектов",
      "инженерная защита",
      "проектирование защитных систем",
      "Ханты-Мансийск",
    ],
    openGraph: {
      type: "website",
      locale: "ru_RU",
      url: siteUrl,
      siteName: "Инженерная защита 86",
      title: "Инженерная система защиты от БПЛА",
      description: "Комплексные решения для физической защиты промышленных объектов.",
    },
    twitter: {
      card: "summary",
      title: "Инженерная система защиты от БПЛА",
      description: "Комплексные решения для физической защиты промышленных объектов.",
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} ${spaceMono.variable}`}>{children}</body>
    </html>
  );
}
