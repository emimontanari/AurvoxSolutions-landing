import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Términos y Condiciones | Aurvox Solutions",
  description: "Lee los términos y condiciones de uso de los servicios de Aurvox Solutions.",
  robots: { index: true, follow: true },
}

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header bar */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Volver al inicio
          </Link>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
        {/* Page header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/30 bg-primary/8 mb-6">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Contrato de uso</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            Términos y Condiciones
          </h1>
          <p className="text-muted-foreground text-sm">
            Última actualización: 18 de febrero de 2026
          </p>
        </div>

        {/* Intro */}
        <div className="rounded-2xl border border-border/60 bg-card/60 p-6 mb-10">
          <p className="text-foreground/85 leading-relaxed">
            Al acceder y utilizar los servicios de <strong className="text-foreground">Aurvox Solutions</strong>, 
            incluyendo nuestro sitio web, comunicación por WhatsApp y cualquier otro canal de contacto, 
            aceptas estos términos y condiciones de uso. Si no estás de acuerdo, no utilices nuestros servicios.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-foreground/80 leading-relaxed">

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-5 flex items-center gap-3">
              <span className="text-primary font-mono text-sm">01</span>
              Definiciones
            </h2>
            <ul className="space-y-2 pl-4">
              {[
                '"Servicio": todos los productos, servicios y contenidos ofrecidos por Aurvox Solutions',
                '"Usuario": cualquier persona que acceda o utilice nuestros servicios',
                '"WhatsApp Business": la plataforma de mensajería empresarial de Meta',
                '"Contenido": textos, imágenes, videos, software y cualquier material disponible en nuestros servicios',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="border-t border-border/40" />

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-5 flex items-center gap-3">
              <span className="text-primary font-mono text-sm">02</span>
              Uso del Servicio
            </h2>
            <p className="text-sm mb-4">Al utilizar nuestros servicios, te comprometes a:</p>
            <ul className="space-y-2 pl-4">
              {[
                'Proporcionar información veraz, precisa y actualizada',
                'No utilizar el servicio para actividades ilegales o no autorizadas',
                'No intentar acceder sin autorización a sistemas o redes',
                'No interferir con el funcionamiento normal del servicio',
                'No enviar spam, virus o código malicioso',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="border-t border-border/40" />

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-5 flex items-center gap-3">
              <span className="text-primary font-mono text-sm">03</span>
              WhatsApp Business y Meta
            </h2>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 mb-5">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Términos de terceros</p>
              <p className="text-sm">
                Al comunicarte con nosotros a través de WhatsApp, también estás aceptando los Términos de Servicio de Meta Platforms, Inc. y las Políticas de WhatsApp Business.
              </p>
            </div>
            <ul className="space-y-2 pl-4">
              {[
                'WhatsApp es un servicio proporcionado por Meta Platforms, Inc.',
                'Tu uso de WhatsApp está sujeto a sus propios términos y políticas',
                'No somos responsables por fallas o limitaciones de la plataforma WhatsApp',
                'Nos reservamos el derecho de suspender comunicaciones que violen las políticas de Meta',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="border-t border-border/40" />

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-5 flex items-center gap-3">
              <span className="text-primary font-mono text-sm">04</span>
              Uso de Datos y Privacidad
            </h2>
            <p className="text-sm mb-4">
              El tratamiento de tus datos personales está regulado por nuestra <Link href="/privacidad" className="text-primary hover:underline">Política de Privacidad</Link>. 
              Al usar nuestros servicios, consientes la recopilación y uso de datos según lo descrito allí.
            </p>
            <ul className="space-y-2 pl-4">
              {[
                'Cumplimos con las normativas de protección de datos aplicables (LGPD, GDPR, etc.)',
                'No vendemos ni compartimos datos personales con fines de marketing',
                'Puedes solicitar la eliminación de tus datos en cualquier momento',
                'Utilizamos cookies según nuestra política de privacidad',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="border-t border-border/40" />

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-5 flex items-center gap-3">
              <span className="text-primary font-mono text-sm">05</span>
              Propiedad Intelectual
            </h2>
            <p className="text-sm mb-4">
              Todo el contenido, software, marcas, logos y materiales en nuestros servicios son propiedad de Aurvox Solutions o de sus licenciantes y están protegidos por leyes de propiedad intelectual.
            </p>
            <ul className="space-y-2 pl-4">
              {[
                'No puedes copiar, modificar, distribuir o crear obras derivadas sin autorización',
                'Queda prohibido el uso de nuestros logos o marcas sin consentimiento previo',
                'Los usuarios retienen los derechos sobre el contenido que envían a través de nuestros canales',
                'Nos reservamos el derecho de usar testimonios y casos de éxito de forma anónima',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="border-t border-border/40" />

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-5 flex items-center gap-3">
              <span className="text-primary font-mono text-sm">06</span>
              Limitación de Responsabilidad
            </h2>
            <p className="text-sm mb-4">
              Aurvox Solutions no será responsable por:
            </p>
            <ul className="space-y-2 pl-4">
              {[
                'Daños indirectos, incidentales o consecuentes',
                'Pérdida de datos, ingresos o beneficios',
                'Interrupciones del servicio por causas fuera de nuestro control',
                'Contenido o conducta de terceros',
                'Fallos tecnológicos de plataformas de terceros (WhatsApp, Meta, etc.)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="border-t border-border/40" />

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-5 flex items-center gap-3">
              <span className="text-primary font-mono text-sm">07</span>
              Modificaciones
            </h2>
            <p className="text-sm">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación. 
              El uso continuado de nuestros servicios después de los cambios constituye la aceptación de los nuevos términos. 
              Recomendamos revisar esta página periódicamente.
            </p>
          </section>

          <div className="border-t border-border/40" />

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-5 flex items-center gap-3">
              <span className="text-primary font-mono text-sm">08</span>
              Terminación
            </h2>
            <p className="text-sm mb-4">
              Podemos suspender o terminar tu acceso a nuestros servicios:
            </p>
            <ul className="space-y-2 pl-4">
              {[
                'Por violación de estos términos',
                'Por uso fraudulento o malicioso',
                'Por solicitud expresa del usuario',
                'Por discontinuación del servicio',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="border-t border-border/40" />

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-5 flex items-center gap-3">
              <span className="text-primary font-mono text-sm">09</span>
              Ley Aplicable
            </h2>
            <p className="text-sm">
              Estos términos se rigen por las leyes de la República Argentina. Cualquier disputa será resuelta en los tribunales competentes de la Ciudad Autónoma de Buenos Aires, Argentina. 
              Si alguna disposición de estos términos es considerada inválida, las demás disposiciones permanecerán en pleno vigor.
            </p>
          </section>

          <div className="border-t border-border/40" />

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-5 flex items-center gap-3">
              <span className="text-primary font-mono text-sm">10</span>
              Contacto
            </h2>
            <p className="text-sm mb-6">
              Si tienes preguntas sobre estos términos, puedes contactarnos:
            </p>
            <div className="rounded-2xl border border-border/60 bg-card/60 p-6 space-y-3">
              {[
                { label: "Empresa", value: "Aurvox Solutions" },
                { label: "Correo", value: "Aurvox.us@gmail.com" },
                { label: "Dirección", value: "Buenos Aires, Argentina" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start gap-3 text-sm">
                  <span className="text-muted-foreground w-20 shrink-0">{label}</span>
                  <span className="text-foreground font-medium">{value}</span>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-border/40">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  )
}
