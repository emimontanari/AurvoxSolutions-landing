"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, MessageSquare, Shield, Clock, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ScrollReveal, MagneticHover, FloatingElement } from "@/components/motion/scroll-animations"

const highlights = [
  { icon: Clock, text: "30 minutos" },
  { icon: Shield, text: "Sin compromiso" },
  { icon: Sparkles, text: "100% gratuito" },
]

export function CTASection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98])

  return (
    <section id="agendar" ref={sectionRef} className="relative py-28 lg:py-36 overflow-hidden">
      <motion.div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ scale }}>
        <motion.div
          className="relative overflow-hidden rounded-[2rem]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {/* Premium gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-[oklch(0.65_0.16_65)]" />

          {/* Animated mesh overlay */}
          <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
            <motion.div
              className="absolute top-0 right-0 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_top_right,oklch(1_0_0_/_0.12),transparent_60%)]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.65_0.18_155_/_0.2),transparent_60%)]"
              animate={{
                scale: [1, 1.1, 1],
                x: [0, 30, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Grid pattern */}
          <div className="absolute inset-0 grid-pattern opacity-[0.06]" />

          {/* Content */}
          <div className="relative p-10 md:p-14 lg:p-20">
            <div className="max-w-3xl">
              {/* Badge */}
              <ScrollReveal variant="fadeUp">
                <motion.div
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-primary-foreground/10 backdrop-blur-md text-primary-foreground text-sm font-medium mb-10 border border-primary-foreground/10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Calendar className="w-4 h-4" />
                  </motion.div>
                  Diagnóstico gratuito sin compromiso
                </motion.div>
              </ScrollReveal>

              {/* Headline */}
              <ScrollReveal variant="fadeUp" delay={0.1}>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-7 leading-[1.1]">
                  Descubre cuánto puedes ahorrar con automatización
                </h2>
              </ScrollReveal>

              {/* Description */}
              <ScrollReveal variant="fadeUp" delay={0.2}>
                <p className="text-lg text-primary-foreground/80 mb-10 leading-relaxed max-w-2xl">
                  En 30 minutos analizaremos tu operación actual y te mostraremos exactamente
                  cómo nuestras soluciones pueden transformar tu restaurante.
                  <span className="text-primary-foreground font-medium"> Sin costo, sin compromiso.</span>
                </p>
              </ScrollReveal>

              {/* Highlights */}
              <ScrollReveal variant="fadeUp" delay={0.3}>
                <div className="flex flex-wrap gap-4 mb-12">
                  {highlights.map((item, index) => (
                    <motion.div
                      key={index}
                      className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-primary-foreground/10 backdrop-blur-md text-primary-foreground text-sm border border-primary-foreground/10 font-medium"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.text}
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>

              {/* CTAs */}
              <ScrollReveal variant="fadeUp" delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticHover strength={0.1}>
                    <Button
                      size="lg"
                      className="h-14 px-8 text-base bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-2xl hover:shadow-primary-foreground/20 transition-all duration-300 font-semibold rounded-xl"
                      asChild
                    >
                      <Link href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        Agendar reunión ahora
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.span>
                      </Link>
                    </Button>
                  </MagneticHover>
                  <MagneticHover strength={0.1}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 px-8 text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent transition-all duration-300 rounded-xl font-medium"
                      asChild
                    >
                      <Link href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        WhatsApp
                      </Link>
                    </Button>
                  </MagneticHover>
                </div>
              </ScrollReveal>
            </div>

            {/* Trust badge - floating on desktop */}
            <FloatingElement delay={0.5} duration={4} distance={8}>
              <motion.div
                className="absolute bottom-10 right-10 hidden lg:block"
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <motion.div
                  className="flex items-center gap-5 px-6 py-5 rounded-2xl bg-primary-foreground/10 backdrop-blur-xl border border-primary-foreground/10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex -space-x-3">
                    {['R', 'M', 'L'].map((letter, i) => (
                      <motion.div
                        key={letter}
                        className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-foreground/40 to-primary-foreground/20 border-2 border-primary-foreground/25 flex items-center justify-center text-xs font-bold text-primary-foreground shadow-lg"
                        initial={{ scale: 0, x: -20 }}
                        whileInView={{ scale: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                      >
                        {letter}
                      </motion.div>
                    ))}
                  </div>
                  <div>
                    <p className="text-primary-foreground font-semibold text-base">+50 restaurantes</p>
                    <p className="text-primary-foreground/70 text-sm">ya transformados</p>
                  </div>
                </motion.div>
              </motion.div>
            </FloatingElement>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
