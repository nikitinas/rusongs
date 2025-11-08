import Link from "next/link";

const LINKS = [
  {
    title: "Платформа",
    items: [
      { label: "О проекте", href: "/about" },
      { label: "Дорожная карта", href: "/roadmap" },
      { label: "Контакты", href: "/contact" }
    ]
  },
  {
    title: "Каталог",
    items: [
      { label: "Песни", href: "/songs" },
      { label: "Исполнители", href: "/artists" },
      { label: "Подборки", href: "/collections" }
    ]
  },
  {
    title: "Сообщество",
    items: [
      { label: "Вклад", href: "/contribute" },
      { label: "Обсуждения", href: "/community" },
      { label: "Модерация", href: "/moderation" }
    ]
  }
];

export function AppFooter() {
  return (
    <footer className="border-t border-black/5 bg-surface">
      <div className="container-grid grid grid-cols-1 gap-10 py-12 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl text-primary">Rusongs</div>
          <p className="mt-4 text-sm text-text-secondary">
            Энциклопедия русской песни: редкие записи, проверенные тексты и живое сообщество ценителей музыки.
          </p>
        </div>
        {LINKS.map((section) => (
          <div key={section.title}>
            <div className="font-medium text-text-primary">{section.title}</div>
            <ul className="mt-3 space-y-2 text-sm text-text-secondary">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link className="transition hover:text-primary" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-black/5 py-6">
        <div className="container-grid flex flex-col gap-3 text-xs text-text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Rusongs. Все права защищены.</p>
          <p>Следите за обновлениями в Telegram: <span className="text-primary">@rusongs_live</span></p>
        </div>
      </div>
    </footer>
  );
}
