"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { navigation } from "@/lib/content";
export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  return (
    <div
      className="min-[1200px]:hidden"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          button.current?.focus();
        }
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(!open)}
        className="rounded-full border border-line px-4 py-2"
      >
        {open ? "Close" : "Menu"}
      </button>
      <nav
        id="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!open}
        className="absolute inset-x-0 top-[76px] max-h-[calc(100dvh-120px)] overflow-y-auto border-b border-line bg-white px-[5%] py-6"
      >
        <ul className="flex flex-col items-start gap-5 font-semibold">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="inline-block py-1 hover:text-rust"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
