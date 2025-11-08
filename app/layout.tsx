import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: {
    default: "Rusongs — Энциклопедия русской песни",
    template: "%s • Rusongs"
  },
  description:
    "Современная энциклопедия русских песен: просматривайте исполнения, сравнивайте версии, изучайте тексты и историю.",
  icons: {
    icon: "/favicon.ico"
  },
  openGraph: {
    title: "Rusongs — Энциклопедия русской песни",
    description:
      "Исследуйте богатый каталог русских песен, редких исполнений и авторских подборок.",
    type: "website",
    locale: "ru_RU",
    url: "https://rusongs.vercel.app"
  },
  twitter: {
    card: "summary_large_image",
    title: "Rusongs — Энциклопедия русской песни",
    description:
      "Найдите и сравните лучшие исполнения русских песен: аккорды, тексты, история.",
    site: "@rusongs"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-background font-body text-text-primary">
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
