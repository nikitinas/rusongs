import Link from "next/link";
import { Role } from "@prisma/client";
import { getServerAuthSession } from "@/lib/auth";
import { hasAtLeastRole, ROLE_LABELS } from "@/lib/auth/roles";

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

export default async function ContributePage() {
  const session = await getServerAuthSession();
  const role = session?.user?.role ?? null;
  const isContributor = hasAtLeastRole(Role.CONTRIBUTOR, role);

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="font-display text-4xl text-primary">Внесите свой вклад</h1>
        <p className="text-sm text-text-secondary">
          Добавляйте новые исполнения, помогайте проверять тексты и делитесь историческими материалами. Ваша помощь делает каталог живым.
        </p>
      </header>
      {!isContributor ? (
        <section className="rounded-3xl border border-primary/20 bg-white/90 p-6 shadow-soft">
          <h2 className="font-display text-2xl text-primary">Требуется статус контрибьютора</h2>
          <p className="mt-3 text-sm text-text-secondary">
            {session ? (
              <>
                Ваш текущий уровень доступа:{" "}
                <span className="font-medium text-text-primary">{role ? ROLE_LABELS[role] : "гость"}</span>. Попросите редакторов повысить роль в чате
                сообщества или на стриме с модераторами.
              </>
            ) : (
              <>
                Войдите, чтобы отправлять записи на модерацию. После авторизации напишите редакторам, чтобы получить статус{" "}
                <span className="font-medium text-text-primary">{ROLE_LABELS[Role.CONTRIBUTOR]}</span>.
              </>
            )}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {session ? (
              <Link
                href="/community"
                className="inline-flex items-center rounded-full border border-primary/20 px-4 py-2 text-sm font-medium text-primary transition hover:border-primary/40 hover:bg-primary/5"
              >
                Связаться с редакторами
              </Link>
            ) : (
              <Link
                href="/api/auth/signin?callbackUrl=%2Fcontribute"
                className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
              >
                Войти и продолжить
              </Link>
            )}
          </div>
        </section>
      ) : null}
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
          {isContributor ? (
            <p className="mt-4 text-sm text-text-secondary">
              Как контрибьютор вы можете отмечать модераторов, предлагать обновления и участвовать в редакторских встречах. Спасибо за ваш вклад!
            </p>
          ) : null}
        </section>
    </div>
  );
}
