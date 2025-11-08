import Link from "next/link";
import { getCollections, getSongs } from "@/lib/data";
import { PerformanceSpotlight } from "@/components/domain/PerformanceSpotlight";
import { SongCard } from "@/components/domain/SongCard";
import { CollectionCard } from "@/components/domain/CollectionCard";

export default async function HomePage() {
  const [songs, collections] = await Promise.all([getSongs(), getCollections()]);

  const [firstSong] = songs;
  const spotlightPerformance = firstSong?.performances[0];
  const secondSpotlight = songs[1]?.performances[0];

  return (
    <div className="space-y-16">
      <section className="radial-accent overflow-hidden rounded-3xl border border-primary/10 bg-surface p-10 shadow-soft lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[2fr,1.2fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex w-fit rounded-full bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.25em] text-primary">
              Энциклопедия русской песни
            </span>
            <h1 className="font-display text-4xl leading-tight text-primary sm:text-5xl">
              Откройте богатый мир русских песен и их исполнений
            </h1>
            <p className="text-lg text-text-secondary">
              Сравнивайте студийные и живые записи, изучайте тексты и аккорды, создавайте коллекции и делитесь редкими находками.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/songs"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                Перейти в каталог
              </Link>
              <Link
                href="/contribute"
                className="rounded-full border border-primary/30 px-6 py-3 text-sm font-semibold text-primary transition hover:border-primary/50 hover:bg-primary/5"
              >
                Предложить исполнение
              </Link>
            </div>
          </div>
          {spotlightPerformance ? (
            <PerformanceSpotlight performance={spotlightPerformance} title="Исполнение дня" />
          ) : null}
        </div>
      </section>

      {secondSpotlight ? (
        <section className="grid gap-6 lg:grid-cols-[1.4fr,2fr]">
          <PerformanceSpotlight performance={secondSpotlight} title="Исполнение недели" variant="week" />
          <div className="space-y-6 rounded-3xl border border-primary/10 bg-surface p-8">
            <h2 className="section-heading">Последние добавления</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {songs.slice(0, 4).map((song) => (
                <SongCard key={song.id} song={song} />
              ))}
            </div>
            <Link href="/songs" className="text-sm font-medium text-primary underline underline-offset-4">
              Смотреть весь каталог
            </Link>
          </div>
        </section>
      ) : null}

      <section className="space-y-6">
        <h2 className="section-heading">Коллекции</h2>
        <p className="text-sm text-text-secondary">Подборки экспертов и сообщества для вдохновения.</p>
        <div className="grid gap-6 md:grid-cols-3">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="section-heading">Откройте по теме</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Народные песни", description: "Старинные мелодии, передающиеся из поколения в поколение", href: "/songs?tag=народная" },
            { title: "Военные романсы", description: "Истории любви и мужества времён войны", href: "/songs?tag=военные%20песни" },
            { title: "Современные каверы", description: "Свежие трактовки классических произведений", href: "/songs?tag=каверы" },
            { title: "Архивные записи", description: "Сохранённые выступления с исторических концертов", href: "/songs?tag=архив" }
          ].map((topic) => (
            <Link
              key={topic.title}
              href={topic.href}
              className="rounded-2xl border border-primary/15 bg-gradient-to-br from-white via-white to-primary/5 p-5 transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-primary/80">Тема</div>
              <div className="mt-2 font-display text-xl text-text-primary">{topic.title}</div>
              <p className="mt-2 text-sm text-text-secondary">{topic.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
