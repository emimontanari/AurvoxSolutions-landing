"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, MessageSquare, Bot, CheckCircle } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, memo } from "react"
import { FloatingElement, MagneticHover } from "@/components/motion/scroll-animations"

// Hoist animation variants outside component (rendering-hoist-jsx)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(10px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1] as const
    }
  }
}

const phoneVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    rotateY: -15,
    filter: "blur(20px)"
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      delay: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as const
    }
  }
}

// Hoist static data outside component (rerender-memo)
const trustIndicators = [
  { value: "+50", label: "Restaurantes", sublabel: "transformados" },
  { value: "24/7", label: "Atención IA", sublabel: "ininterrumpida" },
  { value: "+35%", label: "Más reservas", sublabel: "en promedio" }
] as const

const chatMessages = [
  { type: "user", text: "Hola, quiero reservar una mesa para 4 personas", delay: 0.8 },
  { type: "bot", text: "Hola! Claro, estare encantado de ayudarte. Para que dia y hora te gustaria la reserva?", delay: 1.2 },
  { type: "user", text: "Para este sabado a las 21:00", delay: 1.6 },
  { type: "bot", text: "Perfecto! Tenemos disponibilidad. A nombre de quien registro la reserva?", delay: 2 },
] as const

// Memoized chat message component (rerender-memo)
const ChatMessage = memo(function ChatMessage({ 
  message, 
  index 
}: { 
  message: typeof chatMessages[number]
  index: number 
}) {
  return (
    <motion.div
      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: message.delay, duration: 0.5 }}
    >
      <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${
        message.type === 'user'
          ? 'rounded-br-md bg-primary text-primary-foreground shadow-lg'
          : 'rounded-bl-md bg-muted/80 text-foreground border border-border/50'
      } text-sm`}>
        {message.text}
      </div>
    </motion.div>
  )
})

// Memoized trust indicator component (rerender-memo)
const TrustIndicator = memo(function TrustIndicator({
  stat,
  index
}: {
  stat: typeof trustIndicators[number]
  index: number
}) {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 + index * 0.15, duration: 0.5 }}
    >
      <div className={`w-12 h-12 rounded-xl ${index === 1 ? 'bg-accent/10 border-accent/20' : 'bg-primary/10 border-primary/20'} flex items-center justify-center border`}>
        <span className={`font-display text-xl font-bold ${index === 1 ? 'text-accent' : 'text-primary'} tabular-nums`}>
          {stat.value}
        </span>
      </div>
      <div className="text-left">
        <div className="text-sm font-medium text-foreground">{stat.label}</div>
        <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
      </div>
      {index < 2 && (
        <div className="hidden sm:block w-px h-10 bg-border ml-7" />
      )}
    </motion.div>
  )
})

export function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  // Parallax effects for background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Animated background layers */}
      <div className="absolute inset-0 bg-background" />

      {/* Parallax mesh gradient */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_50%_at_20%_40%,oklch(0.78_0.14_75_/_0.08),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,oklch(0.65_0.18_155_/_0.05),transparent_50%)]" />
      </motion.div>

      {/* Refined grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0 noise-overlay" />

      <motion.div
        className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <motion.div
            className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Premium badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full badge-premium mb-10">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                </motion.div>
                <span className="text-sm font-medium text-foreground/90 tracking-wide">
                  Automatización con IA para Restaurantes
                </span>
              </div>
            </motion.div>

            {/* Powerful headline */}
            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-8"
              variants={itemVariants}
            >
              <span className="gradient-text-white">Transforma tu</span>
              <br />
              <span className="gradient-text">restaurante con IA</span>
            </motion.h1>

            {/* Refined subheadline */}
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
              variants={itemVariants}
            >
              Implementamos soluciones de inteligencia artificial que recuperan
              ingresos perdidos, automatizan reservas y atienden a tus clientes
              <span className="text-foreground font-medium"> las 24 horas, los 7 días.</span>
            </motion.p>

            {/* Premium CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-14"
              variants={itemVariants}
            >
              <MagneticHover strength={0.15}>
                <Button
                  size="lg"
                  asChild
                  className="btn-gradient w-full sm:w-auto h-14 px-8 text-base font-semibold rounded-xl"
                >
                  <Link href="#agendar" className="flex items-center gap-2">
                    Agenda tu demo gratis
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </Link>
                </Button>
              </MagneticHover>
              <MagneticHover strength={0.15}>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="btn-outline-glow w-full sm:w-auto h-14 px-8 text-base font-medium rounded-xl"
                >
                  <Link href="#servicios">Ver servicios</Link>
                </Button>
              </MagneticHover>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-10 gap-y-4"
              variants={itemVariants}
            >
              {trustIndicators.map((stat, index) => (
                <TrustIndicator key={index} stat={stat} index={index} />
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Premium Phone Mockup */}
          <motion.div
            className="relative hidden lg:block"
            variants={phoneVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Ambient glow */}
            <motion.div
              className="absolute inset-0 glow-bg-primary scale-125 opacity-40"
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1.2, 1.3, 1.2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Premium phone device */}
            <div className="relative mx-auto">
              <FloatingElement duration={5} distance={12}>
                <div className="relative mx-auto w-[320px] h-[640px] rounded-[48px] bg-gradient-to-b from-[oklch(0.25_0.01_60)] to-[oklch(0.15_0.008_60)] p-3 shadow-[0_50px_100px_-20px_oklch(0_0_0_/_0.5),0_30px_60px_-30px_oklch(0_0_0_/_0.3)]">
                  {/* Inner bezel */}
                  <div className="absolute inset-3 rounded-[40px] bg-gradient-to-b from-[oklch(0.20_0.008_60)] to-[oklch(0.12_0.006_60)]" />

                  {/* Screen */}
                  <div className="relative w-full h-full rounded-[40px] bg-background overflow-hidden border border-border/30">
                    {/* Dynamic Island */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 rounded-full bg-black z-10" />

                    {/* Chat header */}
                    <div className="relative pt-12 px-5 pb-4 border-b border-border/50 bg-background/80 backdrop-blur-xl">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Bot className="w-6 h-6 text-primary-foreground" />
                        </motion.div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-foreground">Aura AI</div>
                          <div className="flex items-center gap-1.5 text-xs text-accent">
                            <motion.span
                              className="w-2 h-2 rounded-full bg-accent"
                              animate={{ opacity: [1, 0.5, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            En línea
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat messages with staggered animation */}
                    <div className="px-4 py-5 space-y-4 h-[380px] overflow-hidden">
                      {chatMessages.map((message, index) => (
                        <ChatMessage key={index} message={message} index={index} />
                      ))}

                      {/* Typing indicator */}
                      <motion.div
                        className="flex justify-start"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.4, duration: 0.3 }}
                      >
                        <div className="px-4 py-3 rounded-2xl bg-muted/50 border border-border/30 flex items-center gap-1.5">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 rounded-full bg-primary/60"
                              animate={{ y: [0, -5, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.15
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Input area */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-muted/60 border border-border/50">
                        <MessageSquare className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground text-sm">Escribe un mensaje...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </FloatingElement>

              {/* Floating badges */}
              <FloatingElement delay={0.5} duration={4} distance={10}>
                <motion.div
                  className="absolute -left-8 top-24 px-4 py-3 rounded-2xl card-premium shadow-2xl"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center border border-accent/25">
                      <CheckCircle className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-[11px] text-muted-foreground uppercase tracking-wider">Confirmada</div>
                      <div className="text-sm font-semibold text-foreground">Mesa #5 - 4 personas</div>
                    </div>
                  </div>
                </motion.div>
              </FloatingElement>

              <FloatingElement delay={1} duration={4.5} distance={10}>
                <motion.div
                  className="absolute -right-6 bottom-36 px-4 py-3 rounded-2xl card-premium shadow-2xl"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center border border-primary/25">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-[11px] text-muted-foreground uppercase tracking-wider">Respuesta</div>
                      <div className="text-sm font-semibold text-foreground">&lt; 3 segundos</div>
                    </div>
                  </div>
                </motion.div>
              </FloatingElement>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Elegant bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </section>
  )
}
