"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Send, MessageSquare, Clock, Shield } from "lucide-react"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 360 362" aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M307.546 52.566C273.709 18.684 228.706.017 180.756 0 81.951 0 1.538 80.404 1.504 179.235c-.017 31.594 8.242 62.432 23.928 89.609L0 361.736l95.024-24.925c26.179 14.285 55.659 21.805 85.655 21.814h.077c98.788 0 179.21-80.413 179.244-179.244.017-47.898-18.608-92.926-52.454-126.807v-.008Zm-126.79 275.788h-.06c-26.73-.008-52.952-7.194-75.831-20.765l-5.44-3.231-56.391 14.791 15.05-54.981-3.542-5.638c-14.912-23.721-22.793-51.139-22.776-79.286.035-82.14 66.867-148.973 149.051-148.973 39.793.017 77.198 15.53 105.328 43.695 28.131 28.157 43.61 65.596 43.593 105.398-.035 82.149-66.867 148.982-148.982 148.982v.008Zm81.719-111.577c-4.478-2.243-26.497-13.073-30.606-14.568-4.108-1.496-7.09-2.243-10.073 2.243-2.982 4.487-11.568 14.577-14.181 17.559-2.613 2.991-5.226 3.361-9.704 1.117-4.477-2.243-18.908-6.97-36.02-22.226-13.313-11.878-22.304-26.54-24.916-31.027-2.613-4.486-.275-6.91 1.959-9.136 2.011-2.011 4.478-5.234 6.721-7.847 2.244-2.613 2.983-4.486 4.478-7.469 1.496-2.991.748-5.603-.369-7.847-1.118-2.243-10.073-24.289-13.812-33.253-3.636-8.732-7.331-7.546-10.073-7.692-2.613-.13-5.595-.155-8.586-.155-2.991 0-7.839 1.118-11.947 5.604-4.108 4.486-15.677 15.324-15.677 37.361s16.047 43.344 18.29 46.335c2.243 2.991 31.585 48.225 76.51 67.632 10.684 4.615 19.029 7.374 25.535 9.437 10.727 3.412 20.49 2.931 28.208 1.779 8.604-1.289 26.498-10.838 30.228-21.298 3.73-10.46 3.73-19.433 2.613-21.298-1.117-1.865-4.108-2.991-8.586-5.234l.008-.017Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
import { Button } from "@/components/ui/button"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion/scroll-animations"

