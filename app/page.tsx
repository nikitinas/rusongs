import Link from "next/link";

const audienceSegments = [
  {
    title: "Меломаны и ценители",
    description:
      "Любители глубоко погружаться в музыку, сравнивать архивные и современные версии, искать редкие записи и живые выступления.",
    share: "35%",
  },
  {
    title: "Музыканты и исполнители",
    description:
      "Гитаристы, вокалисты и ансамбли, которым нужны точные аккорды, вдохновение и возможность изучать интерпретации других артистов.",
    share: "25%",
  },
  {
    title: "Ностальгирующая аудитория",
    description:
      "Люди, которые хотят найти конкретные версии песен из прошлого и вновь пережить важные моменты своей жизни.",
    share: "20%",
  },
  {
    title: "Культурные энтузиасты",
    description:
      "Молодёжь и иностранцы, изучающие русскую культуру и её музыкальные традиции, ищущие исторический контекст.",
    share: "20%",
  },
] as const;

const coreFeatures = [
  {
    title: "Богатая база исполнений",
    description:
      "Единый каталог с десятками версий каждой песни и описанием контекста: от студийных записей до редких архивов.",
  },
  {
    title: "Сравнение и рейтинги",
    description:
      "Народные и экспертные оценки по множеству параметров, подборки «лучших» версий и интеллектуальные фильтры.",
  },
  {
    title: "Инструменты для музыкантов",
    description:
      "Тексты, аккорды, транспонирование, метроном и визуализация — всё, что нужно для репетиций и выступлений.",
  },
  {
    title: "Подборки и коллекции",
    description:
      "Автоматические и кураторские сборники по эпохам, темам и настроениям, а также персональные коллекции пользователей.",
  },
  {
    title: "Сообщество знатоков",
    description:
      "Комментарии, обсуждения, совместное пополнение базы и краудсорсинг точных текстов и аккордов.",
  },
] as const;

export const metadata = {
  title: "Rusongs.org — энциклопедия русской песни",
  description:
    "Современная музыкальная библиотека: редкие исполнения, verified тексты и живое сообщество знатоков русской песни.",
};

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 lg:px-16">
      <section className="rounded-3xl bg-[var(--color-surface)] px-8 py-14 shadow-[0_20px_60px_rgba(44,85,48,0.15)]">
        <span className="inline-flex items-center rounded-full bg-[rgba(44,85,48,0.12)] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-primary)]">
          Энциклопедия русской песни
        </span>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-[var(--color-text-primary)] md:text-5xl">
          Вся богатая история русской песни в одном месте
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
          Rusongs.org объединяет редкие записи, современные каверы и живые
          исполнения. Мы создаём живой архив, где можно сравнить версии,
          разобраться в культурном контексте и найти вдохновение для
          собственных выступлений.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/overview"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-90"
          >
            Узнать о проекте
          </Link>
          <Link
            href="/tech"
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-primary)] px-6 py-3 text-base font-medium text-[var(--color-primary)] transition-colors hover:bg-[rgba(44,85,48,0.1)]"
          >
            Архитектура решения
          </Link>
        </div>
      </section>

      <section className="mt-20 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl bg-[var(--color-surface)] p-8 shadow-[0_14px_36px_rgba(44,85,48,0.12)]">
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
            Ключевая миссия
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
            Сохранить и переосмыслить культурное наследие русской песни,
            предоставляя проверенные тексты, аккорды и уникальные исполнения
            разных эпох. Мы объединяем сообщество знатоков и музыкантов, которые
            помогают друг другу открывать музыку с новой глубиной.
          </p>
        </div>
        <div className="rounded-2xl bg-[var(--color-surface)] p-8 shadow-[0_14px_36px_rgba(44,85,48,0.12)]">
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
            Чем мы отличаемся
          </h2>
          <ul className="mt-4 space-y-3 text-base leading-relaxed text-[var(--color-text-secondary)]">
            <li>
              <strong className="text-[var(--color-text-primary)]">
                Глубина вместо ширины:
              </strong>{" "}
              каждая песня раскрыта через десятки исполнений и исторических
              фактов.
            </li>
            <li>
              <strong className="text-[var(--color-text-primary)]">
                Живое сообщество:
              </strong>{" "}
              пользователи голосуют, обсуждают и пополняют базу.
            </li>
            <li>
              <strong className="text-[var(--color-text-primary)]">
                Точный контент:
              </strong>{" "}
              verified тексты и аккорды, сохранение редких записей.
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-3xl font-semibold text-[var(--color-text-primary)]">
          Для кого мы создаём Rusongs.org
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)]">
          Мы учитываем потребности разных аудиторий — от профессиональных
          музыкантов до тех, кто хочет вновь услышать звучание детства. Каждое
          решение в продукте опирается на реальные сценарии использования.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {audienceSegments.map((segment) => (
            <div
              key={segment.title}
              className="rounded-2xl border border-[rgba(44,85,48,0.12)] bg-[var(--color-surface)] p-6 shadow-sm transition-all"
            >
              <div className="flex items-center justify-between text-sm font-medium text-[var(--color-primary)]">
                <span>{segment.title}</span>
                <span>{segment.share}</span>
              </div>
              <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                {segment.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--color-text-primary)]">
              Ключевые функции платформы
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)]">
              От каталога исполнений до профессиональных инструментов и
              сообществ — каждая функция помогает пользователям открыть глубину
              русской песни.
            </p>
          </div>
          <Link
            href="/overview"
            className="self-start rounded-full border border-[var(--color-primary)] px-5 py-2 text-sm font-medium text-[var(--color-primary)] transition-colors hover:bg-[rgba(44,85,48,0.1)] md:self-auto"
          >
            Подробнее в обзоре
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {coreFeatures.map((feature) => (
            <div
              key={feature.title}
              className="h-full rounded-2xl bg-[var(--color-surface)] p-6 shadow-[0_14px_36px_rgba(44,85,48,0.12)]"
            >
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                {feature.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[var(--color-text-secondary)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="rounded-3xl bg-gradient-to-r from-[var(--color-primary)] via-[rgba(44,85,48,0.85)] to-[var(--color-secondary)] px-8 py-12 text-white shadow-xl">
          <h2 className="text-3xl font-semibold">
            Превращаем культурное наследие в живую цифровую библиотеку
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/90">
            Мы создаём платформу, которая сочетает глубину исторического архива
            и удобство современных инструментов. Присоединяйтесь, чтобы вместе
            сохранять, изучать и развивать богатство русской песни.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/overview"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-white/90"
            >
              Дорожная карта
            </Link>
            <Link
              href="/tech"
              className="inline-flex items-center justify-center rounded-full border border-white/70 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Технический стек
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
