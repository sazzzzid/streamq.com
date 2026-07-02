import type { Metadata } from "next"
import { CtaSection } from "@/components/home/cta-section"
import { EnterpriseSection } from "@/components/home/enterprise-section"
import { FaqSection } from "@/components/home/faq-section"
import { HeroSection } from "@/components/home/hero-section"
import { IncludedSection } from "@/components/home/included-section"
import { PricingSection } from "@/components/home/pricing-section"
import { ProductDemoSection } from "@/components/home/product-demo-section"
import { PerformanceSection } from "@/components/home/performance-section"
import { HomeJsonLd } from "@/components/seo/home-json-ld"
import { homeMetadata } from "@/lib/seo"

export const metadata: Metadata = homeMetadata

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <main id="main">
        <HeroSection />
        <PerformanceSection />
        <ProductDemoSection />
        <IncludedSection />
        <EnterpriseSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>
    </>
  )
}
