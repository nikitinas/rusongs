"use client";

import { Search } from "lucide-react";
import { FormEvent, InputHTMLAttributes, useState } from "react";
import { useRouter } from "next/navigation";

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onSubmit"> {
  onSubmit?: (value: string) => void;
}

export function SearchInput({ onSubmit, ...props }: SearchInputProps) {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value.trim()) return;
    onSubmit?.(value.trim());
    router.push(`/songs?query=${encodeURIComponent(value.trim())}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="group relative flex items-center rounded-full border border-primary/10 bg-white/80 transition focus-within:border-primary/40 focus-within:bg-white"
    >
      <Search className="ml-3 h-4 w-4 text-primary/70" />
      <input
        {...props}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="w-full rounded-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-text-secondary/60"
      />
      <button
        type="submit"
        className="mr-1 rounded-full px-3 py-1 text-xs font-medium text-primary transition hover:bg-primary/10"
      >
        Найти
      </button>
    </form>
  );
}
