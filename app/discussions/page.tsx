export default function DiscussionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl text-primary">Обсуждения сообщества</h1>
      <p className="text-sm text-text-secondary">
        В MVP обсуждения доступны в виде комментариев на страницах песен. В будущих релизах появятся полноценные темы, подписки и живые обновления.
      </p>
      <div className="rounded-3xl border border-primary/15 bg-white/90 p-6 shadow-soft">
        <h2 className="font-display text-2xl text-text-primary">Скоро</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Работает команда модераторов и экспертов. Следите за обновлениями.
        </p>
      </div>
    </div>
  );
}
