# New Features Implementation Plan

> **Goal:** Add high-impact features to the Aurvox Solutions landing page to increase credibility, reduce conversion friction, and improve engagement.

**Architecture:** All features are self-contained React components added to the existing single-page layout (`app/page.tsx`). No backend required — all interactive state is client-side with `"use client"`. New components follow the existing pattern: Framer Motion animations, Tailwind CSS v4, Radix UI primitives, dark theme with emerald primary (`oklch(0.4365 0.1044 156.7556)`).

**Tech Stack:** Next.js 16, React 19, Framer Motion, Tailwind CSS v4, Radix UI, Lucide React, TypeScript

**Insertion order in page.tsx:**
```
Header
Hero
ChallengesResults
Benefits
Services
AppetizerPromoSection
Process
WhyUs
[NEW] Testimonials       ← Task 1
[NEW] ROI Calculator     ← Task 2
[NEW] Integrations       ← Task 3
CTASection + [NEW] Contact Form embebido  ← Task 4
FAQ
Footer
[NEW] WhatsApp FAB       ← Task 5 (fixed, outside main flow)
```

---

## Task 1: Testimonials Section

**Files:**
- Create: `components/testimonials.tsx`
- Modify: `app/page.tsx` (add import + component after WhyUs)

**Design:** 3-column grid of cards. Each card has: comillas decorativas, quote text, avatar placeholder (initials in circle), nombre del restaurante, ciudad, resultado clave destacado en verde. Scroll reveal stagger animation. Badge superior "Clientes que confían en Aurvox".

**Component data:**
```ts
const testimonials = [
  {
    quote: "Implementamos el sistema de WhatsApp y en el primer mes dejamos de perder reservas los fines de semana. El bot maneja el 80% de las consultas solo.",
    name: "Martín Rodríguez",
    role: "Dueño",
    restaurant: "La Parrilla del Centro",
    city: "Buenos Aires",
    result: "+38% reservas confirmadas",
    initials: "MR",
  },
  {
    quote: "Lo que más me sorprendió fue la velocidad de implementación. En dos semanas ya estaba funcionando sin tocar mi operación normal.",
    name: "Carolina Vega",
    role: "Gerente de operaciones",
    restaurant: "Osteria Nonna",
    city: "Córdoba",
    result: "-45% no-shows",
    initials: "CV",
  },
  {
    quote: "El sistema de aperitivo con QR nos ayudó a captar más de 200 contactos nuevos en un mes. Ahora tenemos una base de datos real para remarketar.",
    name: "Diego Peralta",
    role: "Socio fundador",
    restaurant: "Fuegos Modernos",
    city: "Rosario",
    result: "+200 leads/mes",
    initials: "DP",
  },
]
```

**Step 1: Create `components/testimonials.tsx`**

```tsx
"use client"

import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion/scroll-animations"

const testimonials = [
  {
    quote: "Implementamos el sistema de WhatsApp y en el primer mes dejamos de perder reservas los fines de semana. El bot maneja el 80% de las consultas solo.",
    name: "Martín Rodríguez",
    role: "Dueño",
    restaurant: "La Parrilla del Centro",
    city: "Buenos Aires",
    result: "+38% reservas confirmadas",
    initials: "MR",
  },
  {
    quote: "Lo que más me sorprendió fue la velocidad de implementación. En dos semanas ya estaba funcionando sin tocar mi operación normal.",
    name: "Carolina Vega",
    role: "Gerente de operaciones",
    restaurant: "Osteria Nonna",
    city: "Córdoba",
    result: "-45% no-shows",
    initials: "CV",
  },
  {
    quote: "El sistema de aperitivo con QR nos ayudó a captar más de 200 contactos nuevos en un mes. Ahora tenemos una base de datos real para remarketar.",
    name: "Diego Peralta",
    role: "Socio fundador",
    restaurant: "Fuegos Modernos",
    city: "Rosario",
    result: "+200 leads/mes",
    initials: "DP",
  },
]

export function Testimonials() {
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal variant="fadeUp" className="text-center mb-16">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full badge-premium mb-8">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/90">Testimonios</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            Lo que dicen nuestros <span className="gradient-text">clientes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Más de 50 restaurantes ya transformaron su operación con Aurvox Solutions.
          </p>
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.12} className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="group h-full flex flex-col rounded-2xl card-premium p-7 hover:border-primary/40 transition-all duration-400"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <Quote className="w-8 h-8 text-primary/40 mb-5 shrink-0" />
                <p className="text-foreground/80 text-[15px] leading-relaxed mb-6 flex-1">
                  "{t.quote}"
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-6 self-start">
                  {t.result}
                </div>
                <div className="flex items-center gap-3 pt-5 border-t border-border/50">
                  <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-none">{t.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{t.role} · {t.restaurant}, {t.city}</p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
```

