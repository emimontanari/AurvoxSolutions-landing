"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ChallengesResults } from "@/components/challenges-results"
import { Benefits } from "@/components/benefits"
import { Services } from "@/components/services"
import { Process } from "@/components/process"
import { WhyUs } from "@/components/why-us"
import { CTASection } from "@/components/cta-section"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import { ScrollProgress } from "@/components/motion/scroll-animations"

export default function Home() {
  return (
    <>
      {/* Premium scroll progress indicator */}
      <ScrollProgress />

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
