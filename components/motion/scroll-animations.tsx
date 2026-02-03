"use client"

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { useRef, ReactNode } from "react"

/* ===========================================
   PREMIUM SCROLL ANIMATION SYSTEM
   Professional, refined motion design
   =========================================== */

// Spring configuration for smooth, premium feel
const smoothSpring = { stiffness: 100, damping: 30, restDelta: 0.001 }
const snappySpring = { stiffness: 300, damping: 30, restDelta: 0.001 }

// Animation variants for different reveal styles
export const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(10px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1] as const
    }
  }
}

export const fadeInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(8px)"
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as const
    }
  }
}

export const slideInLeftVariants = {
  hidden: {
    opacity: 0,
    x: -60,
    filter: "blur(10px)"
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1] as const
    }
  }
}

export const slideInRightVariants = {
  hidden: {
    opacity: 0,
    x: 60,
    filter: "blur(10px)"
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1] as const
    }
  }
}

export const scaleUpVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    filter: "blur(12px)"
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as const
    }
  }
}

// Stagger container for orchestrated reveals
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
}

export const staggerItemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(8px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as const
    }
  }
}

// ====================================
// SCROLL-TRIGGERED REVEAL COMPONENT
// ====================================
interface ScrollRevealProps {
  children: ReactNode
  className?: string
  variant?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scaleUp"
  delay?: number
  duration?: number
  once?: boolean
  threshold?: number
}

export function ScrollReveal({
  children,
  className = "",
  variant = "fadeUp",
  delay = 0,
  duration,
  once = true,
  threshold = 0.2
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const variants = {
    fadeUp: fadeUpVariants,
    fadeIn: fadeInVariants,
    slideLeft: slideInLeftVariants,
    slideRight: slideInRightVariants,
    scaleUp: scaleUpVariants
  }

  const selectedVariant = variants[variant]

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={selectedVariant}
      className={className}
      style={{
        transitionDelay: `${delay}s`,
      }}
      transition={duration ? { duration } : undefined}
    >
      {children}
    </motion.div>
  )
}

// ====================================
// STAGGER CONTAINER COMPONENT
// ====================================
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
  threshold?: number
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
  threshold = 0.1
}: StaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ====================================
// STAGGER ITEM COMPONENT
// ====================================
interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  return (
    <motion.div
      variants={staggerItemVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ====================================
// PARALLAX SECTION COMPONENT
// ====================================
interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number // -1 to 1, negative = slower, positive = faster
}

export function ParallaxSection({
  children,
  className = "",
  speed = 0.3
}: ParallaxSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])
  const smoothY = useSpring(y, smoothSpring)

  return (
    <motion.div
      ref={ref}
      style={{ y: smoothY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ====================================
// FLOATING ELEMENT COMPONENT
// ====================================
interface FloatingElementProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  distance?: number
}

export function FloatingElement({
  children,
  className = "",
  delay = 0,
  duration = 4,
  distance = 15
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance/2, distance/2, -distance/2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay
      }}
    >
      {children}
    </motion.div>
  )
}

// ====================================
// MAGNETIC HOVER COMPONENT
// ====================================
interface MagneticHoverProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticHover({
  children,
  className = "",
  strength = 0.3
}: MagneticHoverProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.3s cubic-bezier(0.25, 0.4, 0.25, 1)' }}
    >
      {children}
    </motion.div>
  )
}

// ====================================
// TEXT REVEAL COMPONENT
// ====================================
interface TextRevealProps {
  text: string
  className?: string
  once?: boolean
  threshold?: number
}

export function TextReveal({
  text,
  className = "",
  once = true,
  threshold = 0.5
}: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const words = text.split(" ")

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ display: 'inline-block' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={isInView ? {
            opacity: 1,
            y: 0,
            filter: "blur(0px)"
          } : {
            opacity: 0,
            y: 20,
            filter: "blur(8px)"
          }}
          transition={{
            duration: 0.4,
            delay: i * 0.05,
            ease: [0.25, 0.4, 0.25, 1]
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

// ====================================
// COUNTER ANIMATION COMPONENT
// ====================================
interface AnimatedCounterProps {
  value: number | string
  className?: string
  duration?: number
  prefix?: string
  suffix?: string
}

export function AnimatedCounter({
  value,
  className = "",
  duration = 2,
  prefix = "",
  suffix = ""
}: AnimatedCounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  // Handle string values like "24/7" or "4.8"
  const numericValue = typeof value === 'string'
    ? parseFloat(value.replace(/[^0-9.-]/g, '')) || 0
    : value

  const count = useSpring(0, { duration: duration * 1000 })

  if (isInView) {
    count.set(numericValue)
  }

  const displayValue = useTransform(count, (latest: number) => {
    if (typeof value === 'string' && value.includes('/')) {
      return value // Return as-is for values like "24/7"
    }
    if (typeof value === 'string' && value.includes('.')) {
      return latest.toFixed(1)
    }
    return String(Math.round(latest))
  })

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </motion.span>
  )
}

// ====================================
// GLOW ON SCROLL COMPONENT
// ====================================
interface GlowOnScrollProps {
  children: ReactNode
  className?: string
  glowColor?: string
}

export function GlowOnScroll({
  children,
  className = "",
  glowColor = "oklch(0.78 0.14 75 / 0.3)"
}: GlowOnScrollProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.5])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1])

  return (
    <motion.div ref={ref} className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        style={{
          opacity,
          scale,
          background: `radial-gradient(ellipse at center, ${glowColor}, transparent 70%)`,
          filter: 'blur(40px)',
          zIndex: -1
        }}
      />
      {children}
    </motion.div>
  )
}

// ====================================
// SCROLL PROGRESS INDICATOR
// ====================================
interface ScrollProgressProps {
  className?: string
}

export function ScrollProgress({ className = "" }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary to-accent origin-left z-[100] ${className}`}
      style={{ scaleX }}
    />
  )
}

// ====================================
// SECTION TRANSITION COMPONENT
// ====================================
interface SectionTransitionProps {
  children: ReactNode
  className?: string
}

export function SectionTransition({ children, className = "" }: SectionTransitionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.98])

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
