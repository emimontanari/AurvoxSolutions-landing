"use client"

import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion/scroll-animations"

const testimonials = [
  {
    quote: "Implementamos el sistema de WhatsApp y en el primer mes dejamos de perder reservas los fines de semana. El bot maneja el 80% de las consultas solo.",
    name: "Martín Rodríguez",
    role: "Dueño",
    restaurant: "La Parrilla del Centro",
    city: "Buenos Aires",
    result: "+38% reservas confirmadas",
    initials: "MR",
  },
  {
    quote: "Lo que más me sorprendió fue la velocidad de implementación. En dos semanas ya estaba funcionando sin interrumpir mi operación normal.",
    name: "Carolina Vega",
    role: "Gerente de operaciones",
    restaurant: "Osteria Nonna",
    city: "Córdoba",
    result: "-45% no-shows",
    initials: "CV",
  },
  {
    quote: "El sistema de aperitivo con QR nos ayudó a captar más de 200 contactos nuevos en un mes. Ahora tenemos una base de datos real para remarketar.",
    name: "Diego Peralta",
    role: "Socio fundador",
    restaurant: "Fuegos Modernos",
    city: "Rosario",
    result: "+200 leads/mes",
    initials: "DP",
  },
] as const

export function Testimonials() {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute inset-0 noise-overlay" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/4 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal variant="fadeUp" className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full badge-premium mb-8">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Star className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm font-medium text-foreground/90">Testimonios</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            Lo que dicen nuestros <span className="gradient-text">clientes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Más de 50 restaurantes ya transformaron su operación con Aurvox Solutions.
          </p>
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.12} className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="group h-full flex flex-col rounded-2xl card-premium p-7 hover:border-primary/40 transition-all duration-400"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.8 }}
                >
                  <Quote className="w-8 h-8 text-primary/40 mb-5 shrink-0" />
                </motion.div>

                <p className="text-foreground/80 text-[15px] leading-relaxed mb-6 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-xs font-semibold text-primary mb-6 self-start">
                  {t.result}
                </div>

                <div className="flex items-center gap-3 pt-5 border-t border-border/50">
                  <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-none">{t.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t.role} · {t.restaurant}, {t.city}
                    </p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
