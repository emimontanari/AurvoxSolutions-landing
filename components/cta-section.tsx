"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, MessageSquare, Shield, Clock } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/motion/scroll-animations"

const highlights = [
  { icon: Clock, text: "30 minutos" },
  { icon: Shield, text: "Sin compromiso" },
  { icon: Calendar, text: "Diagnóstico ejecutivo" },
]

export function CTASection() {
  return (
    <section id="agendar" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-[1.75rem] border border-primary/20 card-premium"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {/* Layered gradient mesh background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/18 via-primary/8 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 via-transparent to-transparent" />

          {/* Animated ambient orbs */}
          <motion.div
            className="absolute -top-24 -right-24 w-[400px] h-[400px] aurora-orb bg-primary/12"
            animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-16 -left-16 w-[280px] h-[280px] aurora-orb bg-primary/8"
            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />

          <div className="relative p-10 md:p-14 lg:p-16">
            <div className="max-w-3xl">
              <ScrollReveal variant="fadeUp">
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full badge-premium text-sm font-medium mb-9">
                  <Calendar className="w-4 h-4 text-primary" />
                  Reunión de diagnóstico sin compromiso
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fadeUp" delay={0.1}>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.1]">
                  Define un plan claro de automatización para tu restaurante
                </h2>
              </ScrollReveal>

              <ScrollReveal variant="fadeUp" delay={0.2}>
                <p className="text-lg text-muted-foreground mb-9 leading-relaxed max-w-2xl">
                  Revisamos tu operación actual, identificamos oportunidades de mejora y te entregamos una propuesta
                  con impacto esperado, costos y tiempos de implementación.
                </p>
              </ScrollReveal>

              <ScrollReveal variant="fadeUp" delay={0.3}>
                <div className="flex flex-wrap gap-3 mb-10">
                  {highlights.map((item, index) => (
                    <motion.div
                      key={index}
                      className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-muted/55 text-foreground text-sm border border-border/60 font-medium"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.35 + index * 0.08, duration: 0.35 }}
                    >
                      <item.icon className="w-4 h-4 text-primary" />
                      {item.text}
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fadeUp" delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="h-14 px-8 text-base btn-gradient rounded-lg font-semibold"
                    asChild
                  >
                    <Link href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      Agendar reunión
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-base btn-outline-glow rounded-lg font-medium"
                    asChild
                  >
                    <Link href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Consultar por WhatsApp
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
