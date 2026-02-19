"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion/scroll-animations"

const faqs = [
  {
    question: "¿Cuánto tiempo toma implementar las soluciones?",
    answer: "La implementación típica toma entre 2 a 4 semanas, dependiendo de la complejidad de tu operación y las integraciones necesarias. Durante este tiempo, no interrumpimos tu operación normal y trabajamos de forma paralela a tu equipo.",
  },
  {
    question: "¿Necesito conocimientos técnicos para usar el sistema?",
    answer: "No. Nuestras soluciones están diseñadas para ser intuitivas y fáciles de usar. Además, proporcionamos capacitación completa a tu equipo y soporte continuo para asegurar que aproveches al máximo cada funcionalidad.",
  },
  {
    question: "¿Qué pasa si no estoy satisfecho con los resultados?",
    answer: "Ofrecemos garantía de satisfacción. Si en los primeros 30 días no ves los resultados prometidos según las métricas acordadas en el diagnóstico inicial, te devolvemos tu inversión sin preguntas.",
  },
  {
    question: "¿Cómo se integra con mis sistemas actuales?",
    answer: "Nos integramos con la mayoría de sistemas de punto de venta (TPV), plataformas de reservas y herramientas de gestión. Realizamos un análisis técnico previo para asegurar compatibilidad y diseñar la mejor estrategia de integración.",
  },
  {
    question: "¿Cuánto cuesta implementar estas soluciones?",
    answer: "El costo varía según las soluciones que necesites y el tamaño de tu operación. Agenda una demo gratuita y te daremos una cotización personalizada basada en tu operación específica, incluyendo el ROI estimado.",
  },
  {
    question: "¿Pueden manejar múltiples ubicaciones?",
    answer: "Sí. Nuestras soluciones están diseñadas para escalar. Podemos implementar en una ubicación piloto y luego expandir a todas tus sucursales con configuraciones centralizadas o personalizadas según tus necesidades.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="relative py-28 lg:py-36 section-gradient overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal variant="fadeUp" className="text-center mb-14">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full badge-premium mb-8">
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm font-medium text-foreground/90">FAQ</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            Preguntas <span className="gradient-text">frecuentes</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Resolvemos tus dudas más comunes sobre nuestras soluciones.
          </p>
        </ScrollReveal>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          <StaggerContainer staggerDelay={0.08}>
            {faqs.map((faq, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="rounded-2xl card-premium px-6 border-border/50 data-[state=open]:border-primary/40 transition-all duration-400"
                  >
                    <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary hover:no-underline py-6 gap-4 [&[data-state=open]>svg]:text-primary [&>svg]:text-muted-foreground [&>svg]:transition-colors">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20"
                          whileHover={{ rotate: 15, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <HelpCircle className="w-4 h-4 text-primary" />
                        </motion.div>
                        <span className="text-[15px] md:text-base">{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 pl-[52px] text-sm leading-relaxed">
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {faq.answer}
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Accordion>

        {/* Help CTA */}
        <ScrollReveal variant="fadeUp" delay={0.3} className="mt-14 text-center">
          <p className="text-muted-foreground mb-5 text-sm">
            ¿No encuentras lo que buscas?
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="#contacto"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline underline-offset-4 text-sm group"
            >
              Contáctanos directamente
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