**Step 2: Add to `app/page.tsx`**

After the `WhyUs` dynamic import, add:
```ts
const Testimonials = dynamic(
  () => import("@/components/testimonials").then((mod) => mod.Testimonials),
  { ssr: true }
)
```
And in JSX after `<WhyUs />`:
```tsx
<Testimonials />
```

**Step 3: Commit**
```bash
git add components/testimonials.tsx app/page.tsx
git commit -m "feat: add testimonials section"
```

---

## Task 2: ROI Calculator

**Files:**
- Create: `components/roi-calculator.tsx`
- Modify: `app/page.tsx` (add after Testimonials)

**Design:** Card con fondo `card-premium`. Dos columnas: izquierda con inputs (sliders o number inputs), derecha con resultado animado. Inputs: mesas disponibles, ticket promedio (ARS), reservas actuales/semana, % no-shows actuales. Output: ingresos recuperados/mes estimados, ahorro en horas de trabajo, ROI proyectado. Nota disclaimer en pequeño: "Estimación basada en resultados promedio de clientes Aurvox."

**Cálculo:**
```
reservas_perdidas_mes = (mesas * 4 semanas * noshow_pct)
ingreso_recuperado = reservas_perdidas_mes * ticket_promedio
horas_ahorradas = mesas * 0.5 * 4 * 7 (estimado: 30min/reserva manual)
```

**Step 1: Create `components/roi-calculator.tsx`**

```tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calculator, TrendingUp, Clock, DollarSign } from "lucide-react"
import { ScrollReveal } from "@/components/motion/scroll-animations"

function formatARS(n: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n)
}

export function ROICalculator() {
  const [mesas, setMesas] = useState(20)
  const [ticket, setTicket] = useState(8000)
  const [noshow, setNoshow] = useState(15)

  const reservasPerdidas = Math.round(mesas * 4 * (noshow / 100))
  const ingresoRecuperado = reservasPerdidas * ticket
  const horasAhorradas = Math.round(mesas * 0.5 * 4)
  const roi = Math.round((ingresoRecuperado / 50000) * 100) // asumiendo costo aprox 50k ARS

  return (
    <section className="relative py-28 lg:py-36 section-gradient overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        <ScrollReveal variant="fadeUp" className="text-center mb-14">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full badge-premium mb-8">
            <Calculator className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground/90">Calculadora de impacto</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            ¿Cuánto estás <span className="gradient-text">dejando sobre la mesa?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ingresá los datos de tu restaurante y calculá el impacto real de automatizar.
          </p>
        </ScrollReveal>

        <motion.div
          className="rounded-2xl card-premium p-8 md:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Inputs */}
            <div className="space-y-7">
              <h3 className="font-display font-semibold text-foreground text-lg">Tu restaurante</h3>

              <SliderField
                label="Mesas disponibles"
                value={mesas}
                min={5} max={100} step={5}
                onChange={setMesas}
                display={`${mesas} mesas`}
              />
              <SliderField
                label="Ticket promedio por reserva"
                value={ticket}
                min={1000} max={50000} step={1000}
                onChange={setTicket}
                display={formatARS(ticket)}
              />
              <SliderField
                label="No-shows actuales"
                value={noshow}
                min={5} max={40} step={1}
                onChange={setNoshow}
                display={`${noshow}%`}
              />
            </div>

            {/* Results */}
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-foreground text-lg">Tu potencial de mejora</h3>

              <ResultCard
                icon={TrendingUp}
                label="Ingresos recuperados / mes"
                value={formatARS(ingresoRecuperado)}
                highlight
              />
              <ResultCard
                icon={Clock}
                label="Horas de trabajo ahorradas / mes"
                value={`~${horasAhorradas}h`}
              />
              <ResultCard
                icon={DollarSign}
                label="ROI estimado primer mes"
                value={`${roi}%`}
              />

              <p className="text-xs text-muted-foreground/60 leading-relaxed pt-2">
                * Estimación basada en resultados promedio de clientes Aurvox Solutions. Los resultados reales pueden variar según la operación.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SliderField({ label, value, min, max, step, onChange, display }: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  display: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-foreground/80">{label}</label>
        <AnimatePresence mode="wait">
          <motion.span
            key={display}
            className="text-sm font-bold text-primary tabular-nums"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-grab accent-primary"
      />
      <div className="flex justify-between text-xs text-muted-foreground/50 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

function ResultCard({ icon: Icon, label, value, highlight = false }: {
  icon: React.ElementType
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <motion.div
      className={`flex items-center gap-4 rounded-xl p-4 border transition-colors duration-300 ${
        highlight
          ? "bg-primary/10 border-primary/30"
          : "bg-muted/30 border-border/50"
      }`}
      layout
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
        highlight ? "bg-primary/20 border border-primary/30" : "bg-muted/50 border border-border/50"
      }`}>
        <Icon className={`w-5 h-5 ${highlight ? "text-primary" : "text-muted-foreground"}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <AnimatePresence mode="wait">
          <motion.p
            key={value}
            className={`text-xl font-bold tabular-nums ${highlight ? "text-primary" : "text-foreground"}`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2 }}
          >
            {value}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
```

**Step 2: Add to `app/page.tsx`** — dynamic import + `<ROICalculator />` after `<Testimonials />`

**Step 3: Commit**
```bash
git add components/roi-calculator.tsx app/page.tsx
git commit -m "feat: add interactive ROI calculator"
```

---

## Task 3: Integrations Section

**Files:**
- Create: `components/integrations.tsx`
- Modify: `app/page.tsx` (add after ROI Calculator)

**Design:** Fila de logos/badges de integraciones con nombre. Grid responsivo. Fondo oscuro con texto "Se integra con tus herramientas actuales". Cada integration: icono genérico o letra en un badge + nombre. Sin dependencias de imágenes externas — usar iniciales/colores propios.

**Integrations list:**
```ts
const integrations = [
  { name: "WhatsApp Business", color: "oklch(0.55 0.15 140)", initial: "W" },
  { name: "Google Calendar", color: "oklch(0.55 0.18 25)", initial: "G" },
  { name: "Make (Integromat)", color: "oklch(0.50 0.18 280)", initial: "M" },
  { name: "Zapier", color: "oklch(0.55 0.18 30)", initial: "Z" },
  { name: "PedidosYa", color: "oklch(0.55 0.18 15)", initial: "PY" },
  { name: "Rappi", color: "oklch(0.55 0.20 30)", initial: "R" },
  { name: "Notion", color: "oklch(0.75 0 0)", initial: "N" },
  { name: "Airtable", color: "oklch(0.55 0.18 215)", initial: "A" },
]
```

**Step 1: Create `components/integrations.tsx`** — grid de badges con `StaggerContainer`, texto descriptivo, nota "¿No ves tu herramienta? Consultanos."

**Step 2: Add to `app/page.tsx`**

**Step 3: Commit**
```bash
git add components/integrations.tsx app/page.tsx
git commit -m "feat: add integrations section"
```

---

## Task 4: Contact Form Section

**Files:**
- Create: `components/contact-form.tsx`
- Modify: `components/cta-section.tsx` (agregar referencia o dejar independiente)
- Modify: `app/page.tsx`

**Design:** Sección con dos columnas en desktop. Izquierda: texto motivador + bullet points de qué pasa después de enviar el form. Derecha: formulario con campos: Nombre, Restaurante, WhatsApp, Correo electrónico, "¿Cuál es tu mayor desafío?" (select con opciones). Submit button. Estado success con animación. Sin backend por ahora — el form abre WhatsApp con los datos pre-cargados en el mensaje, o usa mailto. Nota: comentar en código dónde conectar backend/Formspree en el futuro.

**WhatsApp link format:**
```ts
const msg = encodeURIComponent(
  `Hola Aurvox! Soy ${nombre} de ${restaurante}. Mi desafío principal: ${desafio}. WhatsApp: ${wapp}`
)
window.open(`https://wa.me/NUMERO?text=${msg}`, "_blank")
```

**Fields:**
- Nombre (text, required)
- Nombre del restaurante (text, required)
- WhatsApp (tel, required)
- Email (email, optional)
- Desafío principal (select): "Reservas perdidas" | "No-shows" | "Atención fuera de horario" | "Seguimiento de clientes" | "Otro"

**Step 1: Create `components/contact-form.tsx`** con react-hook-form + zod validation (ya instalados)

**Step 2: Add to `app/page.tsx`** — before CTASection or replace CTASection's secondary role

**Step 3: Commit**
```bash
git add components/contact-form.tsx app/page.tsx
git commit -m "feat: add embedded contact form"
```

---

## Task 5: WhatsApp Floating Action Button

**Files:**
- Create: `components/whatsapp-fab.tsx`
- Modify: `app/page.tsx` (outside `<main>`, before `<Footer />`)

**Design:** Botón fijo bottom-right. Verde WhatsApp (`#25D366`). Icono MessageCircle de lucide. Aparece con delay de 3s después de cargar la página (useEffect). Tooltip "Chateá con nosotros" al hover. Pulse animation. Link a `https://wa.me/NUMERO` (misma lógica que CTA existente — el número del negocio se actualiza cuando el cliente lo confirme). `target="_blank"`.

**Behavior:**
- Oculto los primeros 3 segundos
- Entrada con spring animation desde abajo
- Tooltip con AnimatePresence en hover

**Step 1: Create `components/whatsapp-fab.tsx`**

```tsx
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle } from "lucide-react"

export function WhatsAppFAB() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                className="bg-card border border-border/70 rounded-xl px-4 py-2.5 shadow-xl text-sm font-medium text-foreground whitespace-nowrap"
                initial={{ opacity: 0, x: 10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                Chateá con nosotros
              </motion.div>
            )}
          </AnimatePresence>

          <motion.a
            href="https://wa.me/5491100000000"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-black/30"
            style={{ backgroundColor: "#25D366" }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Pulse ring */}
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: "#25D366" }}
              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <MessageCircle className="w-7 h-7 text-white relative z-10" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

**Step 2: Add to `app/page.tsx`** — import `WhatsAppFAB` (NOT dynamic, must be client-only) and place it after `<Footer />` but inside the fragment.

Note: WhatsApp number placeholder is `5491100000000`. Update when client provides real number.

**Step 3: Update existing WhatsApp links** — `components/cta-section.tsx` line 89 also has a placeholder number. Both should use the same number when confirmed.

**Step 4: Commit**
```bash
git add components/whatsapp-fab.tsx app/page.tsx
git commit -m "feat: add WhatsApp floating action button"
```

---

## Notes for implementation

- **WhatsApp number:** Replace `5491100000000` in both `contact-form.tsx`, `whatsapp-fab.tsx`, and `cta-section.tsx` once confirmed by client.
- **Testimonials:** Content is illustrative. Replace with real client testimonials once available.
- **ROI Calculator:** ARS currency assumed (Argentine Pesos). If client serves other markets, make currency configurable.
- **Import pattern:** All new dynamic imports in `page.tsx` follow the existing pattern with `{ ssr: true }`.
- **Naming:** All files in English per AGENTS.md guidelines.
