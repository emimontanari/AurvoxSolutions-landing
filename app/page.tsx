import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ScrollProgressClient } from "@/components/scroll-progress-client"
import { WhatsAppFAB } from "@/components/whatsapp-fab"

// Dynamic imports for below-the-fold sections (bundle-dynamic-imports)
const ChallengesResults = dynamic(
  () => import("@/components/challenges-results").then((mod) => mod.ChallengesResults),
  { ssr: true }
)

const Benefits = dynamic(
  () => import("@/components/benefits").then((mod) => mod.Benefits),
  { ssr: true }
)

const Services = dynamic(
  () => import("@/components/services").then((mod) => mod.Services),
  { ssr: true }
)

const AppetizerPromoSection = dynamic(
  () => import("@/components/appetizer-promo-section").then((mod) => mod.AppetizerPromoSection),
  { ssr: true }
)

const Process = dynamic(
  () => import("@/components/process").then((mod) => mod.Process),
  { ssr: true }
)

const WhyUs = dynamic(
  () => import("@/components/why-us").then((mod) => mod.WhyUs),
  { ssr: true }
)

const Testimonials = dynamic(
  () => import("@/components/testimonials").then((mod) => mod.Testimonials),
  { ssr: true }
)

const ROICalculator = dynamic(
  () => import("@/components/roi-calculator").then((mod) => mod.ROICalculator),
  { ssr: true }
)

const Integrations = dynamic(
  () => import("@/components/integrations").then((mod) => mod.Integrations),
  { ssr: true }
)

const ContactForm = dynamic(
  () => import("@/components/contact-form").then((mod) => mod.ContactForm),
  { ssr: true }
)

const CTASection = dynamic(
  () => import("@/components/cta-section").then((mod) => mod.CTASection),
  { ssr: true }
)

const FAQ = dynamic(
  () => import("@/components/faq").then((mod) => mod.FAQ),
  { ssr: true }
)

const Footer = dynamic(
  () => import("@/components/footer").then((mod) => mod.Footer),
  { ssr: true }
)

export default function Home() {
  return (
    <>
      <ScrollProgressClient />

      <Header />
      <main id="main-content">
        <Hero />
        <ChallengesResults />
        <Benefits />
        <Services />
        <AppetizerPromoSection />
        <Process />
        <WhyUs />
        <Testimonials />
        <ROICalculator />
        <Integrations />
        <ContactForm />
        <CTASection />
        <FAQ />
      </main>
      <Footer />

      {/* Fixed floating button — renders client-side only */}
      <WhatsAppFAB />
    </>
  )
}
