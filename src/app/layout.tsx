import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const title = "NOBACHAP | Pre-order Home Appliances Across Ghana";
const description =
  "Pre-order quality home appliances from NOBACHAP with nationwide delivery across Ghana.";
export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  alternates: { canonical: getSiteUrl() ? "/" : undefined },
  title,
  description,
  openGraph: { title, description, type: "website", locale: "en_GH" },
  icons: { icon: "/images/nobachap-logo.jpeg" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${manrope.variable}`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:p-4"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