const schema = z.object({
  nombre: z.string().min(2, "Ingresá tu nombre"),
  restaurante: z.string().min(2, "Ingresá el nombre de tu restaurante"),
  whatsapp: z.string().min(8, "Ingresá un número válido"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  desafio: z.enum([
    "reservas-perdidas",
    "no-shows",
    "atencion-fuera-horario",
    "seguimiento-clientes",
    "otro",
  ], { required_error: "Seleccioná tu desafío principal" }),
})

type FormData = z.infer<typeof schema>

const desafioLabels: Record<FormData["desafio"], string> = {
  "reservas-perdidas": "Reservas perdidas",
  "no-shows": "Muchos no-shows",
  "atencion-fuera-horario": "Atención fuera de horario",
  "seguimiento-clientes": "Seguimiento de clientes",
  "otro": "Otro",
}

const benefits = [
  { icon: Clock, text: "Respondemos en menos de 24 horas" },
  { icon: Shield, text: "Sin compromiso ni presión de venta" },
  { icon: MessageSquare, text: "Te contactamos por el canal que prefieras" },
]

// WhatsApp number — update when confirmed by client
const WA_NUMBER = "5491100000000"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    const desafioLabel = desafioLabels[data.desafio]
    const msg = encodeURIComponent(
      `Hola Aurvox! Soy ${data.nombre} de *${data.restaurante}*.\n\n` +
      `Mi desafío principal: ${desafioLabel}\n` +
      `WhatsApp: ${data.whatsapp}` +
      (data.email ? `\nEmail: ${data.email}` : "")
    )
    setSubmitted(true)
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank")
  }

  return (
    <section id="contacto-form" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 section-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Left — context */}
          <ScrollReveal variant="slideLeft">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full badge-premium mb-8">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground/90">Contacto directo</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.1]">
              Hablemos sobre{" "}
              <span className="gradient-text">tu restaurante</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Completá el formulario y te contactamos para entender tu operación y
              ver si Aurvox es la solución que necesitás.
            </p>

            <StaggerContainer staggerDelay={0.1} className="space-y-4 mb-10">
              {benefits.map((b, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <b.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-foreground/80 font-medium">{b.text}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
                Qué pasa después
              </p>
              <ol className="space-y-1.5 text-sm text-foreground/75">
                <li className="flex gap-2"><span className="text-primary font-bold shrink-0">1.</span> Recibís un WhatsApp nuestro en menos de 24h</li>
                <li className="flex gap-2"><span className="text-primary font-bold shrink-0">2.</span> Coordinamos una llamada de diagnóstico (30 min)</li>
                <li className="flex gap-2"><span className="text-primary font-bold shrink-0">3.</span> Te entregamos una propuesta personalizada</li>
              </ol>
            </div>
          </ScrollReveal>

          {/* Right — form */}
          <ScrollReveal variant="slideRight" delay={0.1}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="rounded-2xl card-premium p-8 md:p-10 flex flex-col items-center text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                    Se abrió WhatsApp con tu consulta. Si no se abrió automáticamente,
                    contactanos en <span className="text-primary font-medium">Aurvox.us@gmail.com</span>
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="rounded-2xl card-premium p-8 md:p-10 space-y-5"
                  onSubmit={handleSubmit(onSubmit)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Field
                    label="Tu nombre"
                    placeholder="Ej: Martín Rodríguez"
                    error={errors.nombre?.message}
                    {...register("nombre")}
                  />
                  <Field
                    label="Nombre del restaurante"
                    placeholder="Ej: La Parrilla del Centro"
                    error={errors.restaurante?.message}
                    {...register("restaurante")}
                  />
                  <Field
                    label="WhatsApp"
                    placeholder="Ej: +54 9 11 1234-5678"
                    type="tel"
                    error={errors.whatsapp?.message}
                    {...register("whatsapp")}
                  />
                  <Field
                    label="Email (opcional)"
                    placeholder="tucorreo@restaurante.com"
                    type="email"
                    error={errors.email?.message}
                    {...register("email")}
                  />

                  <div className="space-y-1.5">
                    <label htmlFor="desafio" className="text-sm font-medium text-foreground/80">
                      ¿Cuál es tu mayor desafío?
                    </label>
                    <select
                      id="desafio"
                      {...register("desafio")}
                      className="w-full h-11 px-4 rounded-lg border border-border/60 bg-background/60 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all duration-200 appearance-none"
                      defaultValue=""
                    >
                      <option value="" disabled>Seleccioná una opción</option>
                      <option value="reservas-perdidas">Reservas perdidas</option>
                      <option value="no-shows">Muchos no-shows</option>
                      <option value="atencion-fuera-horario">Atención fuera de horario</option>
                      <option value="seguimiento-clientes">Seguimiento de clientes</option>
                      <option value="otro">Otro</option>
                    </select>
                    {errors.desafio && (
                      <p className="text-xs text-destructive">{errors.desafio.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gradient w-full h-12 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Enviar consulta por WhatsApp
                  </Button>

                  <p className="text-xs text-center text-muted-foreground/60">
                    Al enviar, aceptás nuestra{" "}
                    <a href="/privacidad" className="underline underline-offset-2 hover:text-muted-foreground transition-colors">
                      Política de Privacidad
                    </a>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  error,
  placeholder,
  type = "text",
  ...props
}: {
  label: string
  error?: string
  placeholder?: string
  type?: string
  [key: string]: unknown
}) {
  const id = (props.name as string) ?? label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground/80">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`w-full h-11 px-4 rounded-lg border bg-background/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-200 ${
          error
            ? "border-destructive/60 focus:border-destructive/60"
            : "border-border/60 focus:border-primary/60"
        }`}
        {...props}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
