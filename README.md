# Rusongs.org Website

Next.js 16 приложение, в котором проектная документация `docs/website/*.md` превращается в полноценный промо-сайт продукта Rusongs.org.

## Структура

- `app/` — страницы и макеты сайта (App Router).
- `lib/markdown.ts` — преобразование Markdown → HTML с поддержкой GFM и якорей.
- `docs/website/` — исходные файлы документации (источник контента).
- `vercel.json` — конфигурация для развёртывания на Vercel.

## Скрипты

```bash
npm install    # установить зависимости
npm run dev    # запуск локального сервера (http://localhost:3000)
npm run lint   # проверка кода ESLint
npm run build  # production-сборка
npm run start  # запуск production-билда
```

## Контент

- Главная страница (`app/page.tsx`) — выжимка из product brief c CTA и ссылками.
- `app/overview/page.tsx` — развёрнутый обзор, рендерится из `docs/website/overview.md`.
- `app/tech/page.tsx` — техническая документация, рендерится из `docs/website/tech.md`.

Markdown рендерится на сервере, поддерживает заголовки, таблицы, код и якорные ссылки.

## Деплой на Vercel

Проект готов к развёртыванию через Vercel:

1. Создайте проект на [vercel.com](https://vercel.com/) и укажите репозиторий.
2. Убедитесь, что в настройках указаны:
   - Build Command: `npm run build`
   - Install Command: `npm install`
   - Output Directory: `.next`
3. `vercel.json` уже включает нужные команды и регионы деплоя.

Локальный предпросмотр: `npx vercel dev`. Production-деплой: `npx vercel --prod`.
