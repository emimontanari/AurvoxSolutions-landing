"use client"

import { MessageSquare, Phone, Calendar, ArrowRight, Bot, Headphones, BarChart3, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ScrollReveal, StaggerContainer, StaggerItem, MagneticHover } from "@/components/motion/scroll-animations"

const services = [
  {
    number: "01",
    icon: MessageSquare,
    accentIcon: Bot,
    title: "WhatsApp Inteligente",
    description: "Atención automatizada por WhatsApp que responde consultas, toma reservas y hace seguimiento a clientes potenciales. Funciona 24/7 sin intervención humana.",
    features: [
      "Respuestas instantáneas a consultas frecuentes",
      "Toma de reservas automática",
      "Seguimiento a clientes interesados",
      "Integración con tu sistema actual",
    ],
    stats: { value: "95%", label: "Tasa de respuesta" },
  },
  {
    number: "02",
    icon: Phone,
    accentIcon: Headphones,
    title: "Llamadas con IA",
    description: "Un agente de voz con IA que contesta llamadas, gestiona reservas y resuelve dudas. Tu restaurante nunca pierde una llamada importante.",
    features: [
      "Atención telefónica 24/7",
      "Reservas por voz automatizadas",
      "Transferencia a humano cuando es necesario",
      "Reportes de llamadas y métricas",
    ],
    stats: { value: "0", label: "Llamadas perdidas" },
  },
  {
    number: "03",
    icon: Calendar,
    accentIcon: BarChart3,
    title: "Gestión de Reservas",
    description: "Sistema inteligente que optimiza tu ocupación, reduce no-shows con confirmaciones automáticas y maximiza tus mesas disponibles.",
    features: [
      "Confirmaciones automáticas por WhatsApp",
      "Recordatorios pre-reserva",
      "Lista de espera inteligente",
      "Dashboard de ocupación en tiempo real",
    ],
    stats: { value: "-40%", label: "Reducción de no-shows" },
  },
]

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95])

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale }}
      className="group rounded-3xl card-premium overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left content */}
        <div className="lg:w-1/2 p-8 md:p-10 lg:p-12">
          {/* Service number and icon */}
          <div className="flex items-center gap-5 mb-8">
            <motion.span
              className="font-display text-6xl lg:text-7xl font-bold text-foreground/[0.04] group-hover:text-primary/10 transition-colors duration-500"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {service.number}
            </motion.span>
            <div className="relative">
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/25 group-hover:from-primary/30 group-hover:to-primary/10 group-hover:border-primary/40 transition-all duration-400 shadow-lg"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <service.icon className="w-8 h-8 text-primary" />
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-accent/15 flex items-center justify-center border border-accent/25"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <service.accentIcon className="w-4 h-4 text-accent" />
              </motion.div>
            </div>
          </div>

          {/* Title and description */}
          <motion.h3
            className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-5 group-hover:text-primary transition-colors duration-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {service.title}
          </motion.h3>
          <motion.p
            className="text-muted-foreground leading-relaxed mb-8 text-[15px]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {service.description}
          </motion.p>

          {/* Stats highlight */}
          <motion.div
            className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl bg-primary/8 border border-primary/20 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring" }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              className="font-display text-3xl font-bold text-primary tabular-nums"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              {service.stats.value}
            </motion.span>
            <span className="text-sm text-muted-foreground">{service.stats.label}</span>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <MagneticHover strength={0.1}>
              <Button
                asChild
                className="btn-gradient h-12 px-6 rounded-xl font-semibold"
              >
                <Link href="#agendar" className="flex items-center gap-2">
                  Saber más
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </Button>
            </MagneticHover>
          </motion.div>
        </div>

        {/* Right content - Features */}
        <div className="lg:w-1/2 p-8 md:p-10 lg:p-12 bg-foreground/[0.015]">
          <div className="h-full flex flex-col">
            <motion.h4
              className="text-xs font-semibold text-muted-foreground mb-8 uppercase tracking-[0.2em]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Incluye
            </motion.h4>
            <ul className="space-y-5 flex-1">
              {service.features.map((feature, featureIndex) => (
                <motion.li
                  key={featureIndex}
                  className="flex items-start gap-4 group/item"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + featureIndex * 0.1 }}
                >
                  <motion.div
                    className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-primary/20 transition-colors duration-300 border border-primary/20"
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </motion.div>
                  <span className="text-foreground/70 text-[15px] leading-relaxed">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Services() {
  return (
    <section id="servicios" className="relative py-28 lg:py-36 section-gradient overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal variant="fadeUp" className="text-center mb-20">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full badge-premium mb-8">
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm font-medium text-foreground/90">Soluciones</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            Nuestras <span className="gradient-text">soluciones de IA</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tecnología diseñada específicamente para las necesidades de restaurantes.
          </p>
        </ScrollReveal>

        {/* Services cards */}
        <div className="space-y-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
