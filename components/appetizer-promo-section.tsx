"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  QrCode,
  FileText,
  Database,
  MessageCircle,
  Gift,
  TrendingUp,
  Clock,
  ShieldCheck,
  Target,
} from "lucide-react"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion/scroll-animations"

const flow = [
  {
    icon: QrCode,
    title: "QR en mesa",
    description: "Cada mesa capta clientes escaneando una oferta de aperitivo gratis.",
  },
  {
    icon: FileText,
    title: "Formulario rápido",
    description: "Datos clave en menos de 60 segundos, optimizado para móvil.",
  },
  {
    icon: Database,
    title: "Contacto al CRM",
    description: "El lead entra automáticamente con tags, código y trazabilidad.",
  },
  {
    icon: MessageCircle,
    title: "Confirmación inmediata",
    description: "Envío por WhatsApp/SMS con código de canje en menos de 2 minutos.",
  },
] as const

const outcomes = [
  {
    icon: TrendingUp,
    value: "Más contactos",
    detail: "Convierte tráfico presencial en base de datos accionable.",
  },
  {
    icon: Clock,
    value: "Menos fricción",
    detail: "Proceso ágil sin carga operativa para el equipo de sala.",
  },
  {
    icon: Gift,
    value: "Más redenciones",
    detail: "Oferta irresistible con seguimiento automático hasta el canje.",
  },
  {
    icon: ShieldCheck,
    value: "Control total",
    detail: "Métricas de escaneo, registro y redención en tiempo real.",
  },
] as const

const trust = [
  "Implementación sin interrumpir la operación",
  "Mensajería automática y configurable por campaña",
  "Segmentación de leads para remarketing",
  "Arquitectura escalable para una o múltiples sucursales",
] as const

export function AppetizerPromoSection() {
  return (
    <section id="producto-appetizer" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 section-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal variant="fadeUp" className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full badge-premium mb-7">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/90">Producto destacado</span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Sistema de Captación con <span className="gradient-text">Aperitivo Gratis</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Convierte clientes en mesa en contactos reales de CRM con un flujo simple y automático.
            Cada escaneo abre una oportunidad de venta futura para tu restaurante.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 mb-12">
          <ScrollReveal variant="slideLeft" className="lg:col-span-7">
            <div className="card-premium rounded-2xl p-7 md:p-8">
              <h3 className="font-display text-2xl font-semibold text-foreground mb-6">Cómo funciona</h3>

              <StaggerContainer staggerDelay={0.08} className="space-y-4">
                {flow.map((step, index) => (
                  <StaggerItem key={step.title}>
                    <div className="flex items-start gap-4 rounded-xl border border-border/60 bg-background/35 p-4">
                      <div className="w-11 h-11 rounded-lg bg-primary/12 border border-primary/30 flex items-center justify-center shrink-0">
                        <step.icon className="w-5 h-5 text-primary" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="text-xs font-semibold text-primary/80 tracking-[0.15em]">PASO {index + 1}</span>
                          <div className="h-px flex-1 bg-border/70" />
                        </div>
                        <p className="text-base font-semibold text-foreground">{step.title}</p>
                        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slideRight" className="lg:col-span-5">
            <div className="card-premium rounded-2xl p-7 md:p-8 h-full flex flex-col">
              <h3 className="font-display text-2xl font-semibold text-foreground mb-6">Por qué te conviene</h3>

              <div className="space-y-3.5 mb-7">
                {trust.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-md bg-primary/15 border border-primary/30 mt-0.5" />
                    <p className="text-sm text-foreground/85 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-primary/30 bg-primary/10 p-5 mb-7">
                <p className="text-xs uppercase tracking-[0.16em] text-primary/85 font-semibold mb-2">Impacto esperado</p>
                <p className="text-sm text-foreground/85 leading-relaxed">
                  Más captación, más recurrencia y más visibilidad sobre el rendimiento de tus campañas,
                  todo desde una solución lista para operar.
                </p>
              </div>

              <div className="mt-auto">
                <Button asChild className="btn-gradient h-12 px-6 rounded-lg text-sm font-semibold w-full sm:w-auto">
                  <Link href="#agendar" className="flex items-center justify-center gap-2">
                    Quiero este sistema en mi restaurante
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <StaggerContainer staggerDelay={0.08} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {outcomes.map((item) => (
            <StaggerItem key={item.value}>
              <div className="rounded-xl border border-border/60 bg-card/70 p-5 h-full">
                <div className="w-10 h-10 rounded-lg bg-primary/12 border border-primary/30 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-base font-semibold text-foreground mb-1.5">{item.value}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
