"use client"

import { Shield, Target, HeadphonesIcon, BarChart3, Award, CheckCircle, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion/scroll-animations"

const reasons = [
  {
    icon: Target,
    title: "Especializados en restaurantes",
    description: "Conocemos los desafíos únicos del sector. No somos una agencia genérica.",
  },
  {
    icon: BarChart3,
    title: "Resultados medibles",
    description: "Dashboard con métricas en tiempo real. Sabes exactamente cuánto estás ganando.",
  },
  {
    icon: Shield,
    title: "Sin riesgo",
    description: "Ofrecemos garantía de satisfacción. Si no ves resultados, te devolvemos tu inversión.",
  },
  {
    icon: HeadphonesIcon,
    title: "Soporte dedicado",
    description: "Equipo de soporte disponible para resolver cualquier duda o ajuste que necesites.",
  },
]

const differentiators = [
  "Implementación sin interrumpir tu operación",
  "Tecnología probada en +50 restaurantes",
  "ROI garantizado desde el primer mes",
  "Integraciones con sistemas existentes",
]

export function WhyUs() {
  return (
    <section className="relative py-28 lg:py-36 section-gradient overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute inset-0 noise-overlay" />

      {/* Animated ambient glow */}
      <motion.div
        className="absolute top-1/2 left-0 w-[600px] h-[600px] glow-bg-primary opacity-25 -translate-y-1/2"
        animate={{
          x: [0, 50, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left column - Content */}
          <ScrollReveal variant="slideLeft">
            <div>
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full badge-premium mb-8">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                </motion.div>
                <span className="text-sm font-medium text-foreground/90">Por qué elegirnos</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                No somos otra <span className="gradient-text">agencia de software</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Somos expertos en transformar restaurantes con tecnología que realmente funciona
                y genera resultados medibles. Nuestro enfoque está 100% centrado en hostelería.
              </p>

              {/* Vision card with premium styling */}
              <motion.div
                className="p-6 rounded-2xl card-premium mb-10 border-primary/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-5">
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 border border-primary/25"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Award className="w-7 h-7 text-primary" />
                  </motion.div>
                  <div>
                    <p className="font-display text-foreground font-semibold text-lg mb-2">Nuestra misión</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Democratizar el acceso a tecnología de IA de nivel enterprise para restaurantes
                      de todos los tamaños, permitiéndoles competir en igualdad de condiciones.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Differentiators list */}
              <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {differentiators.map((item, index) => (
                  <StaggerItem key={index}>
                    <motion.div
                      className="flex items-center gap-3 group cursor-default"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300 border border-primary/20"
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-primary" />
                      </motion.div>
                      <span className="text-sm text-foreground/70">{item}</span>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>

          {/* Right column - Reason cards */}
          <StaggerContainer staggerDelay={0.12} className="grid sm:grid-cols-2 gap-5">
            {reasons.map((reason, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="group p-7 rounded-2xl card-premium h-full"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-5 group-hover:from-primary/25 group-hover:to-primary/10 transition-all duration-400 border border-primary/20 icon-glow"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <reason.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="font-display text-base font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
