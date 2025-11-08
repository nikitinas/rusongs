"use client";

import { useState } from "react";

interface Comment {
  id: string;
  user: string;
  body: string;
  createdAt: string;
}

interface CommentsSectionProps {
  songId: string;
}

const DEMO_COMMENTS: Comment[] = [
  {
    id: "1",
    user: "Александр",
    body: "Люблю версию хора Пятницкого — она ближе всего к оригинальной стилистике.",
    createdAt: "2024-09-12T10:00:00Z"
  },
  {
    id: "2",
    user: "Мария",
    body: "Современные каверы радуют тем, что сохраняют энергию, но добавляют новые краски.",
    createdAt: "2024-09-13T12:30:00Z"
  }
];

export function CommentsSection({ songId }: CommentsSectionProps) {
  const [comments, setComments] = useState(DEMO_COMMENTS);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    setComments((prev) => [
      {
        id: `${songId}-${prev.length + 1}`,
        user: "Вы",
        body: value.trim(),
        createdAt: new Date().toISOString()
      },
      ...prev
    ]);
    setValue("");
  };

  return (
    <section className="space-y-5 rounded-2xl border border-primary/20 bg-white/80 p-5">
      <div>
        <h3 className="font-display text-lg text-text-primary">Комментарии</h3>
        <p className="text-sm text-text-secondary">Поделитесь впечатлениями об исполнениях.</p>
      </div>
      <div className="space-y-3">
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Напишите комментарий"
          className="w-full rounded-2xl border border-primary/20 bg-white p-3 text-sm text-text-primary outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
          rows={3}
        />
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
          >
            Отправить
          </button>
        </div>
      </div>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="rounded-2xl bg-primary/5 p-4">
            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span className="font-medium text-text-primary">{comment.user}</span>
              <time dateTime={comment.createdAt}>
                {new Intl.DateTimeFormat("ru-RU", {
                  dateStyle: "medium",
                  timeStyle: "short"
                }).format(new Date(comment.createdAt))}
              </time>
            </div>
            <p className="mt-2 text-sm text-text-primary">{comment.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
