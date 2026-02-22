"use client"

import Link from "next/link"
import { Linkedin, Twitter, Instagram, Mail, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { ScrollReveal, StaggerContainer, staggerItemVariants } from "@/components/motion/scroll-animations"

const footerLinks = {
  soluciones: [
    { label: "WhatsApp Inteligente", href: "#servicios" },
    { label: "Llamadas con IA", href: "#servicios" },
    { label: "Gestión de Reservas", href: "#servicios" },
    { label: "Dashboard Analytics", href: "#servicios" },
  ],
  empresa: [
    { label: "Sobre nosotros", href: "#proceso" },
    { label: "Casos de éxito", href: "#beneficios" },
    { label: "Blog", href: "#faq" },
    { label: "Carreras", href: "#contacto" },
  ],
  soporte: [
    { label: "Centro de ayuda", href: "#faq" },
    { label: "Documentación", href: "#servicios" },
    { label: "Contacto", href: "#contacto" },
    { label: "FAQ", href: "#faq" },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com", label: "Twitter" },
  { icon: Instagram, href: "https://www.instagram.com", label: "Instagram" },
]

function AurvoxMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M50 10 L90 90 L75 90 L65 70 L35 70 L25 90 L10 90 Z M42 55 L58 55 L50 38 Z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer id="contacto" className="relative overflow-hidden">
      <div className="section-divider" />
      <div className="absolute inset-0 bg-background" />

      {/* Ambient glow */}
      <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[480px] h-[180px] rounded-full bg-primary/6 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-14">

          {/* Brand column */}
          <ScrollReveal variant="fadeUp" className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-8 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/16 group-hover:border-primary/40 shrink-0">
                <AurvoxMark className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="font-display font-semibold text-xl text-foreground block leading-none">
                  Aurvox
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.25em] mt-0.5 block">
                  Solutions
                </span>
              </div>
            </Link>

            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-xs">
              Soluciones de automatización con IA para mejorar eficiencia operativa,
              experiencia del cliente y rentabilidad en restaurantes.
            </p>

            <div className="space-y-4 mb-8">
              <a
                href="mailto:contacto@aurvox.ai"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-muted/45 flex items-center justify-center group-hover:bg-muted transition-colors duration-200 border border-border/50">
                  <Mail className="w-4 h-4" />
                </div>
                contacto@aurvox.ai
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-9 h-9 rounded-lg bg-muted/45 flex items-center justify-center border border-border/50">
                  <MapPin className="w-4 h-4" />
                </div>
                Buenos Aires, Argentina
              </div>
            </div>

            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg bg-muted/35 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/55 border border-border/50 transition-all duration-200"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </ScrollReveal>

          {/* Link columns */}
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <h4 className="font-display font-semibold mb-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Soluciones
            </h4>
            <StaggerContainer staggerDelay={0.04}>
              <ul className="space-y-3.5">
                {footerLinks.soluciones.map((link) => (
                  <motion.li key={link.label} variants={staggerItemVariants}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </StaggerContainer>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <h4 className="font-display font-semibold mb-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Empresa
            </h4>
            <StaggerContainer staggerDelay={0.04}>
              <ul className="space-y-3.5">
                {footerLinks.empresa.map((link) => (
                  <motion.li key={link.label} variants={staggerItemVariants}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </StaggerContainer>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.3}>
            <h4 className="font-display font-semibold mb-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Soporte
            </h4>
            <StaggerContainer staggerDelay={0.04}>
              <ul className="space-y-3.5">
                {footerLinks.soporte.map((link) => (
                  <motion.li key={link.label} variants={staggerItemVariants}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 items-center text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </StaggerContainer>
          </ScrollReveal>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-border/50 mt-16 pt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.45 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-5">
            <div className="flex items-center gap-2.5">
              <AurvoxMark className="w-3.5 h-3.5 text-primary/50" />
              <p className="text-muted-foreground/70 text-sm">
                © {new Date().getFullYear()} Aurvox Solutions. Todos los derechos reservados.
              </p>
            </div>
            <div className="flex items-center gap-8">
              <Link
                href="/privacidad"
                className="text-muted-foreground/70 hover:text-foreground text-sm transition-colors duration-200"
              >
                Política de Privacidad
              </Link>
              <Link
                href="#faq"
                className="text-muted-foreground/70 hover:text-foreground text-sm transition-colors duration-200"
              >
                Términos de Servicio
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
