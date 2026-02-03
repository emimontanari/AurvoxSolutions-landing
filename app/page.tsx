import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ScrollProgressClient } from "@/components/scroll-progress-client"

// Dynamic imports for below-the-fold sections (bundle-dynamic-imports)
// These components are loaded after the initial page load
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

const Process = dynamic(
  () => import("@/components/process").then((mod) => mod.Process),
  { ssr: true }
)

const WhyUs = dynamic(
  () => import("@/components/why-us").then((mod) => mod.WhyUs),
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
      {/* Premium scroll progress indicator - client only */}
      <ScrollProgressClient />

      <Header />
      <main id="main-content">
        <Hero />
        <ChallengesResults />
        <Benefits />
        <Services />
        <Process />
        <WhyUs />
        <CTASection />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
