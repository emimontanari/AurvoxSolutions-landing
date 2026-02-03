"use client"

import { Clock, TrendingUp, Users, Zap, LucideIcon, Sparkles, Star, ArrowUpRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion/scroll-animations"

interface Benefit {
  icon: LucideIcon
  title: string
  description: string
  metric: string
  metricLabel: string
  accentColor: string
  highlight: string
}

const benefits: Benefit[] = [
  {
    icon: Clock,
    title: "Ahorro de tiempo",
    description: "Automatiza tareas repetitivas y libera horas de trabajo cada semana para tu equipo.",
    metric: "+20h",
    metricLabel: "semanales liberadas",
    accentColor: "156", // emerald
    highlight: "Eficiencia máxima",
  },
  {
    icon: TrendingUp,
    title: "Más ingresos",
    description: "Recupera reservas perdidas y aumenta la conversión con seguimiento automático 24/7.",
    metric: "+35%",
    metricLabel: "más conversión",
    accentColor: "140", // teal
    highlight: "ROI garantizado",
  },
  {
    icon: Users,
    title: "Mejor experiencia",
    description: "Tus clientes reciben respuestas instantáneas, mejorando su satisfacción y fidelidad.",
    metric: "4.8",
    metricLabel: "satisfacción",
    accentColor: "170", // cyan
    highlight: "Clientes felices",
  },
  {
    icon: Zap,
    title: "Implementación rápida",
    description: "En 2-4 semanas tendrás tu sistema funcionando sin interrumpir tu operación.",
    metric: "2-4",
    metricLabel: "semanas",
    accentColor: "85", // lime
    highlight: "Sin fricciones",
  },
]

// Premium animated metric with high contrast
function AnimatedMetric({ value, showStar = false }: { value: string; showStar?: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-center gap-1.5"
      initial={{ opacity: 0, scale: 0.5, y: 10 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: 10 }}
      transition={{ duration: 0.7, type: "spring", stiffness: 180, damping: 14 }}
    >
      <span 
        className="tabular-nums font-black text-2xl tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
      >
        {value}
      </span>
      {showStar && (
        <motion.div
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Star 
            className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]"
          />
        </motion.div>
      )}
    </motion.div>
  )
}

