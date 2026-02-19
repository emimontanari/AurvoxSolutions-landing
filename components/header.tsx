"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowRight } from "lucide-react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"

const navItems = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#faq", label: "FAQ" },
] as const

const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.22,
      ease: [0.25, 0.4, 0.25, 1] as const
    }
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.28,
      ease: [0.25, 0.4, 0.25, 1] as const
    }
  }
}

const navItemVariants = {
  closed: { opacity: 0, x: -8 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.2
    }
  })
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 120], [1, 0.99])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const headerClassName = useMemo(
    () =>
      `fixed top-4 left-4 right-4 z-50 rounded-2xl border transition-all duration-300 ${
        isScrolled
          ? 'glass-header border-border/80 py-2'
          : 'bg-background/70 backdrop-blur-md border-border/40 py-3'
      }`,
    [isScrolled]
  )

  return (
    <motion.header
      className={headerClassName}
      style={{ opacity: headerOpacity }}
      initial={{ y: -72 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.42, ease: [0.25, 0.4, 0.25, 1] as const }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <svg
              viewBox="0 0 100 100"
              className="w-20 h-20"
              fill="white"
            >
              <path d="M50 10 L90 90 L75 90 L65 70 L35 70 L25 90 L10 90 Z M42 55 L58 55 L50 38 Z" />
            </svg>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-lg text-foreground tracking-tight leading-none">
                Aurvox
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-0.5">
                Solutions
              </span>
            </div>
          </Link>

          <nav aria-label="Navegacion principal" className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + index * 0.06, duration: 0.35 }}
              >
                <Link
                  href={item.href}
                  className="relative px-5 py-2.5 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium group rounded-md"
                >
                  {item.label}
                  <motion.span
                    className="absolute bottom-1.5 left-5 right-5 h-px bg-primary origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            className="hidden lg:flex items-center gap-5"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.32, duration: 0.35 }}
          >
            <Link
              href="#contacto"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
            >
              Contacto
            </Link>
            <Button asChild className="btn-gradient h-11 px-6 rounded-lg text-sm font-semibold">
              <Link href="#agendar" className="flex items-center gap-2">
                Agendar reunión
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.button
            className="lg:hidden w-11 h-11 flex items-center justify-center text-foreground hover:bg-muted/50 rounded-lg transition-colors duration-200"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            type="button"
            whileTap={{ scale: 0.96 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -60, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 60, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 60, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -60, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden overflow-hidden"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <nav id="mobile-nav" aria-label="Navegacion movil" className="py-4 mt-4 border-t border-border/50">
                <div className="flex flex-col gap-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      custom={index}
                      variants={navItemVariants}
                      initial="closed"
                      animate="open"
                    >
                      <Link
                        href={item.href}
                        className="px-4 py-3.5 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all duration-200 text-sm font-medium rounded-lg block"
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  className="flex flex-col gap-3 pt-4 mt-4 border-t border-border/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    href="#contacto"
                    className="px-4 py-2.5 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
                    onClick={closeMenu}
                  >
                    Contacto
                  </Link>
                  <Button asChild className="btn-gradient mx-4 h-12 rounded-lg text-sm font-semibold">
                    <Link href="#agendar" onClick={closeMenu} className="flex items-center justify-center gap-2">
                      Agendar reunión
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
