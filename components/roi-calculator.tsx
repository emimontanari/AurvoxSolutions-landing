"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calculator, TrendingUp, Clock, DollarSign } from "lucide-react"
import Link from "next/link"
import { ScrollReveal } from "@/components/motion/scroll-animations"

function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n)
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
  minLabel,
  maxLabel,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  display: string
  minLabel?: string
  maxLabel?: string
}) {
  const id = label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <label htmlFor={id} className="text-sm font-medium text-foreground/80">{label}</label>
        <AnimatePresence mode="wait">
          <motion.span
            key={display}
            className="text-sm font-bold text-primary tabular-nums"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={display}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb:active]:scale-110"
      />
      <div className="flex justify-between text-[11px] text-muted-foreground/40 mt-1">
        <span>{minLabel ?? min}</span>
        <span>{maxLabel ?? max}</span>
      </div>
    </div>
  )
}

function ResultCard({
  icon: Icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ElementType
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <motion.div
      className={`flex items-center gap-4 rounded-xl p-4 border transition-colors duration-300 ${
        highlight
          ? "bg-primary/10 border-primary/30"
          : "bg-muted/25 border-border/50"
      }`}
      layout
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
          highlight
            ? "bg-primary/20 border-primary/30"
            : "bg-muted/50 border-border/50"
        }`}
      >
        <Icon
          className={`w-5 h-5 ${highlight ? "text-primary" : "text-muted-foreground"}`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <AnimatePresence mode="wait">
          <motion.p
            key={value}
            className={`text-xl font-bold tabular-nums ${
              highlight ? "text-primary" : "text-foreground"
            }`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.18 }}
          >
            {value}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export function ROICalculator() {
  const [mesas, setMesas] = useState(20)
  const [ticket, setTicket] = useState(45)
  const [noshow, setNoshow] = useState(15)

  const turnosPorDia = 2.2
  const diasAbiertoMes = 26
  const noShowRecuperable = 0.35
  const margenNeto = 0.65
  const minutosAhorradosPorReserva = 1.2
  const costoHoraOperativa = 18
  const costoPlataformaMensual = 399

  const reservasMes = mesas * turnosPorDia * diasAbiertoMes
  const reservasPerdidasMes = reservasMes * (noshow / 100)
  const reservasRecuperadas = reservasPerdidasMes * noShowRecuperable

  const ingresoRecuperadoNeto = reservasRecuperadas * ticket * margenNeto
  const horasAhorradas = (reservasMes * minutosAhorradosPorReserva) / 60
  const ahorroOperativo = horasAhorradas * costoHoraOperativa
  const mejoraTotal = ingresoRecuperadoNeto + ahorroOperativo
  const gananciaNeta = mejoraTotal - costoPlataformaMensual
  const roi = Math.round((gananciaNeta / costoPlataformaMensual) * 100)

  return (
    <section className="relative py-28 lg:py-36 section-gradient overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute inset-0 noise-overlay" />

      {/* Ambient glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[100px]" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <ScrollReveal variant="fadeUp" className="text-center mb-14">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full badge-premium mb-8">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Calculator className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm font-medium text-foreground/90">Calculadora de impacto</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            ¿Cuánto estás{" "}
            <span className="gradient-text">dejando sobre la mesa?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ingresá los datos de tu restaurante y calculá el impacto real de automatizar.
          </p>
        </ScrollReveal>

        <motion.div
          className="rounded-2xl card-premium p-8 md:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Inputs */}
            <div className="space-y-7">
              <h3 className="font-display font-semibold text-foreground text-lg">
                Tu restaurante
              </h3>

              <SliderField
                label="Mesas disponibles"
                value={mesas}
                min={5}
                max={100}
                step={5}
                onChange={setMesas}
                display={`${mesas} mesas`}
              />
              <SliderField
                label="Ticket promedio por reserva"
                value={ticket}
                min={15}
                max={300}
                step={5}
                onChange={setTicket}
                display={formatUSD(ticket)}
                minLabel="$15"
                maxLabel="$300"
              />
              <SliderField
                label="No-shows actuales"
                value={noshow}
                min={5}
                max={40}
                step={1}
                onChange={setNoshow}
                display={`${noshow}%`}
              />
            </div>

            {/* Results */}
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-foreground text-lg">
                Tu potencial de mejora
              </h3>

              <ResultCard
                icon={TrendingUp}
                label="Ganancia neta estimada / mes"
                value={formatUSD(gananciaNeta)}
                highlight
              />
              <ResultCard
                icon={Clock}
                label="Horas de trabajo ahorradas / mes"
                value={`~${Math.round(horasAhorradas)}h`}
              />
              <ResultCard
                icon={DollarSign}
                label="ROI estimado primer mes"
                value={`${roi}%`}
              />

              <p className="text-xs text-muted-foreground/50 leading-relaxed pt-2">
                * Estimación en USD basada en reservas mensuales, reducción parcial de no-shows,
                margen neto y ahorro operativo. Los resultados reales pueden variar según la operación.
              </p>

              <Link
                href="#agendar"
                className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-primary hover:underline underline-offset-4 transition-colors"
              >
                Quiero estos resultados
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