// Premium icon container with multiple layered glow effects
function PremiumIcon({ Icon, accentColor, index }: { Icon: LucideIcon; accentColor: string; index: number }) {
  return (
    <div className="relative w-20 h-20 mb-8">
      {/* Outer animated glow ring */}
      <motion.div
        className="absolute -inset-3 rounded-3xl"
        style={{
          background: `radial-gradient(circle at center, oklch(0.55 0.14 ${accentColor} / 0.2) 0%, transparent 70%)`
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.4
        }}
      />

      {/* Secondary pulsing ring */}
      <motion.div
        className="absolute -inset-1 rounded-2xl"
        style={{
          background: `conic-gradient(from ${index * 90}deg, oklch(0.50 0.12 ${accentColor} / 0.15), transparent, oklch(0.50 0.12 ${accentColor} / 0.15))`
        }}
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Main icon container with glass effect */}
      <motion.div
        className="relative w-full h-full rounded-2xl flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(145deg, oklch(0.28 0.05 ${accentColor}) 0%, oklch(0.18 0.02 ${accentColor}) 100%)`,
          boxShadow: `
            0 8px 32px oklch(0.45 0.12 ${accentColor} / 0.25),
            0 2px 8px oklch(0 0 0 / 0.3),
            inset 0 1px 1px oklch(1 0 0 / 0.08),
            inset 0 -1px 1px oklch(0 0 0 / 0.1)
          `
        }}
        whileHover={{
          scale: 1.08,
          rotate: [0, -3, 3, 0]
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Inner gradient highlight */}
        <div
          className="absolute inset-[1px] rounded-[15px]"
          style={{
            background: `linear-gradient(145deg, oklch(0.40 0.08 ${accentColor} / 0.4) 0%, transparent 40%, oklch(0.20 0.02 ${accentColor} / 0.2) 100%)`,
          }}
        />

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(105deg, transparent 40%, oklch(1 0 0 / 0.1) 45%, oklch(1 0 0 / 0.15) 50%, oklch(1 0 0 / 0.1) 55%, transparent 60%)`
          }}
          animate={{
            x: ["-100%", "200%"]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut"
          }}
        />

        {/* Icon with gradient */}
        <Icon
          className="relative w-9 h-9"
          style={{ color: `oklch(0.82 0.15 ${accentColor})` }}
          strokeWidth={1.5}
        />
      </motion.div>
    </div>
  )
}

// Premium floating metric badge with high visibility
function MetricBadge({ 
  metric, 
  accentColor, 
  index,
  showStar 
}: { 
  metric: string
  accentColor: string
  index: number
  showStar?: boolean
}) {
  return (
    <motion.div
      className="absolute top-0 right-6 z-30"
      initial={{ opacity: 0, y: 20, scale: 0.7, rotate: -8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 + index * 0.12, duration: 0.7, type: "spring", stiffness: 120 }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute -inset-3 rounded-2xl"
        style={{
          background: `radial-gradient(circle, oklch(0.55 0.15 ${accentColor} / 0.4) 0%, transparent 70%)`
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative px-6 py-3.5 rounded-2xl"
        style={{
          background: `linear-gradient(145deg, oklch(0.55 0.16 ${accentColor}) 0%, oklch(0.42 0.14 ${accentColor}) 100%)`,
          boxShadow: `
            0 16px 48px oklch(0.40 0.15 ${accentColor} / 0.5),
            0 6px 16px oklch(0 0 0 / 0.4),
            inset 0 2px 3px oklch(1 0 0 / 0.25),
            inset 0 -2px 2px oklch(0 0 0 / 0.15)
          `
        }}
        whileHover={{ scale: 1.08, y: -4 }}
        transition={{ duration: 0.25 }}
      >
        {/* Bright top shine */}
        <div
          className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl"
          style={{
            background: "linear-gradient(180deg, oklch(1 0 0 / 0.25) 0%, transparent 100%)"
          }}
        />
        
        {/* Border highlight */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            border: `1.5px solid oklch(0.80 0.12 ${accentColor} / 0.6)`,
            borderBottom: `1.5px solid oklch(0.35 0.10 ${accentColor} / 0.4)`
          }}
        />
        
        <AnimatedMetric 
          value={metric} 
          showStar={showStar}
        />
      </motion.div>
    </motion.div>
  )
}

// Premium index badge
function IndexBadge({ index, accentColor }: { index: number; accentColor: string }) {
  return (
    <motion.div
      className="absolute top-5 left-5 w-8 h-8 rounded-xl flex items-center justify-center z-10"
      style={{
        background: `linear-gradient(145deg, oklch(0.22 0.03 ${accentColor}) 0%, oklch(0.16 0.01 ${accentColor}) 100%)`,
        border: `1px solid oklch(0.35 0.06 ${accentColor} / 0.4)`,
        boxShadow: `inset 0 1px 1px oklch(1 0 0 / 0.05)`
      }}
      whileHover={{ scale: 1.1 }}
    >
      <span 
        className="font-mono text-xs font-bold tracking-tight"
        style={{ color: `oklch(0.65 0.10 ${accentColor})` }}
      >
        0{index + 1}
      </span>
    </motion.div>
  )
}

export function Benefits() {
  return (
    <section id="beneficios" className="relative py-32 lg:py-48 overflow-hidden">
      {/* Premium layered background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.11_0_0)] via-[oklch(0.13_0_0)] to-[oklch(0.11_0_0)]" />

      {/* Animated gradient mesh */}
      <div className="absolute inset-0 opacity-60">
        <motion.div
          className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.38 0.10 156 / 0.08) 0%, transparent 55%)"
          }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 60, 0],
            y: [0, -40, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-0 w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.42 0.11 140 / 0.06) 0%, transparent 55%)"
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -50, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.40 0.12 170 / 0.05) 0%, transparent 55%)"
          }}
          animate={{
            scale: [1, 1.2, 1],
            y: [0, -30, 0],
            opacity: [0.35, 0.55, 0.35]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      {/* Refined grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.55 0 0) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.55 0 0) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Diagonal accent lines */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 80px,
              oklch(0.50 0.10 156) 80px,
              oklch(0.50 0.10 156) 81px
            )`
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Premium section header */}
        <ScrollReveal variant="fadeUp" className="text-center mb-28">
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[oklch(0.22_0.04_156_/_0.6)] via-[oklch(0.20_0.03_156_/_0.4)] to-[oklch(0.18_0.02_156_/_0.3)] border border-[oklch(0.45_0.10_156_/_0.25)] backdrop-blur-md mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="relative"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-5 h-5 text-[oklch(0.78_0.15_151)]" />
              {/* Sparkle glow */}
              <div className="absolute inset-0 blur-sm">
                <Sparkles className="w-5 h-5 text-[oklch(0.70_0.12_151_/_0.5)]" />
              </div>
            </motion.div>
            <span className="text-sm font-semibold text-foreground/90 tracking-wider uppercase">
              Beneficios Comprobados
            </span>
          </motion.div>

          {/* Headline */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground mb-7 leading-[1.08]">
            Resultados que{" "}
            <span className="relative inline-block">
              <span className="gradient-text">transforman</span>
              {/* Animated underline */}
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full overflow-hidden"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="w-full h-full bg-gradient-to-r from-[oklch(0.65_0.15_156)] via-[oklch(0.75_0.14_151)] to-[oklch(0.65_0.15_140)]"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: "200% 100%" }}
                />
              </motion.div>
              {/* Text glow */}
              <div className="absolute inset-0 blur-2xl opacity-30 gradient-text" aria-hidden="true">
                transforman
              </div>
            </span>
            {" "}tu negocio
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Soluciones diseñadas para generar resultados{" "}
            <span className="text-foreground/80 font-medium">medibles y sostenibles</span> desde el primer día.
          </p>
        </ScrollReveal>

        {/* Benefits grid with premium cards */}
        <StaggerContainer staggerDelay={0.1} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-6">
          {benefits.map((benefit, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="group relative h-full pt-8"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Metric badge - OUTSIDE the card for visibility */}
                <MetricBadge
                  metric={benefit.metric}
                  accentColor={benefit.accentColor}
                  index={index}
                  showStar={benefit.metricLabel === "satisfacción"}
                />

                {/* Card background glow on hover */}
                <motion.div
                  className="absolute inset-x-[-8px] top-8 bottom-[-8px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
                  style={{
                    background: `radial-gradient(circle at center, oklch(0.45 0.10 ${benefit.accentColor} / 0.15) 0%, transparent 70%)`
                  }}
                />

                {/* Main card */}
                <div
                  className="relative p-7 pt-10 rounded-2xl h-full overflow-hidden transition-all duration-600"
                  style={{
                    background: `linear-gradient(160deg, oklch(0.20 0.015 ${benefit.accentColor} / 0.5) 0%, oklch(0.14 0 0 / 0.7) 50%, oklch(0.16 0.01 ${benefit.accentColor} / 0.3) 100%)`,
                    border: `1px solid oklch(0.32 0.04 ${benefit.accentColor} / 0.25)`,
                    boxShadow: `0 4px 24px oklch(0 0 0 / 0.2)`
                  }}
                >
                  {/* Index badge */}
                  <IndexBadge index={index} accentColor={benefit.accentColor} />

                  {/* Hover border enhancement */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      border: `1px solid oklch(0.55 0.12 ${benefit.accentColor} / 0.5)`,
                      boxShadow: `
                        inset 0 0 40px oklch(0.45 0.10 ${benefit.accentColor} / 0.06),
                        0 0 30px oklch(0.45 0.10 ${benefit.accentColor} / 0.1)
                      `
                    }}
                  />

                  {/* Top shine on hover */}
                  <div
                    className="absolute inset-x-0 top-0 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
                    style={{
                      background: `linear-gradient(180deg, oklch(0.55 0.10 ${benefit.accentColor} / 0.1) 0%, transparent 100%)`
                    }}
                  />

                  {/* Corner accent */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at top right, oklch(0.50 0.12 ${benefit.accentColor} / 0.15) 0%, transparent 70%)`
                    }}
                  />

                  {/* Icon */}
                  <PremiumIcon Icon={benefit.icon} accentColor={benefit.accentColor} index={index} />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Highlight tag */}
                    <motion.div
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg mb-4"
                      style={{
                        background: `oklch(0.22 0.04 ${benefit.accentColor} / 0.6)`,
                        border: `1px solid oklch(0.40 0.08 ${benefit.accentColor} / 0.3)`
                      }}
                    >
                      <span 
                        className="text-[10px] font-bold uppercase tracking-widest"
                        style={{ color: `oklch(0.70 0.12 ${benefit.accentColor})` }}
                      >
                        {benefit.highlight}
                      </span>
                    </motion.div>

                    <h3
                      className="font-display text-xl font-semibold text-foreground mb-3 transition-colors duration-300 group-hover:text-[oklch(0.88_0.10_156)]"
                    >
                      {benefit.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {benefit.description}
                    </p>

                    {/* Footer with metric label and animated line */}
                    <div className="pt-5 relative">
                      {/* Background line */}
                      <div 
                        className="absolute top-0 left-0 right-0 h-px"
                        style={{
                          background: `linear-gradient(90deg, oklch(0.28 0.02 ${benefit.accentColor}) 0%, oklch(0.22 0 0) 50%, oklch(0.28 0.02 ${benefit.accentColor}) 100%)`
                        }}
                      />

                      {/* Animated accent line */}
                      <motion.div
                        className="absolute top-0 left-0 h-px"
                        style={{
                          background: `linear-gradient(90deg, oklch(0.60 0.14 ${benefit.accentColor}) 0%, oklch(0.50 0.10 ${benefit.accentColor} / 0.5) 80%, transparent 100%)`
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: "65%" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      />

                      <div className="flex items-center justify-between">
                        <span 
                          className="text-xs uppercase tracking-[0.15em] font-medium"
                          style={{ color: `oklch(0.55 0.06 ${benefit.accentColor})` }}
                        >
                          {benefit.metricLabel}
                        </span>
                        
                        {/* Hover arrow button */}
                        <motion.div
                          className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400"
                          style={{
                            background: `linear-gradient(135deg, oklch(0.35 0.06 ${benefit.accentColor}) 0%, oklch(0.28 0.04 ${benefit.accentColor}) 100%)`,
                            border: `1px solid oklch(0.50 0.10 ${benefit.accentColor} / 0.4)`
                          }}
                          whileHover={{ scale: 1.15 }}
                        >
                          <ArrowUpRight
                            className="w-3.5 h-3.5"
                            style={{ color: `oklch(0.80 0.12 ${benefit.accentColor})` }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom decorative section */}
        <ScrollReveal variant="fadeUp" delay={0.5} className="mt-20">
          {/* Connecting dots indicator */}
          <div className="flex justify-center items-center gap-4 mb-12">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
              >
                {/* Outer glow */}
                <motion.div
                  className="absolute -inset-1 rounded-full"
                  style={{
                    background: `oklch(0.50 0.12 ${benefits[i].accentColor} / 0.3)`
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut"
                  }}
                />
                {/* Main dot */}
                <motion.div
                  className="relative w-3 h-3 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, oklch(0.60 0.12 ${benefits[i].accentColor}) 0%, oklch(0.45 0.10 ${benefits[i].accentColor}) 100%)`,
                    boxShadow: `0 2px 8px oklch(0.50 0.12 ${benefits[i].accentColor} / 0.4)`
                  }}
                  animate={{
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
                {/* Connecting line (except for last dot) */}
                {i < 3 && (
                  <motion.div
                    className="absolute top-1/2 left-full w-8 h-[2px] -translate-y-1/2 ml-1"
                    style={{
                      background: `linear-gradient(90deg, oklch(0.45 0.10 ${benefits[i].accentColor} / 0.4) 0%, oklch(0.45 0.10 ${benefits[i + 1].accentColor} / 0.4) 100%)`
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Summary text */}
          <motion.p
            className="text-center text-muted-foreground/70 text-sm max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <span className="text-foreground/60 font-medium">4 pilares</span> que garantizan el éxito de tu transformación digital
          </motion.p>
        </ScrollReveal>
      </div>
    </section>
  )
}
