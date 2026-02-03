"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowRight } from "lucide-react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { MagneticHover } from "@/components/motion/scroll-animations"

// Hoist static data outside component (rerender-memo)
const navItems = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#faq", label: "FAQ" },
] as const

// Hoist variants outside component (rendering-hoist-jsx)
const menuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.4, 0.25, 1] as const
    }
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.4, 0.25, 1] as const
    }
  }
}

const navItemVariants = {
  closed: { opacity: 0, x: -20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3
    }
  })
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.98])

  // Use passive event listener for scroll (client-passive-event-listeners)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Use useCallback for stable function references (rerender-functional-setstate)
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  // Memoize header className to avoid recalculation (rerender-derived-state)
  const headerClassName = useMemo(() => 
    `fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      isScrolled ? 'glass-header py-3' : 'bg-transparent py-5'
    }`,
    [isScrolled]
  )

  return (
    <motion.header
      className={headerClassName}
      style={{ opacity: headerOpacity }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <MagneticHover strength={0.1}>
            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              <motion.div
                className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-display text-xl font-bold text-primary-foreground tracking-tight">A</span>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20" />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-display font-semibold text-lg text-foreground tracking-tight leading-none">
                  Aura
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-0.5">
                  Solutions
                </span>
              </div>
            </Link>
          </MagneticHover>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
              >
                <Link
                  href={item.href}
                  className="relative px-5 py-2.5 text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium group"
                >
                  {item.label}
                  <motion.span
                    className="absolute bottom-1.5 left-5 right-5 h-px bg-primary origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <motion.div
            className="hidden lg:flex items-center gap-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link
              href="#contacto"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium"
            >
              Contacto
            </Link>
            <MagneticHover strength={0.15}>
              <Button
                asChild
                className="btn-gradient h-11 px-6 rounded-xl text-sm font-semibold"
              >
                <Link href="#agendar" className="flex items-center gap-2">
                  Agendar Demo
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </Button>
            </MagneticHover>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2.5 text-foreground hover:bg-muted/50 rounded-xl transition-colors duration-300"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden overflow-hidden"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <nav className="py-4 mt-4 border-t border-border/50">
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
                        className="px-4 py-3.5 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all duration-300 text-sm font-medium rounded-xl block"
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  className="flex flex-col gap-3 pt-4 mt-4 border-t border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    href="#contacto"
                    className="px-4 py-2.5 text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium"
                    onClick={closeMenu}
                  >
                    Contacto
                  </Link>
                  <Button
                    asChild
                    className="btn-gradient mx-4 h-12 rounded-xl text-sm font-semibold"
                  >
                    <Link href="#agendar" onClick={closeMenu} className="flex items-center justify-center gap-2">
                      Agendar Demo
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
