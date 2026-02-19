"use client"

import { QrCode, MessageCircle, BarChart3, Gift, Zap, Users, ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ScrollReveal, MagneticHover } from "@/components/motion/scroll-animations"

const products = [
  {
    id: "qr-codes",
    icon: QrCode,
    title: "QR Codes Inteligentes",
    shortTitle: "QR Codes",
    description: "Códigos QR dinámicos con tracking integrado. Genera códigos únicos por mesa y campaña, con branding personalizado y analíticas en tiempo real.",
    features: [
      "Generación ilimitada de QR codes",
      "Branding personalizado por restaurante",
      "Tracking por mesa y ubicación",
      "Analytics de escaneos en tiempo real",
    ],
    lightness: "0.90",
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    title: "WhatsApp Automation",
    shortTitle: "WhatsApp",
    description: "Confirmações instantâneas via WhatsApp con códigos de redención. Templates personalizados, multilenguaje y seguimiento automático.",
    features: [
      "Envío automático de códigos",
      "Templates personalizados",
      "Recordatorios automáticos",
      "Respuestas inteligentes con IA",
    ],
    lightness: "0.82",
  },
  {
    id: "ai-agent",
    icon: Zap,
    title: "Agente de IA Conversacional",
    shortTitle: "Agente IA",
    description: "Chatbot inteligente que responde consultas, ayuda con el canje de códigos y atiende a tus clientes 24/7 sin intervención humana.",
    features: [
      "Respuestas en < 3 segundos",
      "Consultas sobre menú y horarios",
      "Ayuda con canje de códigos",
      "Escalación a humano cuando es necesario",
    ],
    lightness: "0.74",
  },
  {
    id: "dashboard",
    icon: BarChart3,
    title: "Dashboard de Analytics",
    shortTitle: "Analytics",
    description: "Panel de control completo con métricas en tiempo real. Visualiza signups, canjes, tasas de conversión y el rendimiento de tus campañas.",
    features: [
      "Métricas en tiempo real",
      "Gráficos de conversión",
      "Exportación de contactos",
      "Reportes automatizados",
    ],
    lightness: "0.66",
  },
  {
    id: "spin-wheel",
    icon: Gift,
    title: "Spin Wheel (Ruleta)",
    shortTitle: "Spin Wheel",
    description: "Gamificación con ruleta de premios. Los clientes giran para descubrir su premio, aumentando el engagement y la diversión.",
    features: [
      "Ruleta personalizable",
      "Probabilidades configurables",
      "Múltiples premios por campaña",
      "Animaciones fluidas y atractivas",
    ],
    lightness: "0.58",
  },
  {
    id: "crm",
    icon: Users,
    title: "CRM Integrado",
    shortTitle: "CRM",
    description: "Base de datos completa de contactos con historial de interacciones, segmentación y gestión de campañas en un solo lugar.",
    features: [
      "Gestión de contactos",
      "Segmentación por tags",
      "Historial completo",
      "Integración con otras herramientas",
    ],
    lightness: "0.50",
  },
]

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const l = parseFloat(product.lightness)
  const cardBgL = l * 0.22
  const cardBgL2 = l * 0.15
  const borderL = l * 0.45
  const hoverBgL = l * 0.28
  const hoverBgL2 = l * 0.18
  const iconL = l * 0.80
  const dotL = l * 0.75

  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden backdrop-blur-sm"
      style={{
        background: `linear-gradient(135deg, oklch(${cardBgL} 0.003 50 / 0.4) 0%, oklch(${cardBgL2} 0.002 50 / 0.2) 100%)`,
        border: `1px solid oklch(${borderL} 0.003 50 / 0.25)`
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, oklch(${hoverBgL} 0.003 50 / 0.5) 0%, oklch(${hoverBgL2} 0.002 50 / 0.3) 100%)`
        }}
      />
      
      <div className="relative p-6 lg:p-8 h-full flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <div
            className="w-14 h-14 rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            style={{ border: `1px solid oklch(${borderL} 0.003 50 / 0.3)` }}
          >
            <product.icon
              className="w-7 h-7"
              style={{ color: `oklch(${iconL} 0.003 55)` }}
            />
          </div>
          
          <motion.button
            className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-4 h-4 text-foreground ml-0.5" />
          </motion.button>
        </div>

        <div className="flex-1 flex flex-col">
          <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-white transition-colors duration-300">
            {product.title}
          </h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
            {product.description}
          </p>

          <ul className="space-y-2 mb-6">
            {product.features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: `oklch(${dotL} 0.003 55)` }}
                />
                {feature}
              </li>
            ))}
          </ul>

          <Link 
            href="#agendar"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors group/link"
          >
            Conocer producto
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export function Products() {
  return (
    <section id="productos" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute inset-0 noise-overlay" />
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal variant="fadeUp" className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/90">Suite Tecnológica</span>
          </motion.div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Nuestra <span className="gradient-text">Suite OfertaCore</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Potencian la transformación digital de tu restaurante, promoviendo la interacción con tus clientes y optimizando tus procesos de captación.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <MagneticHover strength={0.1}>
            <Button
              size="lg"
              asChild
              className="btn-gradient h-14 px-8 text-base font-semibold rounded-xl"
            >
              <Link href="#agendar" className="flex items-center gap-2">
                Ver demo completa
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </MagneticHover>
        </motion.div>
      </div>
    </section>
  )
}
