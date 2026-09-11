import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Clock3 } from "lucide-react";
import type { Product } from "@/data/products";
import { formatCurrency, getRequestHref } from "@/lib/format";
import { WhatsAppButton } from "./WhatsAppButton";
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-white">
      <div className="relative bg-cream">
        <Image
          src={product.image}
          alt={product.alt}
          width={640}
          height={480}
          sizes="(max-width: 767px) 90vw, 30vw"
          className="aspect-[4/3] w-full object-contain"
        />
        {product.demo && (
          <span className="absolute top-4 left-4 rounded-full bg-white px-3 py-1 text-xs font-semibold">
            Demo · Illustration
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold tracking-wide text-rust">
          {product.availability}
        </p>
        <h3 className="mt-2 font-heading text-xl font-bold">{product.name}</h3>
        <p className="mt-1 text-sm text-muted">{product.brand}</p>
        <ul className="my-5 space-y-2 text-sm text-muted">
          {product.specifications.map((spec) => (
            <li key={spec} className="flex items-start gap-2">
              <Check
                size={15}
                className="mt-1 shrink-0 text-rust"
                aria-hidden="true"
              />
              {spec}
            </li>
          ))}
        </ul>
        <div className="mt-auto border-t border-line pt-4">
          <p className="text-lg font-bold">
            {product.estimatedPrice !== undefined
              ? `Estimated ${formatCurrency(product.estimatedPrice)}`
              : "Request price"}
          </p>
          <p className="mt-1 flex items-center gap-2 text-xs text-muted">
            <Clock3 size={14} aria-hidden="true" />
            {product.delivery ?? "Confirm delivery timeline"}
          </p>
          {product.deposit && (
            <p className="mt-2 text-sm">Deposit: {product.deposit}</p>
          )}
          <Link
            href={getRequestHref(product.category, product.name)}
            className="button mt-5 w-full bg-ink text-white"
            aria-label={`Pre-order ${product.name}`}
          >
            Pre-order <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          <WhatsAppButton
            product={product.name}
            className="mt-3 w-full text-rust"
          >
            WhatsApp enquiry
          </WhatsAppButton>
        </div>
      </div>
    </article>
  );
}
