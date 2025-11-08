"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export function CatalogSearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(searchParams.get("query") ?? "");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Поиск по названию, исполнителю или тегу"
        className="flex-1 rounded-full border border-primary/20 bg-white px-4 py-2 text-sm text-text-primary outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
      />
      <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90">
        Найти
      </button>
    </form>
  );
}
