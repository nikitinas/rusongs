import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const navigation = [
  { href: "/", label: "Главная" },
  { href: "/overview", label: "Обзор" },
  { href: "/tech", label: "Технический стек" },
] as const;

export const metadata: Metadata = {
  title: {
    default: "Rusongs.org — энциклопедия русской песни",
    template: "%s | Rusongs.org",
  },
  description:
    "Современная музыкальная библиотека: редкие исполнения, verified тексты, аккорды и сообщество знатоков русской песни.",
  openGraph: {
    title: "Rusongs.org — энциклопедия русской песни",
    description:
      "Редкие записи, живые исполнения, verified тексты и живое сообщество. Всё богатство русской песни — в одном месте.",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[var(--color-background)] antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 md:px-10 lg:px-16">
              <Link
                href="/"
                className="text-lg font-semibold tracking-wide text-[var(--color-primary)] transition-opacity hover:opacity-80"
              >
                Rusongs<span className="font-normal text-[var(--color-text-secondary)]">.org</span>
              </Link>
              <nav className="flex items-center gap-5 text-sm font-medium text-[var(--color-text-secondary)]">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full px-3 py-1.5 transition-colors hover:bg-[rgba(44,85,48,0.08)] hover:text-[var(--color-primary)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <div className="flex-1">{children}</div>

          <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]/95">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 text-sm text-[var(--color-text-secondary)] md:flex-row md:items-center md:justify-between md:px-10 lg:px-16">
              <p>© {currentYear} Rusongs.org. Живой архив русской песни.</p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/overview"
                  className="transition-colors hover:text-[var(--color-primary)]"
                >
                  Концепция продукта
                </Link>
                <Link
                  href="/tech"
                  className="transition-colors hover:text-[var(--color-primary)]"
                >
                  Технический стек
                </Link>
                <a
                  href="https://vercel.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[var(--color-primary)]"
                >
                  Развёрнуто на Vercel
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
