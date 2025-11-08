import Link from "next/link";
import { getCollections } from "@/lib/data";

export default async function CollectionsLandingPage() {
  const collections = await getCollections();

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="font-display text-4xl text-primary">Коллекции Rusongs</h1>
        <p className="text-sm text-text-secondary">
          Кураторские подборки, тематические сборники и плейлисты сообщества помогают быстро ориентироваться в тысячах исполнений.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.slug}`}
            className="rounded-3xl border border-primary/15 bg-white/90 p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="font-display text-xl text-text-primary">{collection.title}</h2>
            <p className="mt-2 text-sm text-text-secondary">{collection.description}</p>
            <p className="mt-4 text-xs text-text-secondary">
              Куратор: <span className="font-medium text-text-primary">{collection.curator}</span>
            </p>
          </Link>
        ))}
      </section>

      <section className="rounded-3xl border border-primary/15 bg-gradient-to-r from-accent/10 via-white to-white p-8">
        <h2 className="font-display text-2xl text-primary">Создайте свою коллекцию</h2>
        <p className="mt-3 text-sm text-text-secondary">
          В версии MVP сохраняйте подборки локально. В будущих релизах появятся общедоступные плейлисты, соревновательные подборки и коллаборативные списки.
        </p>
        <p className="mt-3 text-sm text-text-secondary">
          Советы: выбирайте базовую версию песни, добавляйте редкие записи в конце, оставляйте заметки для сообщества.
        </p>
      </section>
    </div>
  );
}
