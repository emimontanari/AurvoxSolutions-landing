import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, FileText, Scale, Shield, MessageCircle, Database, AlertTriangle, Globe, Users, RefreshCw, Mail, Smartphone, Lock, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
    title: "Términos y Condiciones del Servicio | Aurvox Solutions",
    description:
        "Términos y condiciones de uso de los servicios de Aurvox Solutions, incluyendo integraciones con Meta (WhatsApp Business, Facebook e Instagram). Cumplimiento con las Condiciones de la Plataforma de Meta.",
    alternates: {
        canonical: "/terminos-condiciones",
    },
    openGraph: {
        type: "website",
        locale: "es_AR",
        url: "/terminos-condiciones",
        siteName: "Aurvox Solutions",
        title: "Términos y Condiciones del Servicio | Aurvox Solutions",
        description:
            "Términos y condiciones de uso de los servicios de Aurvox Solutions para integraciones con Meta Platform, WhatsApp Business y automatización con IA.",
        images: [{ url: "/LOGO.png", width: 1200, height: 630, alt: "Aurvox Solutions" }],
    },
    robots: { index: true, follow: true },
}

export default function TerminosCondicionesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* ─── Sticky Header ─── */}
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
                {/* ─── Page Header ─── */}
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/30 bg-primary/8 mb-6">
                        <Scale className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Meta Terms of Service URL</span>
                    </div>

                    <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                        Términos y Condiciones del Servicio
                    </h1>

                    <p className="text-muted-foreground text-sm mb-6">Última actualización: 24 de febrero de 2026</p>

                    <div className="rounded-2xl border border-border/60 bg-card/60 p-6">
                        <p className="text-sm text-foreground/85 leading-relaxed">
                            Estos términos y condiciones (en adelante, los <strong className="text-foreground">&quot;Términos&quot;</strong>)
                            regulan el acceso y uso de los servicios proporcionados por{" "}
                            <strong className="text-foreground">Aurvox Solutions</strong> (en adelante, el{" "}
                            <strong className="text-foreground">&quot;Prestador&quot;</strong>), incluyendo integraciones con{" "}
                            <strong className="text-foreground">Meta Platform</strong> (Facebook, Instagram y WhatsApp Business),
                            automatización con inteligencia artificial, y cualquier otro servicio ofrecido a través de este sitio
                            web y sus plataformas conectadas. Al utilizar nuestros servicios, aceptas estos Términos en su totalidad.
                            Esta página cumple con los requisitos de URL de Condiciones del Servicio exigidos por Meta para apps en el
                            Panel de apps de Meta for Developers.
                        </p>
                    </div>
                </div>

                {/* ─── Quick Navigation ─── */}
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 mb-10">
                    <h2 className="font-display text-lg font-semibold text-foreground mb-4">Navegación rápida</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                        {[
                            { href: "#definiciones", label: "1. Definiciones", icon: FileText },
                            { href: "#objeto", label: "2. Objeto del servicio", icon: CheckCircle },
                            { href: "#aceptacion", label: "3. Aceptación", icon: Scale },
                            { href: "#uso-servicio", label: "4. Uso del servicio", icon: Users },
                            { href: "#whatsapp-business", label: "5. WhatsApp Business", icon: MessageCircle },
                            { href: "#datos-meta", label: "6. Datos de Meta Platform", icon: Database },
                            { href: "#consentimiento", label: "7. Consentimiento", icon: CheckCircle },
                            { href: "#seguridad", label: "8. Seguridad", icon: Shield },
                            { href: "#ia-automatizacion", label: "9. IA y automatización", icon: Smartphone },
                            { href: "#propiedad-intelectual", label: "10. Propiedad intelectual", icon: Lock },
                            { href: "#limitacion", label: "11. Limitación de resp.", icon: AlertTriangle },
                            { href: "#suspension", label: "12. Suspensión y baja", icon: RefreshCw },
                            { href: "#transferencias", label: "13. Transferencias int.", icon: Globe },
                            { href: "#ley-aplicable", label: "14. Legislación aplicable", icon: Scale },
                            { href: "#modificaciones", label: "15. Modificaciones", icon: RefreshCw },
                            { href: "#privacidad", label: "16. Privacidad", icon: Shield },
                            { href: "#contacto", label: "17. Contacto", icon: Mail },
                        ].map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-2.5 rounded-lg border border-border/60 bg-background/80 px-3 py-2 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                            >
                                <item.icon className="w-3.5 h-3.5 text-primary/70 shrink-0" />
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* ─── Content Sections ─── */}
                <div className="space-y-10 text-foreground/85 leading-relaxed">

                    {/* ── 1. Definiciones ── */}
                    <section id="definiciones">
                        <h2 className="font-display text-xl font-semibold text-foreground mb-4">1. Definiciones</h2>
                        <p className="text-sm mb-4">
                            A los efectos de estos Términos, se establecen las siguientes definiciones:
                        </p>
                        <div className="space-y-3">
                            {[
                                { term: "Prestador", def: "Aurvox Solutions, persona jurídica responsable de la operación de los servicios descritos." },
                                { term: "Usuario", def: "Toda persona física o jurídica que accede, utiliza o interactúa con los servicios del Prestador, ya sea directamente o a través de las plataformas de Meta (WhatsApp, Facebook, Instagram)." },
                                { term: "Cliente", def: "Persona física o jurídica que contrata los servicios del Prestador para su negocio (por ejemplo, un restaurante que contrata automatización con IA)." },
                                { term: "Servicios", def: "El conjunto de funcionalidades provistas por Aurvox Solutions, incluyendo: automatización con inteligencia artificial, gestión de comunicaciones vía WhatsApp Business, integración con Facebook e Instagram, CRM, y atención automatizada." },
                                { term: "Datos de la Plataforma", def: "Cualquier dato obtenido a través de las APIs o productos de Meta Platform, conforme a la definición de las Condiciones de la Plataforma de Meta." },
                                { term: "Meta Platform", def: "Los productos y servicios de Meta Platforms, Inc. (incluidos Facebook, Instagram y WhatsApp)." },
                            ].map(({ term, def }) => (
                                <div key={term} className="flex items-start gap-3 text-sm rounded-xl border border-border/40 bg-card/30 p-4">
                                    <span className="font-semibold text-foreground shrink-0 min-w-[140px]">{term}:</span>
                                    <span>{def}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="border-t border-border/40" />

                    {/* ── 2. Objeto del Servicio ── */}
                    <section id="objeto">
                        <h2 className="font-display text-xl font-semibold text-foreground mb-4">2. Objeto del servicio</h2>
                        <p className="text-sm mb-4">
                            Aurvox Solutions proporciona soluciones de automatización con inteligencia artificial orientadas
                            principalmente al sector gastronómico y de servicios. Los servicios incluyen, de manera no limitativa:
                        </p>
                        <ul className="space-y-2 pl-4">
                            {[
                                "Agentes conversacionales inteligentes (chatbots con IA) para atención al cliente vía WhatsApp Business.",
                                "Gestión automatizada de reservas, consultas y pedidos.",
                                "Integración con plataformas de Meta (Facebook, Instagram, WhatsApp) para comunicación centralizada.",
                                "Panel de control y analítica para el seguimiento de interacciones.",
                                "CRM y gestión de relaciones con clientes.",
                                "Automatización de flujos de trabajo internos del negocio.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div className="border-t border-border/40" />

                    {/* ── 3. Aceptación de los Términos ── */}
                    <section id="aceptacion">
                        <h2 className="font-display text-xl font-semibold text-foreground mb-4">3. Aceptación de los Términos</h2>
                        <p className="text-sm mb-3">
                            Al acceder a nuestros servicios, interactuar con nuestros agentes de IA, o comunicarte con nosotros
                            a través de cualquier plataforma de Meta, confirmas que:
                        </p>
                        <ul className="space-y-2 pl-4">
                            {[
                                "Has leído, comprendido y aceptado estos Términos.",
                                "Tienes la capacidad legal para aceptar estos Términos (mayor de 18 años o edad legal aplicable).",
                                "Si actúas en nombre de una empresa, tienes la autoridad para vincularla a estos Términos.",
                                "Aceptas cumplir con las leyes y regulaciones aplicables en tu jurisdicción.",
                                "Reconoces que estos Términos complementan (y no sustituyen, modifican ni contradicen) las Condiciones de la Plataforma de Meta.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div className="border-t border-border/40" />

                    {/* ── 4. Uso del Servicio ── */}
                    <section id="uso-servicio">
                        <h2 className="font-display text-xl font-semibold text-foreground mb-4">4. Uso aceptable del servicio</h2>
                        <p className="text-sm mb-3">El Usuario se compromete a utilizar los servicios de manera lícita y conforme a estos Términos. Queda expresamente prohibido:</p>
                        <ul className="space-y-2 pl-4 mb-5">
                            {[
                                "Utilizar los servicios para actividades ilegales, fraudulentas o que infrinjan derechos de terceros.",
                                "Enviar spam, mensajes no solicitados o comunicaciones engañosas a través de las plataformas integradas.",
                                "Intentar acceder de forma no autorizada a los sistemas, datos o infraestructura del Prestador.",
                                "Suplantar la identidad de otra persona o empresa.",
                                "Utilizar los datos obtenidos a través de los servicios para discriminación, vigilancia, determinaciones de elegibilidad (vivienda, empleo, seguros, créditos) u otros fines prohibidos por Meta.",
                                "Vender, licenciar o comercializar Datos de la Plataforma obtenidos a través de nuestras integraciones con Meta.",
                                "Modificar, descompilar o realizar ingeniería inversa de los servicios del Prestador.",
                                "Compartir o solicitar a los usuarios que compartan números completos de tarjetas de pago, números de cuentas bancarias o identificadores confidenciales a través de WhatsApp.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm text-muted-foreground">
                            El incumplimiento de estas restricciones podrá resultar en la suspensión o terminación inmediata
                            del servicio, sin perjuicio de las acciones legales correspondientes.
                        </p>
                    </section>

                    <div className="border-t border-border/40" />

                    {/* ── 5. WhatsApp Business ── */}
                    <section id="whatsapp-business">
                        <h2 className="font-display text-xl font-semibold text-foreground mb-4">5. Términos específicos para WhatsApp Business</h2>

                        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 mb-5">
                            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Obligatorio para Meta App Review</p>
                            <p className="text-sm">
                                El uso de WhatsApp Business a través de nuestros servicios está sujeto a las{" "}
                                <a href="https://www.whatsapp.com/legal/business-terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                                    Condiciones del Servicio de WhatsApp Business
                                </a>{" "}
                                y la{" "}
                                <a href="https://www.whatsapp.com/legal/business-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                                    Política de Mensajes de WhatsApp Business
                                </a>.
                            </p>
                        </div>

                        <h3 className="font-medium text-foreground mb-3 text-sm">5.1 Consentimiento explícito (Opt-in)</h3>
                        <p className="text-sm mb-3">
                            Conforme a los requisitos de Meta y WhatsApp, solo se enviarán mensajes a personas que hayan dado
                            su consentimiento explícito para recibir comunicaciones por WhatsApp. El Cliente es responsable de:
                        </p>
                        <ul className="space-y-2 pl-4 mb-5">
                            {[
                                "Obtener el consentimiento explícito del usuario final antes de iniciar cualquier comunicación por WhatsApp.",
                                "Mantener registros verificables del consentimiento obtenido.",
                                "Ofrecer un mecanismo claro para que el usuario pueda revocar su consentimiento en cualquier momento.",
                                "Respetar todas las solicitudes de los usuarios para bloquear, interrumpir o cancelar las comunicaciones.",
                                "No enviar mensajes no solicitados, engañosos ni spam bajo ninguna circunstancia.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <h3 className="font-medium text-foreground mb-3 text-sm">5.2 Calidad de la comunicación</h3>
                        <ul className="space-y-2 pl-4 mb-5">
                            {[
                                "Los mensajes enviados deben ser relevantes, claros y esperados por el destinatario.",
                                "El perfil de WhatsApp Business debe contener información precisa y actualizada del negocio (dirección, correo, sitio web).",
                                "No está permitido hacerse pasar por otra empresa ni engañar a los clientes sobre la naturaleza del negocio.",
                                "No se puede reenviar ni compartir información del chat de un cliente con otro cliente.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <h3 className="font-medium text-foreground mb-3 text-sm">5.3 Limitaciones en el uso de datos de WhatsApp</h3>
                        <ul className="space-y-2 pl-4">
                            {[
                                "Los datos proporcionados por Meta sobre una persona contactada por WhatsApp (aparte del contenido de las conversaciones) no se usarán para ningún fin que no sea razonablemente necesario para el intercambio de mensajes.",
                                "No se solicitará a los usuarios que compartan información financiera sensible (tarjetas, cuentas bancarias, documentos de identidad) a través de WhatsApp.",
                                "No se utilizará WhatsApp para ofrecer servicios de telemedicina o compartir información de salud si la regulación aplicable lo prohíbe.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div className="border-t border-border/40" />

                    {/* ── 6. Datos de Meta Platform ── */}
                    <section id="datos-meta">
                        <h2 className="font-display text-xl font-semibold text-foreground mb-4">6. Tratamiento de Datos de Meta Platform</h2>

                        <p className="text-sm mb-4">
                            Aurvox Solutions cumple con las{" "}
                            <a href="https://developers.facebook.com/terms/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                                Condiciones de la Plataforma de Meta
                            </a>{" "}
                            en lo relativo al tratamiento de Datos de la Plataforma. Tanto Aurvox Solutions como el Cliente se comprometen a:
                        </p>

                        <h3 className="font-medium text-foreground mb-3 text-sm">6.1 Prácticas prohibidas</h3>
                        <p className="text-sm mb-3">
                            De conformidad con la Sección 3 de las Condiciones de la Plataforma de Meta, queda expresamente
                            prohibido el uso de Datos de la Plataforma para:
                        </p>
                        <ul className="space-y-2 pl-4 mb-5">
                            {[
                                "Discriminar personas en base a raza, etnia, religión, sexo, orientación sexual, identidad de género, discapacidad, edad u otras categorías protegidas.",
                                "Realizar determinaciones de elegibilidad sobre vivienda, empleo, seguros, oportunidades educativas, créditos, beneficios gubernamentales o condición migratoria.",
                                "Ejecutar, facilitar o proveer herramientas de vigilancia (incluyendo seguridad nacional o cumplimiento de ley).",
                                "Vender, licenciar o comprar Datos de la Plataforma.",
                                "Crear perfiles de usuario o aumentar seguidores sin el consentimiento válido del Usuario.",
                                "Intentar decodificar, reidentificar, desanonimizar o aplicar ingeniería inversa a los Datos de la Plataforma.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <h3 className="font-medium text-foreground mb-3 text-sm">6.2 Retención y eliminación</h3>
                        <p className="text-sm mb-3">
                            Aurvox Solutions se compromete a eliminar Datos de la Plataforma cuando:
                        </p>
                        <ul className="space-y-2 pl-4 mb-5">
                            {[
                                "Su conservación ya no sea necesaria para un fin comercial legítimo conforme a estos Términos.",
                                "Se deje de operar el servicio a través del cual fueron recopilados.",
                                "Meta solicite su eliminación para proteger a los Usuarios.",
                                "Un Usuario solicite la eliminación de sus datos o ya no tenga cuenta activa.",
                                "Lo requiera la legislación o regulación aplicable.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <h3 className="font-medium text-foreground mb-3 text-sm">6.3 Compartición de datos</h3>
                        <p className="text-sm">
                            Aurvox Solutions no vende datos personales. No comparte Datos de la Plataforma con redes de
                            anuncios, brokers de datos ni para fines incompatibles con estos Términos. Los datos solo se
                            comparten con proveedores de servicios estrictamente necesarios para la operación del servicio
                            (hosting, infraestructura, mensajería), bajo contratos que exigen medidas equivalentes de
                            confidencialidad y seguridad.
                        </p>
                    </section>

                    <div className="border-t border-border/40" />

                    {/* ── 7. Consentimiento y Base Legal ── */}
                    <section id="consentimiento">
                        <h2 className="font-display text-xl font-semibold text-foreground mb-4">7. Consentimiento y base legal del tratamiento</h2>
                        <p className="text-sm mb-3">
                            Aurvox Solutions trata datos personales sobre una o más de las siguientes bases legales:
                        </p>
                        <ul className="space-y-2 pl-4 mb-5">
                            {[
                                "Ejecución de un contrato o medidas precontractuales entre el Cliente y el Prestador.",
                                "Consentimiento del Usuario, cuando corresponda, conforme a la legislación aplicable.",
                                "Interés legítimo para operar, proteger y mejorar nuestros servicios.",
                                "Cumplimiento de obligaciones legales o regulatorias aplicables.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm text-muted-foreground">
                            El Usuario puede revocar su consentimiento en cualquier momento contactando a{" "}
                            <span className="text-foreground font-medium">Aurvox.us@gmail.com</span>, sin que ello afecte
                            la licitud del tratamiento basado en el consentimiento previo a su revocación.
                        </p>
                    </section>

                    <div className="border-t border-border/40" />

                    {/* ── 8. Seguridad ── */}
                    <section id="seguridad">
                        <h2 className="font-display text-xl font-semibold text-foreground mb-4">8. Seguridad de los datos</h2>
                        <p className="text-sm mb-4">
                            De conformidad con la Sección 6 de las Condiciones de la Plataforma de Meta, Aurvox Solutions
                            implementa y mantiene medidas de seguridad administrativas, físicas y técnicas que:
                        </p>
                        <ul className="space-y-2 pl-4 mb-5">
                            {[
                                "Cumplen o superan los estándares de la industria dada la confidencialidad de los datos tratados.",
                                "Previenen el acceso, destrucción, pérdida, alteración, divulgación o compromiso no autorizado de los datos.",
                                "Incluyen controles de acceso basados en roles, cifrado de datos en tránsito y en reposo, y monitoreo operativo.",
                                "Se revisan y actualizan periódicamente según las mejores prácticas del sector.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <h3 className="font-medium text-foreground mb-3 text-sm">8.1 Reporte de incidentes de seguridad</h3>
                        <p className="text-sm mb-3">
                            Los Usuarios y Clientes pueden reportar vulnerabilidades de seguridad a{" "}
                            <span className="text-foreground font-medium">Aurvox.us@gmail.com</span>. Nos comprometemos a:
                        </p>
                        <ul className="space-y-2 pl-4 mb-5">
                            {[
                                "Abordar con prontitud las deficiencias de seguridad reportadas.",
                                "Notificar a Meta y a las autoridades competentes ante cualquier incidente de datos, conforme a las regulaciones aplicables.",
                                "Informar a los usuarios afectados cuando la ley o las regulaciones así lo requieran.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <h3 className="font-medium text-foreground mb-3 text-sm">8.2 Credenciales y tokens de Meta</h3>
                        <p className="text-sm">
                            Aurvox Solutions no solicita ni recopila credenciales de inicio de sesión de Meta de los usuarios.
                            Los identificadores de usuario, tokens de acceso y claves secretas de apps se protegen y no se
                            transfieren ni comparten salvo con proveedores de servicios autorizados que ayudan a operar la
                            plataforma, conforme a las Condiciones de la Plataforma de Meta.
                        </p>
                    </section>

                    <div className="border-t border-border/40" />

                    {/* ── 9. IA y Automatización ── */}
                    <section id="ia-automatizacion">
                        <h2 className="font-display text-xl font-semibold text-foreground mb-4">9. Inteligencia artificial y automatización</h2>
                        <p className="text-sm mb-4">
                            Los servicios de Aurvox Solutions utilizan modelos de inteligencia artificial para procesar y
                            responder comunicaciones. En relación con esto:
                        </p>
                        <ul className="space-y-2 pl-4 mb-5">
                            {[
                                "Las respuestas generadas por IA son orientativas y no constituyen asesoramiento profesional, legal, médico ni financiero.",
                                "El contenido de las conversaciones puede ser procesado por modelos de IA para generar respuestas contextuales, pero no se utiliza para entrenar modelos externos sin consentimiento.",
                                "El Cliente es responsable de supervisar y configurar los agentes de IA según las necesidades de su negocio.",
                                "Aurvox Solutions se reserva el derecho de ajustar o suspender funcionalidades de IA por razones de seguridad, rendimiento o cumplimiento normativo.",
                                "Los datos procesados por la IA están sujetos a las mismas medidas de seguridad y privacidad descritas en estos Términos.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div className="border-t border-border/40" />

                    {/* ── 10. Propiedad Intelectual ── */}
                    <section id="propiedad-intelectual">
                        <h2 className="font-display text-xl font-semibold text-foreground mb-4">10. Propiedad intelectual</h2>
                        <p className="text-sm mb-3">
                            Todos los derechos de propiedad intelectual sobre los servicios, software, diseño, marca, logotipos,
                            y contenido creado por Aurvox Solutions son de titularidad exclusiva del Prestador o sus licenciantes.
                        </p>
                        <ul className="space-y-2 pl-4">
                            {[
                                "El Cliente conserva la propiedad de sus datos, contenido y materiales ingresados en la plataforma.",
                                "Aurvox Solutions obtiene una licencia limitada y no exclusiva para procesar los datos del Cliente únicamente con el fin de prestar los servicios contratados.",
                                "No está permitido reproducir, distribuir o modificar el software, diseño o marca de Aurvox Solutions sin autorización escrita.",
                                "Los nombres, logotipos y marcas de Meta, Facebook, Instagram y WhatsApp son propiedad de Meta Platforms, Inc. y se utilizan conforme a sus directrices de marca.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div className="border-t border-border/40" />

                    {/* ── 11. Limitación de Responsabilidad ── */}
                    <section id="limitacion">
                        <h2 className="font-display text-xl font-semibold text-foreground mb-4">11. Limitación de responsabilidad</h2>
                        <ul className="space-y-2 pl-4 mb-5">
                            {[
                                "Aurvox Solutions no garantiza que los servicios estén disponibles de forma ininterrumpida o libre de errores, aunque se esfuerza por mantener la máxima disponibilidad.",
                                "El Prestador no será responsable por daños indirectos, incidentales, especiales o consecuentes que surjan del uso o la imposibilidad de uso de los servicios.",
                                "La responsabilidad total del Prestador no excederá el monto pagado por el Cliente durante los últimos 12 meses por los servicios que dieron origen a la reclamación.",
                                "El Prestador no es responsable por interrupciones, limitaciones o cambios en las APIs o servicios de Meta Platform, Facebook, Instagram o WhatsApp.",
                                "El Cliente es el único responsable del contenido que transmite a través de los servicios y de cumplir con la legislación aplicable en su jurisdicción.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div className="border-t border-border/40" />

                    {/* ── 12. Suspensión y Terminación ── */}
                    <section id="suspension">
                        <h2 className="font-display text-xl font-semibold text-foreground mb-4">12. Suspensión, terminación y baja del servicio</h2>
                        <p className="text-sm mb-3">Aurvox Solutions podrá suspender o terminar el acceso a los servicios:</p>
                        <ul className="space-y-2 pl-4 mb-5">
                            {[
                                "Si el Cliente o Usuario incumple estos Términos, las Condiciones de la Plataforma de Meta o cualquier legislación aplicable.",
                                "Si Meta lo requiere como parte de sus derechos de revisión de cumplimiento o por violación de sus políticas.",
                                "Si existe un riesgo de seguridad, fraude o abuso que afecte al servicio o a terceros.",
                                "Por falta de pago de los servicios contratados, según el acuerdo comercial vigente.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm mb-3">En caso de terminación del servicio:</p>
                        <ul className="space-y-2 pl-4">
                            {[
                                "Los Datos de la Plataforma serán eliminados conforme a los plazos establecidos en estos Términos y las Condiciones de Meta.",
                                "El Cliente podrá solicitar la exportación de sus datos propios antes de la terminación efectiva.",
                                "Las cláusulas de confidencialidad, propiedad intelectual y limitación de responsabilidad sobrevivirán a la terminación.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div className="border-t border-border/40" />

                    {/* ── 13. Transferencias Internacionales ── */}
                    <section id="transferencias">
                        <h2 className="font-display text-xl font-semibold text-foreground mb-4">13. Transferencias internacionales de datos</h2>
                        <p className="text-sm">
                            En algunos casos, los datos pueden procesarse fuera del país de residencia del Usuario a través
                            de proveedores globales de infraestructura. Cuando aplica, Aurvox Solutions implementa salvaguardas
                            contractuales y operativas para proteger la información, incluyendo cláusulas contractuales tipo
                            aprobadas y estándares equivalentes de protección de datos. Esto se realiza en cumplimiento de las
                            obligaciones establecidas en la Sección 10 de las Condiciones de la Plataforma de Meta respecto a
                            transferencias internacionales.
                        </p>
                    </section>

                    <div className="border-t border-border/40" />

                    {/* ── 14. Legislación Aplicable ── */}
                    <section id="ley-aplicable">
                        <h2 className="font-display text-xl font-semibold text-foreground mb-4">14. Legislación aplicable y jurisdicción</h2>
                        <p className="text-sm mb-3">
                            Estos Términos se regirán e interpretarán de conformidad con las leyes de los Estados Unidos de América
                            y, en particular, del Estado de Florida. Las partes se someten a la jurisdicción exclusiva de los
                            tribunales competentes de Miami-Dade County, Florida, para resolver cualquier controversia derivada
                            de estos Términos.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Para usuarios ubicados en la Unión Europea, se respetarán los derechos que les confiere el RGPD
                            (Reglamento General de Protección de Datos). Para usuarios en Argentina, se observará la Ley 25.326
                            de Protección de Datos Personales y normativa complementaria.
                        </p>
                    </section>

                    <div className="border-t border-border/40" />

                    {/* ── 15. Modificaciones ── */}
                    <section id="modificaciones">
                        <h2 className="font-display text-xl font-semibold text-foreground mb-4">15. Modificaciones de estos Términos</h2>
                        <p className="text-sm">
                            Aurvox Solutions se reserva el derecho de modificar estos Términos en cualquier momento para
                            reflejar cambios normativos, técnicos u operativos. Las modificaciones serán publicadas en esta
                            misma URL con su fecha de última actualización. El uso continuado de los servicios después de la
                            publicación de las modificaciones constituye la aceptación de los nuevos Términos. En caso de
                            cambios sustanciales, se notificará a los Clientes activos con un mínimo de 15 días de antelación
                            a la entrada en vigor.
                        </p>
                    </section>

                    <div className="border-t border-border/40" />

                    {/* ── 16. Relación con la Política de Privacidad ── */}
                    <section id="privacidad">
                        <h2 className="font-display text-xl font-semibold text-foreground mb-4">16. Relación con la Política de Privacidad</h2>
                        <p className="text-sm mb-3">
                            Estos Términos se complementan con nuestra{" "}
                            <Link href="/privacidad" className="text-primary hover:underline font-medium">
                                Política de Privacidad
                            </Link>, que explica de forma detallada:
                        </p>
                        <ul className="space-y-2 pl-4 mb-5">
                            {[
                                "Qué datos recopilamos y cómo los tratamos.",
                                "Las finalidades específicas del tratamiento de datos.",
                                "Cómo los usuarios pueden ejercer sus derechos de acceso, rectificación, eliminación y portabilidad.",
                                "El procedimiento de eliminación de datos vinculados a Meta Platform (Data Deletion Instructions).",
                                "Los datos de contacto del responsable del tratamiento.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                            <p className="text-sm">
                                Conforme a la Sección 4 de las Condiciones de la Plataforma de Meta, nuestra Política de Privacidad
                                está disponible en una URL pública, accesible, sin bloqueo geográfico. No sustituye, modifica ni
                                contradice las Condiciones de la Plataforma de Meta.
                            </p>
                        </div>
                    </section>

                    <div className="border-t border-border/40" />

                    {/* ── 17. Contacto ── */}
                    <section id="contacto">
                        <h2 className="font-display text-xl font-semibold text-foreground mb-4">17. Contacto</h2>
                        <p className="text-sm mb-5">
                            Para consultas sobre estos Términos, solicitudes relacionadas con datos personales, reportes de
                            seguridad o cualquier otra cuestión:
                        </p>

                        <div className="rounded-2xl border border-border/60 bg-card/60 p-6 space-y-3">
                            {[
                                { label: "Responsable", value: "Aurvox Solutions" },
                                { label: "Correo", value: "Aurvox.us@gmail.com" },
                                { label: "Dirección", value: "Miami, FL, United States" },
                                { label: "Términos URL", value: "https://aurvox.dev/terminos-condiciones" },
                                { label: "Privacidad URL", value: "https://aurvox.dev/privacidad" },
                            ].map(({ label, value }) => (
                                <div key={label} className="flex items-start gap-3 text-sm">
                                    <span className="text-muted-foreground w-28 shrink-0">{label}</span>
                                    <span className="text-foreground font-medium break-all">{value}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── References ── */}
                    <div className="border-t border-border/40" />

                    <section>
                        <h2 className="font-display text-xl font-semibold text-foreground mb-4">Referencias normativas</h2>
                        <p className="text-sm mb-4 text-muted-foreground">
                            Estos Términos han sido redactados teniendo en cuenta las siguientes normativas y políticas:
                        </p>
                        <div className="space-y-2">
                            {[
                                { label: "Condiciones de la Plataforma de Meta", url: "https://developers.facebook.com/terms/" },
                                { label: "Política de Mensajes de WhatsApp Business", url: "https://www.whatsapp.com/legal/business-policy" },
                                { label: "Condiciones del Servicio de WhatsApp Business", url: "https://www.whatsapp.com/legal/business-terms" },
                                { label: "Política de Datos de Meta", url: "https://www.facebook.com/privacy/policy/" },
                                { label: "Documentación para Desarrolladores de Meta", url: "https://developers.facebook.com/docs/" },
                            ].map(({ label, url }) => (
                                <a
                                    key={url}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2.5 text-sm text-primary hover:underline"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                    {label}
                                </a>
                            ))}
                        </div>
                    </section>
                </div>

                {/* ─── Footer Navigation ─── */}
                <div className="mt-16 pt-8 border-t border-border/40 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                        Volver al inicio
                    </Link>
                    <Link
                        href="/privacidad"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 text-sm font-medium"
                    >
                        <Shield className="w-4 h-4" />
                        Política de Privacidad
                    </Link>
                </div>
            </main>
        </div>
    )
}
