import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond } from "next/font/google";
import { weddingConfig } from "./wedding-config";
import "./globals.css";

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

const { bride, groom } = weddingConfig.couple;
const { cardDate } = weddingConfig.date;

export const metadata: Metadata = {
  title: `${bride} & ${groom} ♥ ${cardDate}`,
  description: `${weddingConfig.card.inviteMain} a celebrar la boda de ${bride} y ${groom}.`,
  openGraph: {
    title: `${bride} & ${groom}`,
    description: `${weddingConfig.card.inviteMain} a celebrar nuestra unión en matrimonio — ${cardDate}`,
    images: [
      {
        url: "/assets/samantha-gades-2TdhwS6Y3pU-unsplash.jpg",
        width: 1200,
        height: 800,
        alt: `Boda de ${bride} & ${groom}`,
      },
    ],
    type: "website",
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: `${bride} & ${groom} ♥ ${cardDate}`,
    description: `${weddingConfig.card.inviteMain} a celebrar nuestra unión en matrimonio.`,
    images: ["/assets/samantha-gades-2TdhwS6Y3pU-unsplash.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${greatVibes.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
