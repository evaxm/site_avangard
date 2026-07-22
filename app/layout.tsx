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
    "3d-pechat-86.sites.openai.com";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const siteUrl = new URL(`${protocol}://${host}`);

  return {
    metadataBase: siteUrl,
    title: "3D-печать на заказ в Ханты-Мансийске | 3D Печать 86",
    description:
      "Печать деталей, прототипов, фигурок и аксессуаров. Помощь с 3D-моделью, подбор материала и быстрые сроки.",
    keywords: [
      "3D печать Ханты-Мансийск",
      "3D печать на заказ",
      "FDM печать",
      "прототипирование",
      "реверс-инжиниринг",
    ],
    icons: {
      icon: "/og.png",
      shortcut: "/og.png",
    },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      url: siteUrl,
      siteName: "3D Печать 86",
      title: "Идея становится объектом",
      description: "3D-печать на заказ в Ханты-Мансийске",
      images: [{ url: new URL("/og.png", siteUrl), width: 1536, height: 1024, alt: "3D Печать 86" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "3D Печать 86",
      description: "3D-печать на заказ в Ханты-Мансийске",
      images: [new URL("/og.png", siteUrl)],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} ${spaceMono.variable}`}>{children}</body>
    </html>
  );
}
