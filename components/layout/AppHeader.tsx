"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Search, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { MobileNavSheet } from "@/components/ui/MobileNavSheet";
import { SearchInput } from "@/components/ui/SearchInput";
import { ROLE_LABELS } from "@/lib/auth/roles";

const NAV_ITEMS = [
  { href: "/", label: "Главная" },
  { href: "/songs", label: "Каталог" },
  { href: "/discover", label: "Открытие" },
  { href: "/collections", label: "Коллекции" },
  { href: "/community", label: "Сообщество" },
  { href: "/contribute", label: "Вклад" }
];

export function AppHeader() {
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(false);
  const { data: session, status } = useSession();

  const roleLabel = session?.user?.role ? ROLE_LABELS[session.user.role] : null;

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="container-grid flex h-[var(--nav-height)] items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <MobileNavSheet navItems={NAV_ITEMS}>
            <button className="inline-flex items-center justify-center rounded-full border border-primary/20 p-2 text-primary transition hover:border-primary/40 hover:bg-primary/5 lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Меню</span>
            </button>
          </MobileNavSheet>

          <Link href="/" className="font-display text-xl font-semibold text-primary">
            Rusongs
          </Link>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-text-secondary lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === "/"
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition hover:text-primary ${
                  isActive ? "text-primary" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden w-64 lg:block">
            <SearchInput placeholder="Поиск песен и исполнений..." />
          </div>
          <button
            onClick={() => setShowSearch((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 text-primary transition hover:border-primary/40 hover:bg-primary/5 lg:hidden"
            aria-label="Поиск"
          >
            <Search className="h-5 w-5" />
          </button>
          {status === "authenticated" ? (
            <>
              {roleLabel ? (
                <span className="hidden rounded-full border border-primary/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary md:inline-flex">
                  {roleLabel}
                </span>
              ) : null}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 px-4 py-2 text-sm font-medium text-primary transition hover:border-primary/40 hover:bg-primary/5"
              >
                <LogOut className="h-4 w-4" />
                Выйти
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn(undefined, { callbackUrl: "/" })}
              className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90 md:inline-flex"
            >
              Войти
            </button>
          )}
        </div>
      </div>
      {showSearch ? (
        <div className="border-t border-black/5 bg-surface p-4 lg:hidden">
          <SearchInput placeholder="Поиск по каталогу" autoFocus onSubmit={() => setShowSearch(false)} />
        </div>
      ) : null}
    </header>
  );
}
