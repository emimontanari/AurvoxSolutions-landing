"use client"

import Link from "next/link"
import { Sparkles, Linkedin, Twitter, Instagram, Mail, MapPin, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion/scroll-animations"

const footerLinks = {
  soluciones: [
    { label: "WhatsApp Inteligente", href: "#servicios" },
    { label: "Llamadas con IA", href: "#servicios" },
    { label: "Gestión de Reservas", href: "#servicios" },
    { label: "Dashboard Analytics", href: "#servicios" },
  ],
  empresa: [
    { label: "Sobre nosotros", href: "#" },
    { label: "Casos de éxito", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Carreras", href: "#" },
  ],
  soporte: [
    { label: "Centro de ayuda", href: "#" },
    { label: "Documentación", href: "#" },
    { label: "Contacto", href: "#contacto" },
    { label: "FAQ", href: "#faq" },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
]

export function Footer() {
  return (
    <footer id="contacto" className="relative overflow-hidden">
      {/* Top gradient divider with animation */}
      <motion.div
        className="section-divider"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
      />

      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] glow-bg-primary opacity-15"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-14">
          {/* Brand column */}
          <ScrollReveal variant="fadeUp" className="col-span-2">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Link href="/" className="flex items-center gap-3 mb-8 group">
                <motion.div
                  className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </motion.div>
                <div>
                  <span className="font-display font-semibold text-xl text-foreground block leading-none">Aura</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-[0.25em] mt-0.5 block">Solutions</span>
                </div>
              </Link>
            </motion.div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-xs">
              Transformamos restaurantes en negocios eficientes mediante automatización inteligente con IA.
            </p>

            {/* Contact info */}
            <div className="space-y-4 mb-8">
              <motion.a
                href="mailto:contacto@aurasolutions.ai"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-muted transition-colors duration-300 border border-border/50">
                  <Mail className="w-4 h-4" />
                </div>
                contacto@aurasolutions.ai
              </motion.a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center border border-border/50">
                  <MapPin className="w-4 h-4" />
                </div>
                Buenos Aires, Argentina
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-11 h-11 rounded-xl bg-muted/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/30 border border-border/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </ScrollReveal>

          {/* Links columns */}
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <h4 className="font-display font-semibold mb-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Soluciones
            </h4>
            <StaggerContainer staggerDelay={0.05}>
              <ul className="space-y-3.5">
                {footerLinks.soluciones.map((link) => (
                  <StaggerItem key={link.label}>
                    <li>
                      <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                        <Link
                          href={link.href}
                          className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-300 flex items-center gap-1 group"
                        >
                          {link.label}
                          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                        </Link>
                      </motion.div>
                    </li>
                  </StaggerItem>
                ))}
              </ul>
            </StaggerContainer>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <h4 className="font-display font-semibold mb-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Empresa
            </h4>
            <StaggerContainer staggerDelay={0.05}>
              <ul className="space-y-3.5">
                {footerLinks.empresa.map((link) => (
                  <StaggerItem key={link.label}>
                    <li>
                      <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                        <Link
                          href={link.href}
                          className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-300 flex items-center gap-1 group"
                        >
                          {link.label}
                          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                        </Link>
                      </motion.div>
                    </li>
                  </StaggerItem>
                ))}
              </ul>
            </StaggerContainer>
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.3}>
            <h4 className="font-display font-semibold mb-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Soporte
            </h4>
            <StaggerContainer staggerDelay={0.05}>
              <ul className="space-y-3.5">
                {footerLinks.soporte.map((link) => (
                  <StaggerItem key={link.label}>
                    <li>
                      <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                        <Link
                          href={link.href}
                          className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-300 flex items-center gap-1 group"
                        >
                          {link.label}
                          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                        </Link>
                      </motion.div>
                    </li>
                  </StaggerItem>
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
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-5">
            <p className="text-muted-foreground/70 text-sm">
              © {new Date().getFullYear()} Aura Solutions. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-8">
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link href="#" className="text-muted-foreground/70 hover:text-foreground text-sm transition-colors duration-300">
                  Política de Privacidad
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link href="#" className="text-muted-foreground/70 hover:text-foreground text-sm transition-colors duration-300">
                  Términos de Servicio
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
