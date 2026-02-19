"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, CheckCircle2, MessageSquare, ShieldCheck } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const trustIndicators = [
  { value: "+50", label: "Restaurantes", sublabel: "operando con Aurvox" },
  { value: "24/7", label: "Atención automatizada", sublabel: "sin interrupciones" },
  { value: "+35%", label: "Mejora en reservas", sublabel: "promedio mensual" }
] as const

const chatMessages = [
  { type: "user", text: "Necesito una mesa para 4 personas hoy a las 21:00" },
  { type: "bot", text: "Listo. Tengo disponibilidad y puedo confirmar en menos de un minuto." },
  { type: "bot", text: "¿Deseas que envíe la confirmación por WhatsApp?" },
] as const

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="px-4 py-3 rounded-xl bg-muted/80 border border-border/60 flex items-center gap-1.5">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  )
}

export function Hero() {
  const [shownMessages, setShownMessages] = useState<number[]>([0])
  const [showTyping, setShowTyping] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowTyping(true), 700)
    const t2 = setTimeout(() => {
      setShowTyping(false)
      setShownMessages([0, 1])
    }, 1900)
    const t3 = setTimeout(() => setShownMessages([0, 1, 2]), 2600)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-pattern opacity-15" />

      {/* Subtle background orbs */}
      <div className="absolute top-1/4 -left-32 w-[480px] h-[480px] aurora-orb bg-primary/8 animate-float" style={{ animationDelay: "0s" }} />
      <div className="absolute bottom-1/4 -right-32 w-[360px] h-[360px] aurora-orb bg-primary/5 animate-float" style={{ animationDelay: "2.5s" }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full badge-premium mb-9">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground/90 tracking-wide">
                Automatización confiable para restaurantes
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.06] mb-7">
              <span className="gradient-text-white">Operación más</span>
              <br />
              <span className="gradient-text">eficiente y rentable</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Implementamos IA aplicada a reservas, atención y seguimiento comercial.
              <span className="text-foreground font-medium"> Menos tareas manuales, más control y crecimiento.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <Button
                size="lg"
                asChild
                className="btn-gradient w-full sm:w-auto h-14 px-8 text-base font-semibold rounded-lg"
              >
                <Link href="#agendar" className="flex items-center gap-2">
                  Solicitar diagnóstico
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="btn-outline-glow w-full sm:w-auto h-14 px-8 text-base font-medium rounded-lg"
              >
                <Link href="#servicios">Ver soluciones</Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {trustIndicators.map((stat, index) => (
                <motion.div
                  key={index}
                  className="rounded-xl border border-border/60 bg-card/70 px-4 py-4 text-left transition-all duration-300 hover:border-primary/30 hover:bg-card/90"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + index * 0.08, duration: 0.4 }}
                >
                  <div className="text-xl font-bold text-primary tabular-nums">{stat.value}</div>
                  <div className="text-sm font-medium text-foreground mt-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.sublabel}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {/* Glow behind card */}
            <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-primary/20 rounded-3xl scale-95" />

            <div className="relative mx-auto w-[360px] rounded-3xl border border-border/60 bg-card/85 backdrop-blur-md shadow-[0_24px_60px_oklch(0_0_0_/_0.32)] overflow-hidden">
              <div className="px-6 py-5 border-b border-border/60 bg-background/60">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Asistente Aurvox</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-xs text-primary">Operativo y disponible</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 py-5 space-y-3 min-h-[168px]">
                <AnimatePresence mode="sync">
                  {chatMessages.map((message, index) =>
                    shownMessages.includes(index) ? (
                      <motion.div
                        key={`msg-${index}`}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className={`max-w-[86%] px-4 py-3 rounded-xl text-sm leading-relaxed ${
                            message.type === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted/80 text-foreground border border-border/60'
                          }`}
                        >
                          {message.text}
                        </div>
                      </motion.div>
                    ) : null
                  )}

                  {showTyping && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
                      transition={{ duration: 0.25 }}
                    >
                      <TypingIndicator />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="px-5 pb-5">
                <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/70 px-4 py-3">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <MessageSquare className="w-4 h-4" />
                    Confirmación enviada al cliente
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-background via-background/85 to-transparent" />
    </section>
  )
}
