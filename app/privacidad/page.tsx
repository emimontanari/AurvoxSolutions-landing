import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Política de Privacidad para Meta Apps | Aurvox Solutions",
  description:
    "Política de privacidad de Aurvox Solutions para integraciones con Meta (Facebook, Instagram y WhatsApp), incluyendo uso de datos, retención, seguridad y eliminación de datos.",
  alternates: {
    canonical: "/privacidad",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/privacidad",
    siteName: "Aurvox Solutions",
    title: "Política de Privacidad para Meta Apps | Aurvox Solutions",
    description:
      "Política de privacidad para integraciones con Meta: recopilación, uso, conservación y eliminación de datos.",
    images: [{ url: "/LOGO.png", width: 1200, height: 630, alt: "Aurvox Solutions" }],
  },
  robots: { index: true, follow: true },
}

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Volver al inicio
          </Link>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/30 bg-primary/8 mb-6">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Meta App Privacy URL</span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            Política de Privacidad
          </h1>

          <p className="text-muted-foreground text-sm mb-6">Última actualización: 19 de febrero de 2026</p>

          <div className="rounded-2xl border border-border/60 bg-card/60 p-6">
            <p className="text-sm text-foreground/85 leading-relaxed">
              Esta política describe cómo <strong className="text-foreground">Aurvox Solutions</strong> recopila,
              utiliza, comparte, conserva y elimina datos personales cuando usas nuestro sitio web y nuestros
              servicios, incluyendo integraciones con <strong className="text-foreground">Meta Platform</strong>
              {" "}(Facebook, Instagram y WhatsApp Business). Esta página está publicada como URL pública de
              privacidad para procesos de revisión y cumplimiento en Meta.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 mb-10">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Navegación rápida</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            {[
              { href: "#alcance", label: "1. Alcance" },
              { href: "#datos", label: "2. Datos recopilados" },
              { href: "#uso", label: "3. Uso de datos" },
              { href: "#base-legal", label: "4. Base legal" },
              { href: "#comparticion", label: "5. Compartición" },
              { href: "#retencion", label: "6. Retención" },
              { href: "#seguridad", label: "7. Seguridad" },
              { href: "#transferencias", label: "8. Transferencias" },
              { href: "#derechos", label: "9. Derechos" },
              { href: "#eliminacion-datos-meta", label: "10. Eliminación (Meta)" },
              { href: "#menores", label: "11. Menores" },
              { href: "#cambios", label: "12. Cambios" },
              { href: "#contacto", label: "13. Contacto" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg border border-border/60 bg-background/80 px-3 py-2 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-10 text-foreground/85 leading-relaxed">
          <section id="alcance">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">1. Alcance</h2>
            <p className="text-sm">
              Esta política aplica a los datos procesados por Aurvox Solutions en el contexto de:
            </p>
            <ul className="space-y-2 pl-4 mt-4">
              {[
                "Navegación y formularios en este sitio web.",
                "Comunicación por WhatsApp Business.",
                "Integraciones con Facebook Login, Instagram y/o APIs de Meta autorizadas para la app.",
                "Gestión comercial, soporte y automatización de atención al cliente.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="border-t border-border/40" />

          <section id="datos">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">2. Datos que recopilamos</h2>

            <h3 className="font-medium text-foreground mb-3 text-sm">2.1 Datos que nos proporcionas</h3>
            <ul className="space-y-2 pl-4 mb-5">
              {[
                "Nombre y apellido.",
                "Correo electrónico.",
                "Teléfono.",
                "Datos enviados en formularios o mensajes.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="font-medium text-foreground mb-3 text-sm">2.2 Datos técnicos y de uso</h3>
            <ul className="space-y-2 pl-4 mb-5">
              {[
                "Dirección IP y metadatos del dispositivo/navegador.",
                "Páginas visitadas, tiempos de interacción y eventos de uso.",
                "Datos de cookies o tecnologías equivalentes cuando aplique.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="font-medium text-foreground mb-3 text-sm">2.3 Datos recibidos desde Meta Platform</h3>
            <p className="text-sm mb-3">
              Si autorizas una conexión con Meta, podemos recibir solamente los datos permitidos por los permisos
              aprobados para la app, por ejemplo:
            </p>
            <ul className="space-y-2 pl-4">
              {[
                "Identificador de usuario de la plataforma.",
                "Nombre de perfil y datos públicos autorizados.",
                "Correo electrónico (si fue autorizado por el usuario y el permiso correspondiente).",
                "Información de mensajería necesaria para prestar el servicio (por ejemplo, en WhatsApp Business).",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="border-t border-border/40" />

          <section id="uso">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">3. Cómo usamos los datos</h2>
            <ul className="space-y-2 pl-4">
              {[
                "Autenticar usuarios y gestionar sesiones.",
                "Brindar soporte y responder consultas.",
                "Operar funciones contratadas por nuestros clientes (automatización, CRM, atención).",
                "Mejorar calidad, seguridad y estabilidad del servicio.",
                "Cumplir obligaciones legales y prevenir fraude o abuso.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm mt-4 text-muted-foreground">
              No vendemos datos personales. No compartimos datos de usuarios de Meta para redes de anuncios,
              brokers de datos ni fines incompatibles con esta política.
            </p>
          </section>

          <div className="border-t border-border/40" />

          <section id="base-legal">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">4. Base legal del tratamiento</h2>
            <p className="text-sm mb-3">Tratamos datos personales sobre una o más de estas bases:</p>
            <ul className="space-y-2 pl-4">
              {[
                "Ejecución de un contrato o medidas precontractuales.",
                "Consentimiento del usuario cuando corresponda.",
                "Interés legítimo para operar y proteger nuestros servicios.",
                "Cumplimiento de obligaciones legales.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="border-t border-border/40" />

          <section id="comparticion">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">5. Con quién compartimos datos</h2>
            <p className="text-sm mb-3">Solo compartimos datos cuando es necesario para operar el servicio:</p>
            <ul className="space-y-2 pl-4">
              {[
                "Proveedores de infraestructura, hosting y analítica.",
                "Herramientas de mensajería, CRM o automatización contratadas para prestar el servicio.",
                "Asesores legales o autoridades competentes cuando exista obligación legal.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm mt-4 text-muted-foreground">
              Exigimos a nuestros proveedores medidas de confidencialidad y seguridad acordes al tipo de datos.
            </p>
          </section>

          <div className="border-t border-border/40" />

          <section id="retencion">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">6. Retención de datos</h2>
            <ul className="space-y-2 pl-4">
              {[
                "Conservamos datos durante el tiempo necesario para cumplir las finalidades declaradas.",
                "Eliminamos o anonimizamos datos cuando dejan de ser necesarios, salvo obligación legal de conservación.",
                "Las copias de seguridad se depuran de forma progresiva según ciclos técnicos razonables.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="border-t border-border/40" />

          <section id="seguridad">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">7. Seguridad</h2>
            <p className="text-sm">
              Aplicamos medidas técnicas y organizativas razonables para proteger los datos frente a accesos no
              autorizados, pérdida, alteración o divulgación indebida. Esto incluye controles de acceso, minimización
              de datos y monitoreo operativo. Ningún sistema es infalible al 100%, pero trabajamos continuamente para
              mantener un nivel de seguridad adecuado.
            </p>
          </section>

          <div className="border-t border-border/40" />

          <section id="transferencias">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">8. Transferencias internacionales</h2>
            <p className="text-sm">
              En algunos casos, los datos pueden procesarse fuera del país de residencia del usuario mediante
              proveedores globales. Cuando aplica, implementamos salvaguardas contractuales y operativas para proteger
              la información en transferencias internacionales.
            </p>
          </section>

          <div className="border-t border-border/40" />

          <section id="derechos">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">9. Derechos del usuario</h2>
            <p className="text-sm mb-3">Según la normativa aplicable, puedes solicitar:</p>
            <ul className="space-y-2 pl-4">
              {[
                "Acceso a tus datos.",
                "Rectificación de datos inexactos.",
                "Eliminación de datos cuando corresponda.",
                "Oposición o limitación del tratamiento en determinados casos.",
                "Portabilidad, cuando sea legalmente aplicable.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="border-t border-border/40" />

          <section id="eliminacion-datos-meta">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              10. Instrucciones de eliminación de datos (Meta)
            </h2>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 mb-5">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Data Deletion Instructions URL</p>
              <p className="text-sm">
                Si deseas eliminar datos vinculados a tu uso de Facebook, Instagram o WhatsApp con nuestros servicios,
                puedes seguir estos pasos.
              </p>
            </div>

            <ol className="space-y-3 pl-4">
              {[
                "Revoca el acceso de la app desde Facebook: Configuración y privacidad > Configuración > Apps y sitios web > selecciona la app relacionada con Aurvox Solutions > Eliminar.",
                "Si aplica, revoca accesos en Instagram: Configuración > Seguridad > Apps y sitios web > Activas > Quitar acceso.",
                "Envíanos una solicitud a Aurvox.us@gmail.com con asunto: Data Deletion Request.",
                "Incluye en tu solicitud: nombre, correo de contacto, identificador de cuenta y una referencia de la integración (por ejemplo, página o número de WhatsApp).",
              ].map((item, i) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="text-primary font-mono text-xs font-bold mt-0.5 shrink-0">{i + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>

            <p className="text-sm mt-5">
              Responderemos solicitudes verificadas en un plazo de hasta <strong className="text-foreground">10 días hábiles</strong>.
              La eliminación completa en backups o sistemas derivados puede requerir hasta <strong className="text-foreground">30 días</strong>
              por ciclos técnicos. Determinados registros podrán conservarse cuando la ley lo exija.
            </p>
          </section>

          <div className="border-t border-border/40" />

          <section id="menores">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">11. Privacidad de menores</h2>
            <p className="text-sm">
              Nuestros servicios no están dirigidos intencionalmente a menores de 13 años. Si detectamos que se
              recopilaron datos de menores sin base legal válida, tomaremos medidas para eliminarlos.
            </p>
          </section>

          <div className="border-t border-border/40" />

          <section id="cambios">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">12. Cambios en esta política</h2>
            <p className="text-sm">
              Podemos actualizar esta política para reflejar cambios normativos, técnicos o operativos. Publicaremos la
              versión vigente en esta misma URL con su fecha de última actualización.
            </p>
          </section>

          <div className="border-t border-border/40" />

          <section id="contacto">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">13. Contacto</h2>
            <p className="text-sm mb-5">Para dudas, solicitudes de privacidad o eliminación de datos:</p>

            <div className="rounded-2xl border border-border/60 bg-card/60 p-6 space-y-3">
              {[
                { label: "Responsable", value: "Aurvox Solutions" },
                { label: "Correo", value: "Aurvox.us@gmail.com" },
                { label: "Dirección", value: "Buenos Aires, Argentina" },
                { label: "URL", value: "https://aurvox.ai/privacidad" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start gap-3 text-sm">
                  <span className="text-muted-foreground w-24 shrink-0">{label}</span>
                  <span className="text-foreground font-medium break-all">{value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

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
