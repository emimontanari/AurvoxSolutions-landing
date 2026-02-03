"use client"

import { ArrowRight, Sparkles, X, Check } from "lucide-react"
import { motion } from "framer-motion"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion/scroll-animations"

const challenges = [
  {
    text: "Pierdes reservas porque nadie contesta el teléfono",
    detail: "Clientes frustrados que no vuelven"
  },
  {
    text: "Tu equipo pierde tiempo en tareas repetitivas",
    detail: "Recursos mal aprovechados"
  },
  {
    text: "Los clientes esperan respuestas inmediatas",
    detail: "Expectativas no cumplidas"
  },
  {
    text: "Falta de seguimiento a clientes potenciales",
    detail: "Oportunidades perdidas"
  },
]

const results = [
  {
    text: "Reservas automáticas 24/7 sin intervención humana",
    detail: "Nunca pierdas una reserva"
  },
  {
    text: "Equipo enfocado en lo que realmente importa",
    detail: "Máxima productividad"
  },
  {
    text: "Respuestas instantáneas vía WhatsApp y llamadas",
    detail: "Clientes satisfechos"
  },
  {
    text: "Seguimiento automático que convierte leads",
    detail: "Más ingresos garantizados"
  },
]

// Custom animated X icon with glow effect
function AnimatedXIcon({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.55 0.22 25 / 0.4) 0%, transparent 70%)"
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Icon container */}
      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[oklch(0.45_0.18_25)] to-[oklch(0.35_0.15_20)] flex items-center justify-center shadow-[0_0_20px_oklch(0.55_0.20_25_/_0.3),inset_0_1px_1px_oklch(1_0_0_/_0.1)]">
        <X className="w-[55%] h-[55%] text-[oklch(0.95_0.02_25)] stroke-[2.5]" />
      </div>
    </div>
  )
}

// Custom animated Check icon with glow effect
function AnimatedCheckIcon({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.15 156 / 0.5) 0%, transparent 70%)"
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.9, 0.5]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      {/* Icon container */}
      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[oklch(0.50_0.12_156)] to-[oklch(0.38_0.10_156)] flex items-center justify-center shadow-[0_0_20px_oklch(0.50_0.12_156_/_0.4),inset_0_1px_1px_oklch(1_0_0_/_0.15)]">
        <Check className="w-[55%] h-[55%] text-[oklch(0.95_0.05_156)] stroke-[3]" />
      </div>
    </div>
  )
}

// Small icon for list items
function SmallXIcon() {
  return (
    <div className="relative w-7 h-7 flex-shrink-0">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[oklch(0.40_0.15_25)] to-[oklch(0.30_0.12_20)] shadow-[0_2px_8px_oklch(0.50_0.18_25_/_0.25)]" />
      <div className="absolute inset-[2px] rounded-[6px] bg-gradient-to-br from-[oklch(0.28_0.08_25)] to-[oklch(0.22_0.05_20)] flex items-center justify-center">
        <X className="w-3.5 h-3.5 text-[oklch(0.75_0.15_25)] stroke-[2.5]" />
      </div>
    </div>
  )
}

function SmallCheckIcon() {
  return (
    <div className="relative w-7 h-7 flex-shrink-0">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[oklch(0.45_0.11_156)] to-[oklch(0.35_0.09_156)] shadow-[0_2px_8px_oklch(0.45_0.11_156_/_0.3)]" />
      <div className="absolute inset-[2px] rounded-[6px] bg-gradient-to-br from-[oklch(0.25_0.06_156)] to-[oklch(0.20_0.04_156)] flex items-center justify-center">
        <Check className="w-3.5 h-3.5 text-[oklch(0.80_0.14_151)] stroke-[2.5]" />
      </div>
    </div>
  )
}

