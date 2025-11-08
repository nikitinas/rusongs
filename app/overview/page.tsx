import { renderMarkdown } from "@/lib/markdown";
import Link from "next/link";

export const metadata = {
  title: "Обзор проекта Rusongs.org",
  description:
    "Цели, аудитория, ключевые функции и дорожная карта развития музыкальной энциклопедии Rusongs.org.",
};

export default async function OverviewPage() {
  const { html } = await renderMarkdown("docs/website/overview.md");

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16 md:px-10 lg:px-16">
      <div className="rounded-3xl bg-[var(--color-surface)] px-8 py-10 shadow-[0_18px_48px_rgba(44,85,48,0.18)]">
        <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">
          Документация
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-[var(--color-text-primary)] md:text-5xl">
          Документ проекта: Rusongs.org
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)]">
          Полное описание продукта: миссия и девиз, аудитория, ключевые
          функции, дизайн-концепция, дорожные карты и монетизация. Всё, что
          нужно для того, чтобы понять, каким будет Rusongs.org.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-[var(--color-text-secondary)]">
          <span className="rounded-full bg-[rgba(44,85,48,0.1)] px-3 py-1 font-medium text-[var(--color-primary)]">
            Обновлено на основе product brief
          </span>
          <Link
            href="/"
            className="rounded-full px-3 py-1 font-medium text-[var(--color-primary)] transition-colors hover:bg-[rgba(44,85,48,0.08)]"
          >
            На главную
          </Link>
        </div>
      </div>

      <article
        className="markdown mt-12 rounded-[32px] bg-[var(--color-surface)] px-8 py-10 shadow-[0_18px_48px_rgba(15,23,42,0.12)]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
