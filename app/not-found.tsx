import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-6 text-center">
      <h1 className="font-display text-4xl text-primary">Страница не найдена</h1>
      <p className="text-sm text-text-secondary">
        Возможно, страница была перемещена или ещё не создана. Вернитесь на главную, чтобы продолжить исследование.
      </p>
      <Link href="/" className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90">
        На главную
      </Link>
    </div>
  );
}