export function ChallengesResults() {
  return (
    <section className="relative py-28 lg:py-40 overflow-hidden">
      {/* Premium background with layered effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.14_0_0)] via-[oklch(0.12_0_0)] to-[oklch(0.14_0_0)]" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(oklch(0.5 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(0.5 0 0) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Ambient gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[oklch(0.45_0.18_25_/_0.04)] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[oklch(0.45_0.11_156_/_0.05)] rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal variant="fadeUp" className="text-center mb-20">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[oklch(0.25_0.03_156_/_0.5)] to-[oklch(0.20_0.02_156_/_0.3)] border border-[oklch(0.40_0.08_156_/_0.3)] backdrop-blur-sm mb-8">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-[oklch(0.75_0.14_151)]" />
            </motion.div>
            <span className="text-sm font-medium text-foreground/90 tracking-wide">Transformación</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-[3.25rem] font-bold text-foreground mb-6 leading-[1.1]">
            De los desafíos a los{" "}
            <span className="relative inline-block">
              <span className="gradient-text">resultados</span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[oklch(0.75_0.14_151)] to-transparent rounded-full"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Conocemos los problemas que enfrentas. Nuestra IA los resuelve por ti.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Challenges Column */}
          <ScrollReveal variant="slideLeft" delay={0.1}>
            <div className="relative">
              {/* Column header */}
              <div className="flex items-center gap-5 mb-10 p-5 rounded-2xl bg-gradient-to-r from-[oklch(0.22_0.04_25_/_0.6)] to-[oklch(0.18_0.02_25_/_0.3)] border border-[oklch(0.45_0.15_25_/_0.2)] backdrop-blur-sm">
                <AnimatedXIcon className="w-14 h-14" />
                <div>
                  <span className="font-display font-semibold text-foreground text-xl tracking-tight">Situación actual</span>
                  <p className="text-sm text-muted-foreground mt-0.5">Los problemas que enfrentan muchos restaurantes</p>
                </div>
              </div>

              <StaggerContainer staggerDelay={0.12} className="space-y-4">
                {challenges.map((challenge, index) => (
                  <StaggerItem key={index}>
                    <motion.div
                      className="group relative flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-[oklch(0.20_0.01_25_/_0.5)] to-[oklch(0.16_0_0_/_0.3)] border border-[oklch(0.35_0.08_25_/_0.15)] hover:border-[oklch(0.50_0.15_25_/_0.3)] transition-all duration-500 cursor-default overflow-hidden"
                      whileHover={{
                        y: -4,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                    >
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.45_0.15_25_/_0)] via-[oklch(0.45_0.15_25_/_0.05)] to-[oklch(0.45_0.15_25_/_0)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative mt-0.5">
                        <SmallXIcon />
                      </div>
                      <div className="relative flex-1 min-w-0">
                        <span className="block text-foreground/90 text-[15px] leading-relaxed font-medium">{challenge.text}</span>
                        <span className="block text-muted-foreground/60 text-xs mt-1.5 uppercase tracking-wider">{challenge.detail}</span>
                      </div>
                      {/* Index number */}
                      <span className="relative text-[oklch(0.50_0.12_25_/_0.4)] text-xs font-mono font-bold">0{index + 1}</span>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>

          {/* Results Column */}
          <ScrollReveal variant="slideRight" delay={0.2}>
            <div className="relative">
              {/* Column header */}
              <div className="flex items-center gap-5 mb-10 p-5 rounded-2xl bg-gradient-to-r from-[oklch(0.22_0.04_156_/_0.5)] to-[oklch(0.18_0.02_156_/_0.25)] border border-[oklch(0.45_0.10_156_/_0.25)] backdrop-blur-sm">
                <AnimatedCheckIcon className="w-14 h-14" />
                <div>
                  <span className="font-display font-semibold text-foreground text-xl tracking-tight">Con Aura Solutions</span>
                  <p className="text-sm text-muted-foreground mt-0.5">La transformación que implementamos</p>
                </div>
              </div>

              <StaggerContainer staggerDelay={0.12} className="space-y-4">
                {results.map((result, index) => (
                  <StaggerItem key={index}>
                    <motion.div
                      className="group relative flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-[oklch(0.20_0.02_156_/_0.4)] to-[oklch(0.16_0_0_/_0.3)] border border-[oklch(0.40_0.08_156_/_0.2)] hover:border-[oklch(0.50_0.12_156_/_0.4)] transition-all duration-500 cursor-default overflow-hidden"
                      whileHover={{
                        y: -4,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                    >
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.45_0.10_156_/_0)] via-[oklch(0.45_0.10_156_/_0.06)] to-[oklch(0.45_0.10_156_/_0)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative mt-0.5">
                        <SmallCheckIcon />
                      </div>
                      <div className="relative flex-1 min-w-0">
                        <span className="block text-foreground/90 text-[15px] leading-relaxed font-medium">{result.text}</span>
                        <span className="block text-[oklch(0.65_0.10_151_/_0.8)] text-xs mt-1.5 uppercase tracking-wider">{result.detail}</span>
                      </div>
                      {/* Index number */}
                      <span className="relative text-[oklch(0.50_0.10_156_/_0.5)] text-xs font-mono font-bold">0{index + 1}</span>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>
        </div>

        {/* Connection indicator - Premium version */}
        <ScrollReveal variant="scaleUp" delay={0.4} className="flex justify-center mt-20">
          <motion.div
            className="relative flex items-center gap-6 px-8 py-5 rounded-full bg-gradient-to-r from-[oklch(0.20_0.02_25_/_0.5)] via-[oklch(0.18_0_0_/_0.6)] to-[oklch(0.20_0.02_156_/_0.5)] border border-[oklch(0.35_0_0_/_0.4)] backdrop-blur-md shadow-[0_8px_32px_oklch(0_0_0_/_0.3)]"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            {/* Gradient border effect on hover */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[oklch(0.55_0.18_25_/_0.2)] via-transparent to-[oklch(0.55_0.12_156_/_0.2)] opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <span className="relative text-sm text-[oklch(0.70_0.12_25)] font-medium">Tu situación actual</span>

            <div className="relative flex items-center gap-3">
              {/* Animated line from red to center */}
              <motion.div
                className="w-12 h-[2px] rounded-full overflow-hidden"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="w-full h-full bg-gradient-to-r from-[oklch(0.55_0.18_25_/_0.6)] to-[oklch(0.45_0.10_75_/_0.4)]" />
              </motion.div>

              {/* Center arrow with pulsing glow */}
              <motion.div
                className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[oklch(0.35_0.08_120)] to-[oklch(0.28_0.06_156)] flex items-center justify-center border border-[oklch(0.50_0.10_156_/_0.3)]"
                animate={{
                  boxShadow: [
                    "0 0 0 0 oklch(0.50 0.10 156 / 0.4), 0 0 20px oklch(0.45 0.10 156 / 0.2)",
                    "0 0 0 8px oklch(0.50 0.10 156 / 0), 0 0 30px oklch(0.45 0.10 156 / 0.3)",
                    "0 0 0 0 oklch(0.50 0.10 156 / 0.4), 0 0 20px oklch(0.45 0.10 156 / 0.2)"
                  ]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5 text-[oklch(0.85_0.12_151)]" />
              </motion.div>

              {/* Animated line from center to green */}
              <motion.div
                className="w-12 h-[2px] rounded-full overflow-hidden"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <div className="w-full h-full bg-gradient-to-r from-[oklch(0.45_0.10_120_/_0.4)] to-[oklch(0.55_0.12_156_/_0.6)]" />
              </motion.div>
            </div>

            <span className="relative text-sm font-semibold text-[oklch(0.75_0.12_151)]">Tu negocio transformado</span>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
