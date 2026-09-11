import Link from "next/link";
import {
  Refrigerator,
  Tv,
  WashingMachine,
  Fan,
  CookingPot,
  PlugZap,
  LampDesk,
  ArrowUpRight,
} from "lucide-react";
import type { Category } from "@/data/categories";
import { getRequestHref } from "@/lib/format";
const icons = {
  fridge: Refrigerator,
  tv: Tv,
  washer: WashingMachine,
  fan: Fan,
  cooking: CookingPot,
  small: PlugZap,
  home: LampDesk,
};
export function CategoryCard({ category }: { category: Category }) {
  const Icon = icons[category.icon];
  return (
    <article className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition-colors hover:border-copper motion-reduce:transition-none">
      <span className="mb-6 grid size-14 place-items-center rounded-xl bg-cream text-rust">
        <Icon size={29} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <h3 className="font-heading text-lg leading-snug font-bold">
        {category.name}
      </h3>
      <p className="mt-2 mb-5 text-sm text-muted">{category.description}</p>
      <Link
        href={getRequestHref(category.id)}
        className="mt-auto inline-flex min-h-11 items-center justify-between gap-2 border-t border-line pt-3 text-sm font-bold text-rust"
        aria-label={`Request a Product: ${category.name}`}
      >
        Request a Product <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
    </article>
  );
}
