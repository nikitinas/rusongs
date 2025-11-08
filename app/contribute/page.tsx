const STEPS = [
  {
    step: "1",
    title: "Подготовьте запись",
    description: "Соберите ссылку на исполнение, укажите исполнителей, год и платформу."
  },
  {
    step: "2",
    title: "Добавьте контекст",
    description: "Опишите историю, укажите редкие факты и отметьте, чем запись уникальна."
  },
  {
    step: "3",
    title: "Отправьте на модерацию",
    description: "Модераторы проверят запись и подскажут, если нужны уточнения."
  }
];

export default function ContributePage() {
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="font-display text-4xl text-primary">Внесите свой вклад</h1>
        <p className="text-sm text-text-secondary">
          Добавляйте новые исполнения, помогайте проверять тексты и делитесь историческими материалами. Ваша помощь делает каталог живым.
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-3">
        {STEPS.map((item) => (
          <div key={item.step} className="rounded-3xl border border-primary/15 bg-white/90 p-6 shadow-soft">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
              {item.step}
            </div>
            <h2 className="mt-4 font-display text-xl text-text-primary">{item.title}</h2>
            <p className="mt-2 text-sm text-text-secondary">{item.description}</p>
          </div>
        ))}
      </section>
      <section className="rounded-3xl border border-primary/15 bg-gradient-to-r from-primary/10 via-white to-white p-8">
        <h2 className="font-display text-2xl text-primary">Что дальше?</h2>
        <p className="mt-3 text-sm text-text-secondary">
          После публикации записей они появятся в каталоге и попадут в очередь на редакторские подборки. Вы сможете отслеживать статус и получать обратную связь.
        </p>
        <p className="mt-3 text-sm text-text-secondary">
          MVP поддерживает заявки через форму: напишите на <a className="text-primary underline" href="mailto:hello@rusongs.org">hello@rusongs.org</a> или заполните форму в Google Docs.
        </p>
      </section>
    </div>
  );
}
