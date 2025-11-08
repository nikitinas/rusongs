import Link from "next/link";

const THEMES = [
  {
    title: "По десятилетиям",
    description: "От послевоенных романсов до современной сцены — отслеживайте эволюцию звучания.",
    href: "/songs?tag=военные%20песни"
  },
  {
    title: "Тематические подборки",
    description: "Настроения, сезоны и события — коллекции для любого случая.",
    href: "/collections"
  },
  {
    title: "Рекомендации",
    description: "Алгоритм подскажет редкие версии любимых песен.",
    href: "/discover"
  }
];

export default function DiscoverPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="font-display text-4xl text-primary">Откройте новое звучание</h1>
        <p className="text-sm text-text-secondary">
          Rusongs помогает находить неожиданные исполнения, сравнивать их и собирать персональные коллекции. Начните с тематических подборок или перейдите к глубокой фильтрации.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-3">
        {THEMES.map((theme) => (
          <Link
            key={theme.title}
            href={theme.href}
            className="rounded-3xl border border-primary/15 bg-gradient-to-br from-white via-white to-primary/5 p-6 transition hover:-translate-y-1 hover:shadow-soft"
          >
            <h2 className="font-display text-2xl text-text-primary">{theme.title}</h2>
            <p className="mt-3 text-sm text-text-secondary">{theme.description}</p>
            <span className="mt-6 inline-flex items-center text-sm font-medium text-primary">
              Перейти →
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
