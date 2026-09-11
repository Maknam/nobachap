import Image from "next/image";
import { ArrowRight, ArrowDown, MapPin } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";
export function HeroSection() {
  return (
    <section id="home" className="overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-[1600px] gap-8 px-[5%] py-10 md:grid-cols-[1fr_1fr] md:items-center md:gap-10 md:py-14">
        <div className="max-w-[620px]">
          <span className="eyebrow flex items-center gap-2">
            <span className="size-2 rounded-full bg-copper" />A better way to
            bring it home
          </span>
          <h1 className="font-heading text-[clamp(2.6rem,4.6vw,4.7rem)] leading-[1.07] font-extrabold tracking-[-.055em]">
            Tell us what your home needs.
            <br />
            <span className="text-rust">We’ll source it.</span>
          </h1>
          <p className="mt-5 max-w-[510px] text-base text-muted">
            NOBACHAP helps customers across Ghana pre-order quality home
            appliances and accessories, with clear support from request to
            nationwide delivery.
          </p>
          <div className="mt-7 flex flex-wrap items-start gap-3">
            <a href="#enquire" className="button bg-copper text-ink">
              Start a Pre-order <ArrowRight size={18} aria-hidden="true" />
            </a>
            <WhatsAppButton />
          </div>
          <a
            href="#process"
            className="mt-6 inline-flex items-center gap-2 py-2 text-sm font-semibold"
          >
            See How It Works <ArrowDown size={15} aria-hidden="true" />
          </a>
        </div>
        <div className="relative min-h-[310px] overflow-hidden rounded-[24px] bg-ink md:min-h-[480px]">
          <Image
            src="/images/appliance-hero.png"
            alt="A warm, modern home with a refrigerator, washing machine, television and kitchen appliances"
            fill
            priority
            sizes="(max-width: 767px) 90vw, 48vw"
            className="object-cover object-[65%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <div className="absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-2xl border border-white/30 bg-paper/95 p-4 text-ink backdrop-blur-sm">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cream text-rust">
              <MapPin size={21} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold">
                Your request. Your home. Anywhere in Ghana.
              </p>
              <p className="text-xs text-muted">
                Appliances sourced around your needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
