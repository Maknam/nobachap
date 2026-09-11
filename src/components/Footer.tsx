import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { navigation } from "@/lib/content";
import { categories } from "@/data/categories";
import { getRequestHref } from "@/lib/format";
import { SocialLinks } from "./SocialLinks";
import { WhatsAppButton } from "./WhatsAppButton";
export function Footer() {
  return (
    <footer className="border-t border-line bg-white px-[5%] pt-14 pb-6 text-sm text-muted">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_.7fr_1fr_1fr]">
          <div>
            <Image
              src="/images/nobachap-logo.jpeg"
              alt="NOBACHAP Home Appliances & Accessories"
              width={1280}
              height={426}
              sizes="220px"
              className="h-auto w-[220px]"
            />
            <p className="mt-5 max-w-[290px]">
              Quality home appliances and accessories, sourced on request and
              delivered across Ghana.
            </p>
            <p className="mt-4 flex items-center gap-2 font-semibold text-rust">
              <MapPin size={17} aria-hidden="true" />
              Nationwide delivery across Ghana
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <h2 className="mb-4 font-bold text-ink">Explore</h2>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block py-1 hover:text-rust"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#faqs"
                  className="inline-block py-1 hover:text-rust"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Appliance categories">
            <h2 className="mb-4 font-bold text-ink">For your home</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={getRequestHref(category.id)}
                    className="inline-block py-1 hover:text-rust"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="mb-4 font-bold text-ink">Let’s talk appliances</h2>
            <p className="mb-4">
              Ask about a product, a model or your next pre-order.
            </p>
            <WhatsAppButton className="text-rust">
              Chat on WhatsApp
            </WhatsAppButton>
            <Link
              href="/#enquire"
              className="mt-4 inline-block py-2 font-semibold text-rust underline underline-offset-4"
            >
              Prepare a product request
            </Link>
          </div>
        </div>
        <div className="mt-10 border-t border-line py-6">
          <SocialLinks />
        </div>
        <div className="flex flex-col justify-between gap-4 border-t border-line pt-5 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} NOBACHAP. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <span>Privacy Policy — coming soon</span>
            <span>Terms — coming soon</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
