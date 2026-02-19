"use client"

import { motion } from "framer-motion"
import { useState, useRef } from "react"
import { Link2, Sparkles } from "lucide-react"
import { ScrollReveal } from "@/components/motion/scroll-animations"

const integrations = [
  { name: "WhatsApp Business", src: "/Icono WhatsApp.svg",                bg: "#FFFFFF" },
  { name: "Meta Platform",      src: "/meta.svg",                          bg: "#FFFFFF" },
  { name: "Instagram",          src: "/Icono de Instagram.svg",            bg: "#FFFFFF" },
  { name: "Messenger",          src: "/Biblioteca SVG Logos (2).svg",      bg: "#FFFFFF" },
  { name: "Gmail",              src: "/Logos SVG Bonitos.svg",             bg: "#FFFFFF" },
  { name: "Google Meet",        src: "/Biblioteca de logotipos SVG (1).svg", bg: "#FFFFFF" },
  { name: "Microsoft Teams",    src: "/Microsoft Teams Logo.svg",          bg: "#FFFFFF" },
  { name: "Shopify",            src: "/Logos SVG de Svgl.svg",             bg: "#FFFFFF" },
  { name: "n8n",                src: "/Logos SVG.svg",                     bg: "#FFFFFF" },
  { name: "OpenAI",             src: "/Logo OpenAI.svg",                   bg: "#000000" },
  { name: "Notion",             src: "/Biblioteca SVG Logos (1).svg",      bg: "#191919" },
  { name: "TikTok",             src: "/Icono TikTok oscuro.svg",           bg: "#000000" },
] as const

const duplicatedIntegrations = [...integrations, ...integrations]

export function Integrations() {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 dot-pattern opacity-15" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal variant="fadeUp" className="text-center mb-14">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full badge-premium mb-8">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Link2 className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm font-medium text-foreground/90">Integraciones</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            Se integra con tus{" "}
            <span className="gradient-text">herramientas actuales</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Aurvox conecta con los sistemas que ya usás. Sin fricciones, sin reemplazar lo que funciona.
          </p>
        </ScrollReveal>

        {/* Infinite carousel */}
        <div
          className="relative overflow-hidden mb-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          ref={containerRef}
        >
          {/* Edge fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6"
            animate={{ x: [0, `-${integrations.length * 136 / 2}px`] }}
            transition={{
              x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" },
            }}
            style={{ animationPlayState: isHovered ? "paused" : "running" }}
          >
            {duplicatedIntegrations.map((item, index) => (
              <motion.div
                key={`${item.name}-${index}`}
                className="flex-shrink-0 group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 cursor-default w-28">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg overflow-hidden"
                    style={{ backgroundColor: item.bg }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="w-9 h-9 object-contain"
                    />
                  </div>
                  <span className="text-[10px] text-center text-muted-foreground group-hover:text-foreground transition-colors duration-200 leading-tight font-medium line-clamp-2">
                    {item.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <ScrollReveal variant="fadeUp" delay={0.3} className="text-center">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border border-border/60 bg-muted/30 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            ¿No ves tu herramienta?{" "}
            <a
              href="#contacto"
              className="text-primary font-medium hover:underline underline-offset-4 transition-colors"
            >
              Consultanos
            </a>
            — integramos con casi cualquier sistema.
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
