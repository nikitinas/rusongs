const HIGHLIGHTS = [
  {
    title: "Комментарии и обсуждения",
    description: "Обсуждайте нюансы исполнения, делитесь историями и находками." 
  },
  {
    title: "Рейтинги и голосования",
    description: "Продвигаем лучшие версии вверх — народный рейтинг формируется в реальном времени." 
  },
  {
    title: "Модерация сообществом",
    description: "Вкладчики помогают проверять тексты, подтягивать новые записи и отмечать редкие находки." 
  }
];

export default function CommunityPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="font-display text-4xl text-primary">Сообщество Rusongs</h1>
        <p className="text-sm text-text-secondary">
          Сообщество экспертов, меломанов и музыкантов формирует живой архив русской песни. Подключайтесь к обсуждениям и помогайте сохранять культурное наследие.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-3">
        {HIGHLIGHTS.map((item) => (
          <div key={item.title} className="rounded-3xl border border-primary/15 bg-white/90 p-6 shadow-soft">
            <h2 className="font-display text-xl text-text-primary">{item.title}</h2>
            <p className="mt-3 text-sm text-text-secondary">{item.description}</p>
          </div>
        ))}
      </section>
      <section className="rounded-3xl border border-primary/15 bg-gradient-to-r from-primary/10 via-white to-white p-8 text-center">
        <h2 className="font-display text-2xl text-primary">Хотите внести вклад?</h2>
        <p className="mt-3 text-sm text-text-secondary">
          Присоединяйтесь к списку проверенных участников и помогайте развивать каталог.
        </p>
        <a
          href="/contribute"
          className="mt-4 inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          Подать заявку
        </a>
      </section>
    </div>
  );
}
