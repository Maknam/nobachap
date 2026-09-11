import { HeroSection } from "@/components/HeroSection";
import { TrustStrip } from "@/components/TrustStrip";
import { AboutSection } from "@/components/AboutSection";
import { ProductCategories } from "@/components/ProductCategories";
import { HowItWorks } from "@/components/HowItWorks";
import { TrackingPreview } from "@/components/TrackingPreview";
import { PreOrderSection } from "@/components/PreOrderSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { WaitingListSection } from "@/components/WaitingListSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { FAQSection } from "@/components/FAQSection";
import { FinalCTA } from "@/components/FinalCTA";
export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <TrustStrip />
      <AboutSection />
      <ProductCategories />
      <FeaturedProducts />
      <HowItWorks />
      <PreOrderSection />
      <WaitingListSection />
      <TrackingPreview />
      <WhyChooseUs />
      <Testimonials />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}
