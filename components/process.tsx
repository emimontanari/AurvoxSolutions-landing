"use client"

import { Search, FileText, Settings, LineChart, ChevronRight, Sparkles, Clock } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion/scroll-animations"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Diagnóstico gratis",
    description: "Analizamos tu operación actual para identificar oportunidades de automatización y ahorro.",
    duration: "30 min",
    highlight: "Gratis",
  },
  {
    number: "02",
    icon: FileText,
    title: "Propuesta personalizada",
    description: "Diseñamos una solución a medida con ROI estimado y timeline de implementación.",
    duration: "48h",
    highlight: "ROI estimado",
  },
  {
    number: "03",
    icon: Settings,
    title: "Implementación",
    description: "Configuramos e integramos la solución en 2-4 semanas sin interrumpir tu operación.",
    duration: "2-4 sem",
    highlight: "Sin interrupciones",
  },
  {
    number: "04",
    icon: LineChart,
    title: "Optimización continua",
    description: "Monitoreamos resultados y optimizamos constantemente para maximizar tu retorno.",
    duration: "Continuo",
    highlight: "Mejora constante",
  },
]

// Animated connector line between steps
function StepConnector({ index, isLast }: { index: number; isLast: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  if (isLast) return null

  return (
    <div
      ref={ref}
      className="hidden lg:flex absolute top-1/2 -right-[calc(1rem+1px)] transform -translate-y-1/2 items-center z-20"
      style={{ width: 'calc(2rem + 2px)' }}
    >
      {/* Animated line */}
      <motion.div
        className="h-[2px] bg-gradient-to-r from-primary/60 via-primary to-primary/60 flex-1"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, delay: 0.3 + index * 0.2, ease: [0.25, 0.4, 0.25, 1] }}
        style={{ transformOrigin: 'left' }}
      />

      {/* Arrow icon */}
      <motion.div
        className="w-8 h-8 rounded-full bg-background border-2 border-primary/50 flex items-center justify-center shadow-lg shadow-primary/20"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.5 + index * 0.2, type: "spring", stiffness: 200 }}
      >
        <motion.div
          animate={{ x: [0, 2, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronRight className="w-4 h-4 text-primary" />
        </motion.div>
      </motion.div>

      {/* Animated line continuation */}
      <motion.div
        className="h-[2px] bg-gradient-to-r from-primary/60 via-primary to-primary/60 flex-1"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, delay: 0.6 + index * 0.2, ease: [0.25, 0.4, 0.25, 1] }}
        style={{ transformOrigin: 'left' }}
      />
    </div>
  )
}

// Mobile connector (vertical)
function MobileConnector({ index, isLast }: { index: number; isLast: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  if (isLast) return null

  return (
    <div
      ref={ref}
      className="lg:hidden flex flex-col items-center py-4"
    >
      <motion.div
        className="w-[2px] h-8 bg-gradient-to-b from-primary via-primary/60 to-primary"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        style={{ transformOrigin: 'top' }}
      />
      <motion.div
        className="w-6 h-6 rounded-full border-2 border-primary/50 bg-background flex items-center justify-center my-1"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.3, delay: 0.2 + index * 0.1, type: "spring" }}
      >
        <ChevronRight className="w-3 h-3 text-primary rotate-90" />
      </motion.div>
      <motion.div
        className="w-[2px] h-8 bg-gradient-to-b from-primary via-primary/60 to-primary"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
        style={{ transformOrigin: 'top' }}
      />
    </div>
  )
}

function StepCard({ step, index, isLast }: { step: typeof steps[0]; index: number; isLast: boolean }) {
  return (
    <div className="relative">
      <StaggerItem>
        <motion.div
          className="relative"
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Card className={cn(
            "relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm",
            "hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10",
            "transition-all duration-500"
          )}>
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />

            {/* Top accent line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
            />

            <CardContent className="p-6 lg:p-8">
              {/* Header with icon and number */}
              <div className="flex items-start justify-between mb-6">
                {/* Icon container */}
                <motion.div
                  className="relative"
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30">
                    <step.icon className="w-7 h-7 text-primary-foreground" />
                  </div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl -z-10" />
                </motion.div>

                {/* Step number */}
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <span className="text-4xl font-display font-bold text-primary/20">{step.number}</span>
                </motion.div>
              </div>

              {/* Badges row */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="bg-muted/50 border-border text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  {step.duration}
                </Badge>
                <Badge className="bg-primary/15 text-primary border-primary/30 hover:bg-primary/20">
                  {step.highlight}
                </Badge>
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </CardContent>
          </Card>

          {/* Desktop connector */}
          <StepConnector index={index} isLast={isLast} />
        </motion.div>
      </StaggerItem>

      {/* Mobile connector */}
      <MobileConnector index={index} isLast={isLast} />
    </div>
  )
}

export function Process() {
  return (
    <section id="proceso" className="relative py-28 lg:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute inset-0 noise-overlay" />

      {/* Animated ambient glows */}
      <motion.div
        className="absolute top-0 left-1/4 w-[700px] h-[700px] glow-bg-primary opacity-20"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] glow-bg-accent opacity-15"
        animate={{
          x: [0, -30, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal variant="fadeUp" className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full badge-premium mb-8">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm font-medium text-foreground/90">Proceso</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            Cómo <span className="gradient-text">trabajamos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un proceso simple y transparente para transformar tu restaurante.
          </p>
        </ScrollReveal>

        {/* Process timeline */}
        <StaggerContainer staggerDelay={0.15} className="relative">
          {/* Desktop: Horizontal layout with proper spacing for connectors */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                step={step}
                index={index}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>

          {/* Mobile: Vertical layout */}
          <div className="lg:hidden flex flex-col items-center">
            {steps.map((step, index) => (
              <div key={index} className="w-full max-w-md">
                <StepCard
                  step={step}
                  index={index}
                  isLast={index === steps.length - 1}
                />
              </div>
            ))}
          </div>
        </StaggerContainer>

        {/* Bottom CTA hint */}
        <ScrollReveal variant="fadeUp" delay={0.5} className="text-center mt-16">
          <motion.p
            className="text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            <span className="text-primary font-medium">¿Listo para comenzar?</span>
            {" "}El primer paso es una llamada de 30 minutos sin compromiso.
          </motion.p>
        </ScrollReveal>
      </div>
    </section>
  )
}
