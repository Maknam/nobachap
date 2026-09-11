import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation } from "@/lib/content";
import { MobileNavigation } from "./MobileNavigation";
import { AnnouncementBar } from "./AnnouncementBar";
export function Header() {
  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-20 border-b border-line bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between gap-6 px-[5%]">
          <Link href="/#home" aria-label="NOBACHAP home">
            <Image
              src="/images/nobachap-logo.jpeg"
              alt="NOBACHAP Home Appliances & Accessories"
              width={1280}
              height={426}
              sizes="200px"
              className="h-auto w-[175px] sm:w-[200px]"
            />
          </Link>
          <nav
            aria-label="Main navigation"
            className="hidden min-[1200px]:block"
          >
            <ul className="flex items-center gap-6 text-sm font-semibold">
              {navigation.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={
                      index === navigation.length - 1
                        ? "button bg-ink text-white"
                        : "py-3 hover:text-rust"
                    }
                  >
                    {item.label}
                    {index === navigation.length - 1 && (
                      <ArrowUpRight size={17} aria-hidden="true" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <MobileNavigation />
        </div>
      </header>
    </>
  );
}
