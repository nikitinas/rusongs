"use client";

import { DialogHTMLAttributes, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

interface NavItem {
  href: string;
  label: string;
}

interface MobileNavSheetProps extends DialogHTMLAttributes<HTMLDivElement> {
  navItems: NavItem[];
  children: ReactNode;
}

export function MobileNavSheet({ navItems, children }: MobileNavSheetProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const content = open ? (
    <div
      className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={() => setOpen(false)}
    >
      <div
        className="absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-surface p-6 shadow-soft"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 font-display text-xl text-primary">Меню</div>
        <nav className="flex flex-col gap-4 text-base font-medium text-text-secondary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="transition hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  ) : null;

  return (
    <>
      <span onClick={() => setOpen(true)}>{children}</span>
      {mounted ? createPortal(content, document.body) : null}
    </>
  );
}
