# FEATURES.md — Roadmap OfertaCore

> Documentacion de features para desarrollo. Cada feature tiene contexto, user stories,
> enfoque tecnico, archivos afectados, cambios de DB, dependencias y criterios de aceptacion.
>
> **Ultima actualizacion:** Febrero 2026

---

## Indice

### Corto Plazo (1-2 semanas) — Cerrar el MVP
- [F-01: Pagina de Canje para Staff](#f-01-pagina-de-canje-para-staff)
- [F-02: Soporte Multi-Tipo de Campana](#f-02-soporte-multi-tipo-de-campana)
- [F-03: Rate Limiting en /api/submit](#f-03-rate-limiting-en-apisubmit)
- [F-04: Analytics de Funnel Completo](#f-04-analytics-de-funnel-completo)
- [F-05: WhatsApp Template Multilenguaje](#f-05-whatsapp-template-multilenguaje)

### Mediano Plazo (1-2 meses) — Diferenciadores
- [F-06: Spin Wheel (Ruleta de Premios)](#f-06-spin-wheel-ruleta-de-premios)
- [F-07: Dashboard del Restaurante](#f-07-dashboard-del-restaurante)
- [F-08: Campana de Cumpleanos](#f-08-campana-de-cumpleanos)
- [F-09: Email Fallback](#f-09-email-fallback)
- [F-10: Multi-Campana Activa](#f-10-multi-campana-activa)
- [F-17: Canje Autenticado por Empleado](#f-17-canje-autenticado-por-empleado)

### Largo Plazo (3+ meses) — Escalar el Negocio
- [F-11: Modelo Multi-Tenant](#f-11-modelo-multi-tenant)
- [F-12: Billing con Stripe](#f-12-billing-con-stripe)
- [F-13: Sistema de Referidos](#f-13-sistema-de-referidos)
- [F-14: Analytics Avanzados y Reportes](#f-14-analytics-avanzados-y-reportes)
- [F-15: API Publica y Webhooks](#f-15-api-publica-y-webhooks)
- [F-16: App Mobile para Staff](#f-16-app-mobile-para-staff)

### QR & Tracking
- [F-18: QR Codes con Tracking y Analytics](#f-18-qr-codes-con-tracking-y-analytics)

---

## Corto Plazo (1-2 semanas)

---

### F-01: Pagina de Canje para Staff

**Prioridad:** CRITICA
**Esfuerzo estimado:** 2-3 dias
**Depende de:** Nada (puede empezar ya)

#### Contexto

Hoy el cliente recibe un codigo de 6 caracteres (ej: `ZEZ26G`) en la pantalla de exito y por WhatsApp. Pero el mozo/staff del restaurante **no tiene forma de validar ese codigo**. Sin esta feature, el producto no es funcional en produccion.

La tabla `redemptions` ya existe en el schema con trigger `handle_redemption()` que automaticamente:
- Cambia `signups.status` de `pending` a `claimed`
- Actualiza `contacts.last_redeemed_at`
- Incrementa `campaign_prizes.current_redemptions`

#### User Stories

1. **Como mozo**, quiero ingresar un codigo de 6 caracteres y ver si es valido, para saber si le doy el aperitivo al cliente.
2. **Como mozo**, quiero ver que premio corresponde al codigo, para saber que servir.
3. **Como mozo**, quiero marcar el codigo como canjeado con un solo tap, para que no se use dos veces.
4. **Como manager**, quiero que la pagina de canje no requiera login (en esta primera version), para que cualquier mozo la pueda usar rapido.

#### Enfoque Tecnico

**Ruta:** `app/redeem/page.tsx` — Pagina publica (sin auth en V1, se agrega auth en F-07)

**Flujo:**
```
1. Staff abre /redeem
2. Ve un input grande para ingresar codigo (6 chars, uppercase auto)
3. Escribe/pega el codigo → click "Verificar"
4. POST /api/redeem con { code, restaurant_id }
5. API busca el signup por redemption_code
6. Si es valido y pending:
   → Muestra: nombre del cliente, premio, fecha de creacion, estado
   → Boton "Canjear" (confirmar)
7. Si no es valido, expirado, o ya canjeado:
   → Muestra error con razon especifica
8. Al confirmar canje:
   → POST /api/redeem/confirm con { signup_id, redeemed_by }
   → INSERT en redemptions (trigger actualiza todo)
   → Pantalla de exito "Codigo canjeado"
```

**API Routes:**

```typescript
// app/api/redeem/route.ts — Buscar codigo
// POST { code: string, restaurant_id: string }
// Returns: signup + contact + prize + campaign info
// Uses: supabaseAdmin (service_role) para leer signups sin RLS

// app/api/redeem/confirm/route.ts — Confirmar canje
// POST { signup_id: string, redeemed_by?: string }
// INSERT into redemptions → trigger actualiza signup.status
// Uses: supabaseAdmin (service_role)
```

#### Archivos a Crear

| Archivo | Descripcion |
|---------|-------------|
| `app/redeem/page.tsx` | Pagina de canje (server component, carga restaurant_id del env) |
| `components/redeem/redeem-form.tsx` | Client component: input de codigo + verificacion + confirmacion |
| `components/redeem/code-details.tsx` | Muestra detalles del codigo verificado (contacto, premio, status) |
| `app/api/redeem/route.ts` | API: buscar signup por codigo |
| `app/api/redeem/confirm/route.ts` | API: confirmar canje (INSERT redemption) |

#### Archivos a Modificar

| Archivo | Cambio |
|---------|--------|
| `lib/i18n.ts` | Agregar seccion `redeem` con traducciones EN/ES |

#### Cambios de DB

Ninguno. La tabla `redemptions` y el trigger `handle_redemption()` ya existen.

#### RPC Nueva (opcional, para simplificar)

```sql
-- Buscar signup por codigo con toda la info necesaria
CREATE OR REPLACE FUNCTION public.lookup_redemption_code(
  p_code TEXT,
  p_restaurant_id UUID
) RETURNS JSONB
LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  v_result JSONB;
BEGIN
  SELECT jsonb_build_object(
    'signup_id', s.id,
    'redemption_code', s.redemption_code,
    'status', s.status,
    'expires_at', s.expires_at,
    'created_at', s.created_at,
    'contact', jsonb_build_object(
      'name', COALESCE(c.first_name || COALESCE(' ' || c.last_name, ''), ''),
      'phone', c.phone
    ),
    'prize', CASE
      WHEN cp.id IS NOT NULL THEN jsonb_build_object(
        'label', cp.label,
        'description', cp.description,
        'type', cp.prize_type::TEXT,
        'value', cp.prize_value
      )
      ELSE NULL
    END,
    'campaign', jsonb_build_object(
      'name', COALESCE(cam.display_name, cam.name),
      'offer_text', cam.offer_text
    )
  ) INTO v_result
  FROM public.signups s
  JOIN public.contacts c ON c.id = s.contact_id
  JOIN public.campaigns cam ON cam.id = s.campaign_id
  LEFT JOIN public.campaign_prizes cp ON cp.id = s.prize_id
  WHERE s.redemption_code = UPPER(TRIM(p_code))
    AND cam.restaurant_id = p_restaurant_id;

  RETURN COALESCE(v_result, jsonb_build_object('error', 'not_found'));
END;
$$;
```

#### Criterios de Aceptacion

- [x] Staff puede ingresar un codigo de 6 caracteres
- [x] Input auto-convierte a uppercase y limpia espacios
- [x] Codigo valido (pending) muestra: nombre, telefono, premio, fecha, "Canjear"
- [x] Codigo ya canjeado muestra error "Este codigo ya fue utilizado" con fecha de canje
- [x] Codigo expirado muestra error "Este codigo ha expirado"
- [x] Codigo inexistente muestra error "Codigo no encontrado"
- [x] Al confirmar canje, `signups.status` cambia a `claimed`
- [x] Al confirmar canje, se crea un row en `redemptions`
- [x] i18n funciona (EN/ES)
- [x] Pagina es mobile-friendly (el mozo la usa desde el celular)

---

### F-02: Soporte Multi-Tipo de Campana

**Prioridad:** CRITICA
**Esfuerzo estimado:** 1 dia
**Depende de:** Nada

#### Contexto

Actualmente `getActiveCampaign()` en `lib/queries.ts` tiene hardcodeado `.eq("campaign_type", "appetizer")`. Esto bloquea todos los demas tipos de campana (spin_wheel, discount, birthday, referral, custom).

El schema ya soporta todos los tipos. Solo falta quitar el filtro hardcodeado.

#### User Stories

1. **Como restaurante**, quiero poder crear campanas de cualquier tipo y que la landing page las cargue correctamente.
2. **Como desarrollador**, quiero que `getActiveCampaign()` sea flexible para soportar cualquier tipo de campana.

#### Enfoque Tecnico

**Cambio simple:** Quitar `.eq("campaign_type", "appetizer")` de `getActiveCampaign()`.

La funcion cargaria la campana activa mas reciente sin importar el tipo. Si en el futuro se necesita filtrar por tipo, se puede agregar un parametro opcional.

Adicionalmente, la landing page deberia adaptar los textos segun el tipo de campana. Por ejemplo, el boton de submit:
- `appetizer` → "Obtener Mi Aperitivo Gratis"
- `discount` → "Obtener Mi Descuento"
- `spin_wheel` → "Participar"
- `custom` → Usar `campaign.offer_text`

#### Archivos a Modificar

| Archivo | Cambio |
|---------|--------|
| `lib/queries.ts` | Quitar `.eq("campaign_type", "appetizer")` de `getActiveCampaign()` |
| `lib/i18n.ts` | Agregar traducciones por tipo de campana (submitButton variantes) |
| `components/lead-form/restaurant-form.tsx` | Adaptar texto del boton segun `campaign.campaign_type` |
| `components/lead-form/form-header.tsx` | Adaptar badge y titulo segun tipo de campana |

#### Cambios de DB

Ninguno.

#### Criterios de Aceptacion

- [ ] Landing page carga campanas de cualquier tipo (no solo appetizer)
- [ ] Si no hay campana activa, muestra 404
- [ ] Boton de submit muestra texto apropiado para el tipo de campana
- [ ] Header muestra badge/titulo apropiado para el tipo de campana
- [ ] Campanas existentes tipo appetizer siguen funcionando igual

---

### F-03: Rate Limiting en /api/submit

**Prioridad:** ALTA
**Esfuerzo estimado:** 0.5 dias
**Depende de:** Nada

#### Contexto

Actualmente `/api/submit` no tiene proteccion contra abuso. Alguien podria:
- Hacer spam de submissions con distintos telefonos
- Hacer brute force de codigos (aunque el cooldown ayuda)
- Saturar la base de datos con inserts

El rate limiting basico protege contra estos escenarios.

#### User Stories

1. **Como sistema**, quiero limitar las submissions a un maximo razonable por IP, para evitar abuso.
2. **Como usuario real**, no quiero ser bloqueado por usar el formulario normalmente (1 submit por sesion).

#### Enfoque Tecnico

**Opcion recomendada:** Rate limiting in-memory usando un `Map<string, number[]>` en el API route.

```typescript
// Estructura: IP -> array de timestamps (ultimos N minutos)
// Limites: 5 submissions por IP por 15 minutos
// Limpieza: timestamps > 15 min se borran automaticamente
```

**Por que no Redis/Upstash:** En single-tenant con un solo Vercel deploy, un rate limiter in-memory es suficiente. No vale la pena agregar dependencia externa para esta escala. Si se migra a multi-tenant (F-11), se reemplaza con Upstash Redis.

**Alternativa Vercel:** Se podria usar `@vercel/firewall` o middleware de Next.js con headers `x-forwarded-for`, pero el enfoque in-memory es mas simple y no depende de Vercel.

#### Archivos a Crear

| Archivo | Descripcion |
|---------|-------------|
| `lib/rate-limit.ts` | Rate limiter in-memory con Map + TTL cleanup |

#### Archivos a Modificar

| Archivo | Cambio |
|---------|--------|
| `app/api/submit/route.ts` | Importar rate limiter, check al inicio del POST handler |

#### Cambios de DB

Ninguno.

#### Criterios de Aceptacion

- [ ] Primer submit de una IP funciona normal
- [ ] 6to submit en 15 minutos desde la misma IP devuelve 429
- [ ] Respuesta 429 incluye header `Retry-After` con segundos restantes
- [ ] Mensaje de error es claro y localizable ("Demasiados intentos, espera unos minutos")
- [ ] El rate limit se resetea despues de 15 minutos
- [ ] El rate limiter no consume memoria indefinidamente (cleanup periodico)

---

### F-04: Analytics de Funnel Completo

**Prioridad:** ALTA
**Esfuerzo estimado:** 1 dia
**Depende de:** Nada

#### Contexto

Actualmente solo se trackean 2 eventos: `page_view` y `form_submit`. El schema define muchos mas event types que nunca se disparan:

```
qr_scan, page_view, form_start, form_field_focus, form_validation_error,
form_submit, code_copy, directions_click, menu_click, redemption
```

Sin estos eventos intermedios, es imposible medir:
- Tasa de abandono del formulario (cuantos ven la pagina pero no empiezan a llenar)
- En que campo abandonan (telefono? email? terminos?)
- Cuantos copian el codigo vs solo lo muestran
- Tasa de conversion real: views → starts → completes → redemptions

#### User Stories

1. **Como dueño**, quiero saber cuantas personas ven la pagina vs cuantas llenan el formulario, para medir la efectividad del QR.
2. **Como dueño**, quiero saber en que campo del formulario la gente abandona, para simplificar el proceso.
3. **Como dueño**, quiero saber cuantas personas copian el codigo, para saber si entienden el flujo.

#### Enfoque Tecnico

Agregar eventos en los puntos clave del flujo del formulario y la success screen:

| Evento | Cuando se dispara | Metadata |
|--------|-------------------|----------|
| `form_start` | Primer focus en cualquier campo del formulario | `{ first_field: "name" }` |
| `form_field_focus` | Cada vez que un campo recibe focus | `{ field: "phone" }` |
| `form_validation_error` | Cuando un campo falla validacion on-blur | `{ field: "email", error: "invalid" }` |
| `form_submit` | Ya existe | — |
| `form_error` | Cuando el submit falla (409, 500, etc.) | `{ reason: "cooldown", status: 409 }` |
| `code_copy` | Click en boton "Copiar Codigo" | — |
| `code_view` | Success screen se muestra | `{ code: "ZEZ26G" }` |

**Nota:** No trackear `form_field_focus` en cada focus para no saturar analytics. Solo trackear el **primer** focus de cada campo por sesion.

#### Archivos a Modificar

| Archivo | Cambio |
|---------|--------|
| `components/lead-form/restaurant-form.tsx` | Agregar `form_start` (primer focus), `form_error` (submit falla) |
| `components/lead-form/success-screen.tsx` | Agregar `code_copy` (click copiar), `code_view` (mount) |
| `lib/analytics.ts` | Agregar helper `trackOnce()` que solo trackea un evento una vez por sesion |

#### Cambios de DB

Ninguno. La tabla `analytics_events` ya soporta cualquier `event_type` como TEXT.

#### Criterios de Aceptacion

- [ ] `form_start` se dispara al primer focus en el formulario (una sola vez)
- [ ] `form_error` se dispara cuando el submit devuelve error (con reason y status)
- [ ] `code_view` se dispara cuando se muestra la success screen
- [ ] `code_copy` se dispara cuando el usuario copia el codigo
- [ ] Ningun evento se duplica en la misma sesion (excepto `form_field_focus` si se quisiera)
- [ ] Los eventos no bloquean la UI (fire-and-forget)
- [ ] Los eventos incluyen `session_id` para poder reconstruir el funnel por sesion

---

### F-05: WhatsApp Template Multilenguaje

**Prioridad:** MEDIA
**Esfuerzo estimado:** 0.5 dias
**Depende de:** Nada

#### Contexto

El template de WhatsApp esta hardcodeado en espanol:

```typescript
// app/api/submit/route.ts linea 169
template: {
  name: "coupon_confirmation",
  language: { code: "es" },
```

Si el restaurante tiene `settings.language = "en"`, el WhatsApp se envia en espanol igual. Ademas, el locale del cliente (EN/ES) no se usa para decidir el idioma del mensaje.

#### User Stories

1. **Como cliente que lleno el formulario en ingles**, quiero recibir el WhatsApp en ingles.
2. **Como restaurante configurado en ingles**, quiero que los WhatsApp se envien en ingles por defecto.

#### Enfoque Tecnico

1. El formulario ya envia `locale` en el payload del submit
2. Usar `locale` del payload para elegir el template language
3. Meta WhatsApp requiere templates aprobados por idioma. Se necesitan 2 templates:
   - `coupon_confirmation` (es)
   - `coupon_confirmation` (en)
4. Si el template en el idioma del cliente no existe, fallback al idioma del restaurante

```typescript
// En sendWhatsApp():
const templateLanguage = body.locale ?? restaurant.settings?.language ?? "es"

template: {
  name: "coupon_confirmation",
  language: { code: templateLanguage },
}
```

#### Archivos a Modificar

| Archivo | Cambio |
|---------|--------|
| `app/api/submit/route.ts` | Pasar `locale` a `sendWhatsApp()`, usar para `language.code` |

#### Cambios de DB

Ninguno.

#### Pre-requisito Externo

- Crear y aprobar el template `coupon_confirmation` en ingles en Meta Business Manager
- El template en ingles debe tener los mismos parametros: `{{1}}` nombre, `{{2}}` codigo, `{{3}}` oferta

#### Criterios de Aceptacion

- [ ] Si el formulario se lleno en ingles, el WhatsApp se envia con `language: { code: "en" }`
- [ ] Si el formulario se lleno en espanol, se mantiene `language: { code: "es" }`
- [ ] Si no hay locale en el payload, se usa el idioma del restaurante como fallback
- [ ] El `messages_log` registra el template language usado

---

## Mediano Plazo (1-2 meses)

---

### F-06: Spin Wheel (Ruleta de Premios)

**Prioridad:** ALTA
**Esfuerzo estimado:** 5-7 dias
**Depende de:** F-02 (multi-tipo de campana)

#### Contexto

El schema ya esta 100% preparado para spin wheel:
- `campaign_prizes` tiene `probability` (0-1, deben sumar 1), `color` (hex para segmentos), `display_order` (posicion en la rueda)
- `campaign.config` soporta: `spin_duration_ms`, `min_spins`, `max_spins`, `sound_enabled`, `show_recent_winners`
- `signups.prize_id` guarda que premio gano
- `signups.metadata` puede guardar `segment_index` y `spin_duration_ms`
- Eventos predefinidos: `wheel_unlock`, `spin_start`, `spin_complete`, `prize_reveal`

Solo falta el UI (componente de la rueda + animacion + flujo de interaccion).

#### User Stories

1. **Como cliente**, quiero girar una ruleta despues de llenar el formulario, para descubrir mi premio de forma divertida.
2. **Como cliente**, quiero ver los premios posibles en la rueda (colores, etiquetas), para sentir emocion.
3. **Como cliente**, quiero que la rueda gire con animacion fluida y se detenga en mi premio, para que se sienta real.
4. **Como dueño**, quiero configurar las probabilidades de cada premio, para controlar el costo de la campana.
5. **Como dueño**, quiero que algunos premios tengan inventario limitado (ej: 10 grand prizes), para no regalar de mas.

#### Enfoque Tecnico

**Flujo:**
```
1. Cliente llena formulario (igual que appetizer)
2. Submit crea contacto + signup (SIN prize_id aun)
3. En vez de success screen, se muestra la RULETA
4. Cliente hace tap en "Girar"
5. Frontend selecciona premio (weighted random client-side)
6. Rueda gira con animacion CSS (rotation + easing)
7. Al detenerse, muestra resultado
8. POST /api/spin-result con { signup_id, prize_id, segment_index }
9. API actualiza signup.prize_id y signup.metadata
10. Success screen muestra el premio ganado
```

**Seleccion de premio (client-side):**
```typescript
function selectPrize(prizes: CampaignPrize[]): CampaignPrize {
  // Filtrar premios activos con inventario disponible
  const available = prizes.filter(p =>
    p.is_active && (!p.max_redemptions || p.current_redemptions < p.max_redemptions)
  )

  // Weighted random selection
  const rand = Math.random()
  let cumulative = 0
  for (const prize of available) {
    cumulative += prize.probability ?? 0
    if (rand <= cumulative) return prize
  }
  return available[available.length - 1] // fallback
}
```

**Por que client-side:** La seleccion se hace en el frontend para que la animacion sea fluida. El backend valida que el premio seleccionado sea posible (activo, con inventario). Si un usuario malicioso envia un prize_id de un premio agotado, el backend rechaza.

**Animacion CSS:**
```css
.wheel {
  transition: transform;
  transition-timing-function: cubic-bezier(0.17, 0.67, 0.12, 0.99);
}
```
La duracion viene de `campaign.config.spin_duration_ms` (default 6000ms).
El angulo final se calcula: `(spins * 360) + segment_angle_offset`.

**Componente de la Rueda:**
- Canvas o SVG con segmentos de colores
- Cada segmento usa `prize.color` del DB
- Labels en cada segmento con `prize.label`
- Flecha/pointer fija en la parte superior
- Boton "Girar" debajo de la rueda

#### Archivos a Crear

| Archivo | Descripcion |
|---------|-------------|
| `components/spin-wheel/wheel.tsx` | Componente visual de la rueda (SVG/Canvas) |
| `components/spin-wheel/wheel-container.tsx` | Container con logica de spin + resultado |
| `components/spin-wheel/prize-reveal.tsx` | Modal/card que muestra el premio ganado |
| `app/api/spin-result/route.ts` | API: guardar resultado del spin (update signup) |
| `lib/spin.ts` | Utilidades: selectPrize(), calculateRotation() |

#### Archivos a Modificar

| Archivo | Cambio |
|---------|--------|
| `components/lead-form/restaurant-form.tsx` | Despues del submit, si `campaign_type === "spin_wheel"`, mostrar la rueda en vez de success screen |
| `lib/i18n.ts` | Agregar seccion `spinWheel` con traducciones |
| `app/api/submit/route.ts` | Para spin_wheel, no asignar prize_id en el signup inicial |

#### Cambios de DB

```sql
-- RPC para actualizar resultado del spin (validado server-side)
CREATE OR REPLACE FUNCTION public.record_spin_result(
  p_signup_id UUID,
  p_prize_id UUID,
  p_segment_index INT,
  p_spin_duration_ms INT
) RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  v_signup RECORD;
  v_prize RECORD;
BEGIN
  -- Validar signup existe y no tiene premio asignado
  SELECT * INTO v_signup FROM public.signups WHERE id = p_signup_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'signup_not_found');
  END IF;
  IF v_signup.prize_id IS NOT NULL THEN
    RETURN jsonb_build_object('error', 'already_assigned');
  END IF;

  -- Validar premio activo y con inventario
  SELECT * INTO v_prize FROM public.campaign_prizes
  WHERE id = p_prize_id AND campaign_id = v_signup.campaign_id AND is_active = true;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'prize_not_available');
  END IF;
  IF v_prize.max_redemptions IS NOT NULL AND v_prize.current_redemptions >= v_prize.max_redemptions THEN
    RETURN jsonb_build_object('error', 'prize_depleted');
  END IF;

  -- Asignar premio
  UPDATE public.signups
  SET prize_id = p_prize_id,
      metadata = jsonb_build_object('segment_index', p_segment_index, 'spin_duration_ms', p_spin_duration_ms)
  WHERE id = p_signup_id;

  -- Recalcular expires_at si el premio tiene override
  IF v_prize.expiry_days_override IS NOT NULL THEN
    UPDATE public.signups
    SET expires_at = now() + (v_prize.expiry_days_override || ' days')::INTERVAL
    WHERE id = p_signup_id;
  END IF;

  RETURN jsonb_build_object('success', true, 'prize_label', v_prize.label);
END;
$$;
```

#### Criterios de Aceptacion

- [ ] Rueda muestra todos los premios activos con colores del DB
- [ ] Labels son legibles en cada segmento
- [ ] Al tocar "Girar", la rueda gira con animacion fluida (~6s)
- [ ] La rueda se detiene en el premio correcto (weighted random)
- [ ] Premio ganado se muestra con animacion (modal/card)
- [ ] Resultado se guarda en DB (signup.prize_id, signup.metadata)
- [ ] Premio agotado no sale como resultado
- [ ] "try_again" funciona como resultado valido (no da codigo pero muestra mensaje)
- [ ] Success screen despues del spin muestra el premio + codigo
- [ ] Eventos trackeados: `spin_start`, `spin_complete`, `prize_reveal`
- [ ] Sound on/off segun `campaign.config.sound_enabled`
- [ ] Mobile-friendly (touch para girar, responsive)

---

### F-07: Dashboard del Restaurante

**Prioridad:** CRITICA
**Esfuerzo estimado:** 10-14 dias
**Depende de:** Nada (puede hacerse en paralelo con otros features)

#### Contexto

Actualmente el manager/dueño del restaurante **no tiene ninguna visibilidad ni control** sobre la operacion. No puede:
- Ver cuantos leads captura ni cuantos canjean
- Gestionar campanas (crear, pausar, editar)
- Ver los codigos emitidos ni su estado
- Ver el historial de canjes ni quien los hizo
- Ver los mensajes enviados (WhatsApp) ni su estado
- Exportar contactos para marketing externo
- Configurar branding ni ajustes del restaurante

Toda esta data existe en Supabase pero no hay UI. El schema ya tiene toda la infraestructura:
- `restaurant_users` con roles (owner, manager, staff) + RLS policies con `user_has_restaurant_access()`
- `get_campaign_stats()` RPC que devuelve stats agregados
- Supabase Auth configurado
- Todas las tablas con RLS que scope por `restaurant_id`

#### User Stories

**Autenticacion:**
1. **Como manager**, quiero hacer login con email/password para acceder al dashboard de forma segura.
2. **Como owner**, quiero invitar a otros usuarios (managers, staff) para que accedan al dashboard con permisos limitados.

**Overview / Home:**
3. **Como manager**, quiero ver un resumen rapido al entrar: leads hoy, total canjes, tasa de conversion, codigos pendientes.
4. **Como manager**, quiero ver un grafico de signups/canjes por dia de los ultimos 30 dias para ver tendencias.

**Campanas:**
5. **Como manager**, quiero ver todas mis campanas (activas e inactivas) con sus estadisticas.
6. **Como manager**, quiero crear una nueva campana eligiendo tipo, oferta, premios y configuracion.
7. **Como manager**, quiero activar/desactivar una campana con un toggle.
8. **Como manager**, quiero editar los detalles de una campana existente (nombre, oferta, fechas, cooldown).
9. **Como manager**, quiero ver los premios de cada campana y ajustar probabilidades/inventario.

**Contactos:**
10. **Como manager**, quiero ver todos los contactos capturados con busqueda por nombre, telefono o email.
11. **Como manager**, quiero ver el detalle de un contacto: todos sus signups, canjes, tags y mensajes.
12. **Como manager**, quiero exportar mis contactos a CSV para usarlos en herramientas de marketing externo.
13. **Como manager**, quiero agregar/quitar tags a contactos para segmentarlos.

**Codigos / Signups:**
14. **Como manager**, quiero ver todos los codigos emitidos con su estado (pending, claimed, expired).
15. **Como manager**, quiero filtrar codigos por campana, estado y rango de fecha.
16. **Como manager**, quiero ver el detalle de un codigo: contacto, premio, fecha de emision, expiracion, y si fue canjeado.

**Canjes / Redemptions:**
17. **Como manager**, quiero ver el historial completo de canjes con fecha, codigo, empleado y contacto.
18. **Como manager**, quiero filtrar canjes por campana, empleado y rango de fecha.
19. **Como manager**, quiero saber que empleado canjeo cada codigo para control interno.

**Mensajes:**
20. **Como manager**, quiero ver los mensajes WhatsApp enviados y su estado (sent, delivered, read, failed).
21. **Como manager**, quiero ver los mensajes que fallaron para poder reenviarlos o contactar al cliente.

**Configuracion:**
22. **Como owner**, quiero editar el branding de mi restaurante (nombre, logo, colores).
23. **Como owner**, quiero ver/editar la configuracion de WhatsApp.
24. **Como owner**, quiero gestionar ubicaciones (agregar/editar/desactivar locations).

#### Enfoque Tecnico

**Rutas del dashboard:**
```
/dashboard                        → Redirect a login si no autenticado
/dashboard/login                  → Login con email/password (Supabase Auth)
/dashboard/overview               → KPIs + graficos + actividad reciente
/dashboard/campaigns              → Lista de campanas con stats resumen
/dashboard/campaigns/new          → Crear nueva campana
/dashboard/campaigns/[id]         → Detalle de campana + edicion + premios
/dashboard/contacts               → Lista de contactos con busqueda + filtros + export CSV
/dashboard/contacts/[id]          → Detalle de contacto (signups, canjes, tags, mensajes)
/dashboard/codes                  → Lista de codigos/signups con filtros
/dashboard/codes/[id]             → Detalle de codigo (contacto, premio, estado, canje)
/dashboard/redemptions            → Historial de canjes con filtros
/dashboard/messages               → Log de mensajes WhatsApp/email con estado
/dashboard/settings               → Config del restaurante (branding, WhatsApp, locations)
/dashboard/settings/team          → Gestion de usuarios (owner only)
```

**Auth con Supabase:**
- Login via `supabase.auth.signInWithPassword()`
- Session en cookie (SSR compatible con `@supabase/ssr`)
- Middleware de Next.js que chequea session en rutas `/dashboard/*`
- RLS policies ya existen — el authenticated user solo ve data de sus restaurantes
- Roles: owner (todo), manager (todo menos team/billing), staff (solo overview + canjes)

**Permisos por rol:**

| Seccion | Owner | Manager | Staff |
|---------|-------|---------|-------|
| Overview | Full | Full | Solo KPIs basicos |
| Campaigns | CRUD | CRUD | Read-only |
| Contacts | Full + Export | Full + Export | Read-only |
| Codes | Full | Full | Read-only |
| Redemptions | Full | Full | Solo sus canjes |
| Messages | Full | Full | No acceso |
| Settings | Full | Read-only | No acceso |
| Team | Full | No acceso | No acceso |

**Layout del dashboard:**
- Sidebar izquierdo con:
  - Logo/nombre del restaurante
  - Navegacion por secciones (iconos + labels)
  - User info + rol badge al fondo
  - Logout button
- Header con:
  - Breadcrumb de la pagina actual
  - Acciones contextuales (ej: "Nueva Campana", "Exportar CSV")
- Responsive: sidebar se convierte en bottom nav o hamburger en mobile

**KPIs en Overview:**

| KPI | Descripcion | Periodo |
|-----|-------------|---------|
| Total Signups | Leads capturados | Hoy / Semana / Total |
| Total Canjes | Codigos canjeados | Hoy / Semana / Total |
| Tasa de Conversion | Canjes / Signups % | Total |
| Pendientes | Codigos sin canjear | Actual |
| Expirados | Codigos que expiraron sin canjearse | Total |
| WhatsApp Delivery Rate | Mensajes delivered / sent % | Total |

- Grafico de lineas: signups + canjes por dia (ultimos 30 dias)
- Mini-tabla: ultimos 5 signups recientes
- Mini-tabla: ultimos 5 canjes recientes

**Tabla generica (DataTable):**
Componente reutilizable con:
- Busqueda global (texto libre)
- Filtros por columna (select, date range)
- Ordenamiento por columna (asc/desc)
- Paginacion server-side (offset + limit via Supabase)
- Acciones por fila (ver detalle, editar, eliminar)
- Export CSV (descarga client-side de data filtrada)

**Campanas — CRUD:**
```
Lista:
- Card o tabla por campana con: nombre, tipo badge, estado (activa/inactiva toggle), stats inline
- Boton "Nueva Campana"

Detalle/Edicion:
- Tabs: General | Premios | Estadisticas
- General: nombre, tipo, oferta, fechas, cooldown, config JSONB
- Premios: tabla editable con label, tipo, valor, probabilidad, color, inventario
- Estadisticas: KPIs + grafico especificos de esa campana (via get_campaign_stats RPC)
```

**Contactos — Lista + Detalle:**
```
Lista:
- Columnas: nombre, telefono, email, signups count, ultimo signup, tags
- Busqueda por nombre/telefono/email
- Filtro por tag
- Export CSV

Detalle:
- Info de contacto (nombre, telefono, email, birthday, opt-ins)
- Timeline: todos los signups con estado + canjes
- Tags: agregar/quitar
- Mensajes enviados
```

#### Archivos a Crear

| Archivo | Descripcion |
|---------|-------------|
| **Layout & Auth** | |
| `middleware.ts` | Auth middleware: /dashboard/* requiere session |
| `lib/supabase-server.ts` | Supabase client SSR con cookies (`@supabase/ssr`) |
| `app/dashboard/layout.tsx` | Layout con sidebar + auth check + role resolution |
| `app/dashboard/page.tsx` | Redirect a /dashboard/overview |
| `app/dashboard/login/page.tsx` | Login form |
| **Secciones** | |
| `app/dashboard/overview/page.tsx` | KPIs + graficos + actividad reciente |
| `app/dashboard/campaigns/page.tsx` | Lista de campanas |
| `app/dashboard/campaigns/new/page.tsx` | Formulario crear campana |
| `app/dashboard/campaigns/[id]/page.tsx` | Detalle + edicion de campana |
| `app/dashboard/contacts/page.tsx` | Lista de contactos |
| `app/dashboard/contacts/[id]/page.tsx` | Detalle de contacto |
| `app/dashboard/codes/page.tsx` | Lista de codigos/signups |
| `app/dashboard/codes/[id]/page.tsx` | Detalle de codigo |
| `app/dashboard/redemptions/page.tsx` | Historial de canjes |
| `app/dashboard/messages/page.tsx` | Log de mensajes |
| `app/dashboard/settings/page.tsx` | Config del restaurante |
| `app/dashboard/settings/team/page.tsx` | Gestion de equipo (owner) |
| **Componentes** | |
| `components/dashboard/sidebar.tsx` | Navegacion lateral con rol-based visibility |
| `components/dashboard/kpi-card.tsx` | Card de KPI reutilizable (valor, label, trend, icono) |
| `components/dashboard/data-table.tsx` | Tabla generica con paginacion, filtros, sort, export |
| `components/dashboard/chart-line.tsx` | Grafico de lineas (signups/canjes por dia) |
| `components/dashboard/campaign-card.tsx` | Card de campana con stats inline |
| `components/dashboard/campaign-form.tsx` | Formulario crear/editar campana |
| `components/dashboard/prize-editor.tsx` | Editor de premios (tabla editable) |
| `components/dashboard/contact-timeline.tsx` | Timeline de actividad de un contacto |
| `components/dashboard/status-badge.tsx` | Badge de estado reutilizable (pending/claimed/expired) |
| `components/dashboard/role-guard.tsx` | Wrapper que oculta secciones segun rol |
| **API** | |
| `app/api/dashboard/export-contacts/route.ts` | Export CSV de contactos (server-side stream) |

#### Archivos a Modificar

Ninguno de los existentes. El dashboard es un modulo nuevo e independiente.

#### Dependencias Nuevas (npm)

```bash
pnpm add @supabase/ssr          # Supabase client para SSR con cookies
pnpm add recharts               # Graficos (o lightweight: chart.js con react-chartjs-2)
```

Alternativa sin dependencia de charts: usar una libreria lightweight como `@tremor/react` que incluye charts + data table components.

#### Cambios de DB

```sql
-- No se necesitan cambios de schema.
-- Solo crear el primer usuario owner:

-- 1. Crear usuario en Supabase Auth (via Dashboard > Auth > Users > Add User)
-- 2. Linkear con el restaurante:
INSERT INTO restaurant_users (user_id, restaurant_id, role)
VALUES ('<auth_user_id>', '<restaurant_id>', 'owner');
```

RPC existentes que usa el dashboard:
- `get_campaign_stats(p_campaign_id)` — stats agregados por campana
- `lookup_redemption_code(p_code, p_restaurant_id)` — buscar codigo

RPCs nuevas recomendadas:

```sql
-- Stats generales del restaurante (para Overview)
CREATE OR REPLACE FUNCTION public.get_restaurant_dashboard_stats(
  p_restaurant_id UUID
) RETURNS JSONB
LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path TO ''
AS $$
DECLARE
  v_result JSONB;
BEGIN
  SELECT jsonb_build_object(
    'signups_today', (
      SELECT COUNT(*) FROM public.signups s
      JOIN public.campaigns c ON c.id = s.campaign_id
      WHERE c.restaurant_id = p_restaurant_id
        AND s.created_at >= CURRENT_DATE
    ),
    'signups_week', (
      SELECT COUNT(*) FROM public.signups s
      JOIN public.campaigns c ON c.id = s.campaign_id
      WHERE c.restaurant_id = p_restaurant_id
        AND s.created_at >= date_trunc('week', CURRENT_DATE)
    ),
    'signups_total', (
      SELECT COUNT(*) FROM public.signups s
      JOIN public.campaigns c ON c.id = s.campaign_id
      WHERE c.restaurant_id = p_restaurant_id
    ),
    'redemptions_today', (
      SELECT COUNT(*) FROM public.redemptions r
      WHERE r.campaign_id IN (
        SELECT id FROM public.campaigns WHERE restaurant_id = p_restaurant_id
      )
      AND r.redeemed_at >= CURRENT_DATE
    ),
    'redemptions_total', (
      SELECT COUNT(*) FROM public.redemptions r
      WHERE r.campaign_id IN (
        SELECT id FROM public.campaigns WHERE restaurant_id = p_restaurant_id
      )
    ),
    'pending_codes', (
      SELECT COUNT(*) FROM public.signups s
      JOIN public.campaigns c ON c.id = s.campaign_id
      WHERE c.restaurant_id = p_restaurant_id
        AND s.status = 'pending'
    ),
    'contacts_total', (
      SELECT COUNT(*) FROM public.contacts
      WHERE restaurant_id = p_restaurant_id
    ),
    'messages_failed', (
      SELECT COUNT(*) FROM public.messages_log
      WHERE restaurant_id = p_restaurant_id
        AND status = 'failed'
    )
  ) INTO v_result;

  RETURN v_result;
END;
$$;

-- Signups por dia (para grafico de lineas)
CREATE OR REPLACE FUNCTION public.get_signups_by_day(
  p_restaurant_id UUID,
  p_days INT DEFAULT 30
) RETURNS TABLE(day DATE, signups BIGINT, redemptions BIGINT)
LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  RETURN QUERY
  WITH days AS (
    SELECT generate_series(
      CURRENT_DATE - (p_days - 1),
      CURRENT_DATE,
      '1 day'::INTERVAL
    )::DATE AS day
  ),
  signup_counts AS (
    SELECT s.created_at::DATE AS day, COUNT(*) AS cnt
    FROM public.signups s
    JOIN public.campaigns c ON c.id = s.campaign_id
    WHERE c.restaurant_id = p_restaurant_id
      AND s.created_at >= CURRENT_DATE - p_days
    GROUP BY s.created_at::DATE
  ),
  redemption_counts AS (
    SELECT r.redeemed_at::DATE AS day, COUNT(*) AS cnt
    FROM public.redemptions r
    WHERE r.campaign_id IN (
      SELECT id FROM public.campaigns WHERE restaurant_id = p_restaurant_id
    )
    AND r.redeemed_at >= CURRENT_DATE - p_days
    GROUP BY r.redeemed_at::DATE
  )
  SELECT d.day,
         COALESCE(sc.cnt, 0) AS signups,
         COALESCE(rc.cnt, 0) AS redemptions
  FROM days d
  LEFT JOIN signup_counts sc ON sc.day = d.day
  LEFT JOIN redemption_counts rc ON rc.day = d.day
  ORDER BY d.day;
END;
$$;
```

#### Criterios de Aceptacion

**Auth:**
- [ ] Login funciona con email/password (Supabase Auth)
- [ ] Rutas /dashboard/* redirigen a login si no autenticado
- [ ] Logout funciona correctamente
- [ ] RLS impide que un usuario vea data de otro restaurante
- [ ] Permisos por rol se aplican (owner > manager > staff)

**Overview:**
- [ ] KPIs muestran datos reales de la DB (hoy, semana, total)
- [ ] Grafico de signups/canjes por dia muestra ultimos 30 dias
- [ ] Actividad reciente muestra ultimos 5 signups y 5 canjes

**Campanas:**
- [ ] Lista muestra todas las campanas con tipo badge + stats inline
- [ ] Toggle activa/desactiva campana
- [ ] Crear nueva campana con formulario completo (tipo, oferta, fechas, config)
- [ ] Editar campana existente
- [ ] Editor de premios: agregar/editar/eliminar premios por campana
- [ ] Stats por campana (via `get_campaign_stats` RPC)

**Contactos:**
- [ ] Lista paginada con busqueda por nombre/telefono/email
- [ ] Filtro por tag
- [ ] Export CSV funciona (descarga archivo con todos los contactos filtrados)
- [ ] Detalle de contacto muestra: info, timeline de signups/canjes, tags, mensajes
- [ ] Agregar/quitar tags a un contacto

**Codigos:**
- [ ] Lista de codigos con columnas: codigo, contacto, campana, premio, estado, fecha
- [ ] Filtro por campana, estado (pending/claimed/expired), rango de fecha
- [ ] Detalle de codigo muestra toda la info + canje si existe

**Canjes:**
- [ ] Historial con columnas: codigo, contacto, campana, empleado, fecha
- [ ] Filtro por campana, empleado, rango de fecha

**Mensajes:**
- [ ] Lista de mensajes con columnas: contacto, canal, template, estado, fecha
- [ ] Filtro por estado (sent/delivered/read/failed)
- [ ] Mensajes fallidos resaltados visualmente

**Settings:**
- [ ] Ver/editar nombre, logo, colores del restaurante
- [ ] Ver configuracion de WhatsApp
- [ ] Gestionar locations (CRUD)
- [ ] Gestionar equipo: ver usuarios, invitar nuevo, cambiar rol, desactivar (owner only)

**General:**
- [ ] Mobile-responsive (sidebar colapsa a bottom nav o hamburger)
- [ ] Loading states en todas las tablas y KPIs
- [ ] Empty states cuando no hay data ("No hay campanas aun, crea tu primera")

---

### F-08: Campana de Cumpleanos

**Prioridad:** MEDIA
**Esfuerzo estimado:** 3-4 dias
**Depende de:** F-02 (multi-tipo), F-05 (WhatsApp multilenguaje)

#### Contexto

El campo `birthday` (formato MM-DD) ya existe en la tabla `contacts`. El enum `campaign_type` ya incluye `birthday`. La idea es que los restaurantes puedan enviar automaticamente una promo de cumpleanos a sus contactos.

Hay dos enfoques:
1. **Pasivo:** El cliente ingresa su cumpleanos al llenar el formulario de una campana birthday. Se le genera un codigo que puede canjear en su cumpleanos.
2. **Activo (automatico):** Un cron job revisa diariamente los contactos que cumplen anos hoy y les envia un WhatsApp con un codigo de regalo.

Recomiendo implementar primero el enfoque **pasivo** (mas simple) y despues el **activo** como mejora.

#### User Stories

1. **Como cliente**, quiero registrar mi cumpleanos para recibir un regalo especial ese dia.
2. **Como restaurante**, quiero capturar cumpleanos de mis clientes para enviarles promos automaticas.
3. **Como cliente**, quiero recibir un WhatsApp en mi cumpleanos con un codigo de descuento.

#### Enfoque Tecnico (Pasivo — V1)

**Formulario birthday:**
- Igual al formulario actual pero agrega un campo "Fecha de cumpleanos" (selector MM-DD, sin ano)
- El campo se guarda en `contacts.birthday`
- Se genera un signup con codigo que dice "Valido solo en tu cumpleanos +/- 3 dias"
- El `expires_at` se calcula al proximo cumpleanos + 3 dias de gracia

**Validacion en canje:**
- Cuando el staff canjea, verificar que la fecha actual esta dentro del rango del cumpleanos
- Si no es el cumpleanos, mostrar warning "Este codigo es para cumpleanos, no es la fecha"

#### Enfoque Tecnico (Activo — V2)

```sql
-- Funcion cron que se ejecuta diariamente a las 9:00 AM
-- Busca contactos que cumplen anos hoy y les crea un signup automatico
CREATE OR REPLACE FUNCTION send_birthday_offers()
RETURNS INT AS $$
DECLARE
  today_mmdd TEXT := to_char(now(), 'MM-DD');
  count INT := 0;
BEGIN
  -- Para cada restaurante con campana birthday activa
  -- Para cada contacto con birthday = today_mmdd
  -- Crear signup + marcar para enviar WhatsApp
  -- ...
  RETURN count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

SELECT cron.schedule('birthday-offers', '0 9 * * *', $$SELECT send_birthday_offers()$$);
```

#### Archivos a Crear

| Archivo | Descripcion |
|---------|-------------|
| `components/lead-form/birthday-field.tsx` | Selector de cumpleanos (MM-DD, con scroll por mes) |

#### Archivos a Modificar

| Archivo | Cambio |
|---------|--------|
| `components/lead-form/restaurant-form.tsx` | Mostrar campo birthday si `campaign.config.require_birthday` o `campaign_type === "birthday"` |
| `lib/i18n.ts` | Agregar traducciones para birthday field |
| `lib/i18n.ts` | Agregar Zod validation para birthday (MM-DD format) |
| `app/api/submit/route.ts` | Guardar `birthday` en contact upsert |

#### Cambios de DB

V1: Ninguno (campo `birthday` ya existe en contacts).

V2: Agregar funcion cron `send_birthday_offers()` + job diario.

#### Criterios de Aceptacion (V1 — Pasiva)

- [ ] Formulario muestra selector de cumpleanos para campanas tipo birthday
- [ ] Birthday se guarda en formato MM-DD en `contacts.birthday`
- [ ] Codigo generado tiene expires_at calculado al proximo cumpleanos
- [ ] i18n funciona para el campo de cumpleanos
- [ ] Campo birthday es opcional para otros tipos de campana

---

### F-09: Email Fallback

**Prioridad:** MEDIA
**Esfuerzo estimado:** 2-3 dias
**Depende de:** Nada

#### Contexto

Actualmente si el WhatsApp falla (cuenta no verificada, template rechazado, etc.), el codigo se muestra en pantalla pero el cliente no recibe confirmacion por ningun otro canal. El schema ya soporta `message_channel = 'email'`.

#### User Stories

1. **Como cliente**, quiero recibir mi codigo por email si el WhatsApp no esta disponible, para tener un respaldo.
2. **Como restaurante**, quiero que mis clientes siempre reciban confirmacion, aunque WhatsApp falle.

#### Enfoque Tecnico

**Proveedor de email recomendado:** Resend (simple API, free tier generoso, soporte para templates HTML).

**Flujo:**
```
1. Intentar enviar WhatsApp (igual que ahora)
2. Si WhatsApp falla o no esta configurado (verified = false):
   → Enviar email como fallback
3. Si ambos fallan, el codigo igual se muestra en pantalla
```

**Template de email:**
- HTML responsive, simple
- Logo del restaurante
- Codigo de redencion grande
- Oferta
- Fecha de expiracion
- Footer con nombre del restaurante

#### Archivos a Crear

| Archivo | Descripcion |
|---------|-------------|
| `lib/email.ts` | Cliente de email (Resend) + funcion `sendRedemptionEmail()` |
| `emails/redemption-code.tsx` | Template de email (react-email o HTML string) |

#### Archivos a Modificar

| Archivo | Cambio |
|---------|--------|
| `app/api/submit/route.ts` | En `after()`, si WhatsApp falla → llamar `sendRedemptionEmail()` |

#### Cambios de DB

Ninguno. `messages_log` ya soporta `channel = 'email'`.

#### Variables de Entorno Nuevas

```
RESEND_API_KEY=re_...  # API key de Resend (server-side only)
```

#### Criterios de Aceptacion

- [ ] Si WhatsApp esta configurado y verified, se envia WhatsApp (sin cambios)
- [ ] Si WhatsApp falla o no esta configurado, se envia email como fallback
- [ ] Email contiene: codigo, oferta, nombre del restaurante, fecha de expiracion
- [ ] Email se registra en `messages_log` con `channel = 'email'`
- [ ] Si ambos fallan, el codigo se muestra en pantalla (ya funciona asi)
- [ ] Email se envia en el idioma del formulario (locale del payload)

---

### F-10: Multi-Campana Activa

**Prioridad:** MEDIA
**Esfuerzo estimado:** 2-3 dias
**Depende de:** F-02 (multi-tipo de campana)

#### Contexto

Actualmente el sistema carga solo una campana activa (la mas reciente). Pero un restaurante podria querer tener simultaneamente:
- Una campana de aperitivo gratis (en el QR de las mesas)
- Una campana de spin wheel (en el Instagram)
- Una campana de cumpleanos (permanente)

Cada campana tendria su propia URL o query param.

#### User Stories

1. **Como restaurante**, quiero tener varias campanas activas al mismo tiempo, para usar diferentes promos en diferentes canales.
2. **Como restaurante**, quiero que cada campana tenga su propia URL, para poder poner diferentes QRs.
3. **Como cliente**, quiero ver solo la campana especifica del QR que escanee.

#### Enfoque Tecnico

**Opcion recomendada:** Agregar query param `?campaign=<campaign_id>` o `?c=<slug_campaña>`.

```
/ → Carga la campana activa mas reciente (default, backward compatible)
/?campaign=<uuid> → Carga campana especifica por ID
/?c=<slug> → Carga campana especifica por slug (futuro, requiere campo slug en campaigns)
```

**Cambios en queries.ts:**
```typescript
export async function getActiveCampaign(
  restaurantId: string,
  campaignId?: string  // nuevo parametro opcional
): Promise<Campaign | null> {
  let query = supabase
    .from("campaigns")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .eq("is_active", true)

  if (campaignId) {
    query = query.eq("id", campaignId)
  }

  const { data, error } = await query
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (error || !data) return null
  return data as Campaign
}
```

#### Archivos a Modificar

| Archivo | Cambio |
|---------|--------|
| `lib/queries.ts` | Agregar parametro `campaignId` a `getActiveCampaign()` y `getRestaurantPageData()` |
| `app/page.tsx` | Pasar `searchParams.campaign` a `getRestaurantPageData()` |

#### Cambios de DB

Ninguno. Opcionalmente agregar campo `slug` a campaigns para URLs amigables:

```sql
ALTER TABLE campaigns ADD COLUMN slug TEXT;
CREATE UNIQUE INDEX idx_campaigns_slug ON campaigns(restaurant_id, slug) WHERE slug IS NOT NULL;
```

#### Criterios de Aceptacion

- [ ] `/?campaign=<uuid>` carga la campana especifica
- [ ] `/` sin query param sigue cargando la campana activa mas reciente (backward compatible)
- [ ] Si el campaign_id no existe o no esta activo, muestra 404
- [ ] Cada campana genera su propio QR code con el query param

---

## Largo Plazo (3+ meses)

---

### F-11: Modelo Multi-Tenant

**Prioridad:** ALTA (para escalar)
**Esfuerzo estimado:** 2-3 semanas
**Depende de:** F-07 (dashboard), F-12 (billing)

#### Contexto

Actualmente cada restaurante es un deploy separado (Vercel + Supabase). Esto funciona bien para 1-5 clientes pero no escala:
- Cada nuevo cliente requiere setup manual (crear proyecto Supabase, deploy en Vercel, configurar env vars)
- No se pueden compartir updates de codigo facilmente
- Costos fijos por cada proyecto Supabase ($25/mes)

El target es un **unico deploy** que sirva a multiples restaurantes.

#### User Stories

1. **Como operador de OfertaCore**, quiero agregar un nuevo restaurante sin hacer un deploy nuevo.
2. **Como restaurante**, quiero que mi data este aislada de otros restaurantes.
3. **Como operador**, quiero poder actualizar el codigo una vez y que aplique a todos los clientes.

#### Enfoque Tecnico

**Cambio principal:** Reemplazar `NEXT_PUBLIC_RESTAURANT_SLUG` env var con routing dinamico.

```
Actual:    /                    → carga slug del env
Nuevo:     /la-ferneteria       → carga slug de la URL
           /taqueria-el-rey     → carga slug de la URL
           /                    → landing page de OfertaCore (marketing)
```

**Routing:**
```
app/
├── page.tsx                    → Landing page de OfertaCore
├── [slug]/
│   ├── page.tsx                → Landing page del restaurante
│   └── redeem/page.tsx         → Pagina de canje del restaurante
├── dashboard/
│   ├── login/page.tsx          → Login
│   └── [restaurantSlug]/       → Dashboard del restaurante
│       ├── overview/page.tsx
│       ├── contacts/page.tsx
│       └── settings/page.tsx
```

**Base de datos:** Un solo Supabase project. RLS ya esta configurado con `restaurant_id` en todas las tablas. Solo hay que asegurar que `service_role` key se use con cuidado.

**DNS / Dominios:**
- `app.ofertacore.com/la-ferneteria` → landing page
- `app.ofertacore.com/dashboard` → dashboard
- Opcion futura: custom domains (`laferneteria.com` → proxy a `/la-ferneteria`)

#### Archivos a Crear

| Archivo | Descripcion |
|---------|-------------|
| `app/[slug]/page.tsx` | Landing page dinamica por slug |
| `app/[slug]/redeem/page.tsx` | Canje por slug |
| `app/page.tsx` | Landing page de OfertaCore (marketing) |

#### Archivos a Modificar

| Archivo | Cambio |
|---------|--------|
| `lib/queries.ts` | Quitar dependencia de env var, recibir slug como parametro |
| `app/api/submit/route.ts` | Validar restaurant_id contra DB (no confiar en env var) |
| `middleware.ts` | Resolver slug → restaurant_id para pre-validacion |

#### Cambios de DB

Ninguno de schema. Migrar data de todos los proyectos Supabase individuales a un solo proyecto.

#### Criterios de Aceptacion

- [ ] Multiples restaurantes funcionan en el mismo deploy
- [ ] Cada restaurante tiene su propia URL basada en slug
- [ ] Data de cada restaurante esta completamente aislada (RLS)
- [ ] Dashboard muestra solo data del restaurante autenticado
- [ ] Agregar nuevo restaurante es solo INSERT en DB (sin deploy)

---

### F-12: Billing con Stripe

**Prioridad:** ALTA (para monetizar)
**Esfuerzo estimado:** 1-2 semanas
**Depende de:** F-07 (dashboard), F-11 (multi-tenant)

#### Contexto

El campo `plan` (free/starter/pro) ya existe en `restaurants`. Falta implementar:
- Paginas de pricing
- Checkout con Stripe
- Webhooks para actualizar el plan en DB
- Enforcement de limites por plan

#### User Stories

1. **Como dueño**, quiero suscribirme a un plan desde el dashboard.
2. **Como dueño**, quiero ver mi facturacion y cambiar de plan.
3. **Como sistema**, quiero limitar features segun el plan del restaurante.

#### Enfoque Tecnico

**Limites por plan:**
| Feature | Free | Starter | Pro |
|---------|------|---------|-----|
| Campanas activas | 1 | 3 | Ilimitadas |
| Contactos | 100 | 1,000 | Ilimitados |
| WhatsApp mensajes/mes | 0 | 500 | 5,000 |
| Dashboard | Basico | Completo | Completo + API |
| Spin wheel | No | Si | Si |
| Custom branding | No | Si | Si |

**Stripe Integration:**
```
1. Crear productos + precios en Stripe Dashboard
2. Checkout Session para nuevos suscriptores
3. Webhook endpoint: /api/webhooks/stripe
4. Eventos: checkout.session.completed, customer.subscription.updated/deleted
5. Actualizar restaurants.plan en DB segun evento
```

#### Archivos a Crear

| Archivo | Descripcion |
|---------|-------------|
| `app/api/webhooks/stripe/route.ts` | Webhook handler de Stripe |
| `app/dashboard/billing/page.tsx` | Pagina de billing |
| `lib/stripe.ts` | Cliente Stripe + helpers |
| `lib/plan-limits.ts` | Definicion de limites por plan + enforcement |

#### Cambios de DB

```sql
ALTER TABLE restaurants ADD COLUMN stripe_customer_id TEXT;
ALTER TABLE restaurants ADD COLUMN stripe_subscription_id TEXT;
ALTER TABLE restaurants ADD COLUMN plan_expires_at TIMESTAMPTZ;
```

#### Variables de Entorno Nuevas

```
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
```

#### Criterios de Aceptacion

- [ ] Restaurante puede suscribirse a un plan
- [ ] Webhook actualiza `restaurants.plan` automaticamente
- [ ] Features se limitan segun plan (ej: spin wheel solo para starter+)
- [ ] Restaurante puede cancelar/cambiar plan
- [ ] Free tier funciona sin tarjeta de credito

---

### F-13: Sistema de Referidos

**Prioridad:** MEDIA
**Esfuerzo estimado:** 5-7 dias
**Depende de:** F-02 (multi-tipo)

#### Contexto

El enum `campaign_type` ya incluye `referral`. `contacts.metadata` puede guardar `referral_code`. `signups.metadata` puede guardar `referred_by_contact_id`.

#### User Stories

1. **Como cliente**, quiero compartir un link de referido con mis amigos y ganar un premio cuando se registren.
2. **Como amigo referido**, quiero recibir un beneficio extra por haber sido referido.
3. **Como restaurante**, quiero que mis clientes traigan nuevos clientes de forma organica.

#### Enfoque Tecnico

**Flujo:**
```
1. Cliente A completa formulario → recibe codigo + link de referido unico
   Link: /{slug}?ref=MARIA2026

2. Cliente B abre el link de referido → formulario normal + tag "referido por A"
   Al submit, se crea contacto B con source="referral", source_detail="MARIA2026"

3. Sistema detecta referido valido → crea signup bonus para Cliente A
   (promo extra: "Tu amigo se registro, tenes 10% OFF en tu proxima visita")

4. WhatsApp a Cliente A: "Tu amigo [nombre] se registro! Aca tenes tu beneficio..."
```

**Generacion de codigo de referido:**
```typescript
// Al crear un contacto, generar codigo de referido unico
// Formato: NOMBRE + 4 chars random (ej: MARIA2026, JUAN8X4P)
// Guardar en contacts.metadata.referral_code
```

#### Archivos a Crear

| Archivo | Descripcion |
|---------|-------------|
| `components/lead-form/referral-share.tsx` | Card con link de referido + botones de share (WhatsApp, copiar) |
| `lib/referral.ts` | Logica de referidos: generar codigo, procesar referido |
| `app/api/referral-bonus/route.ts` | API: crear signup bonus para el referente |

#### Archivos a Modificar

| Archivo | Cambio |
|---------|--------|
| `components/lead-form/success-screen.tsx` | Mostrar card de referido si campaign_type incluye referral |
| `components/lead-form/restaurant-form.tsx` | Detectar `?ref=` query param, guardar en metadata |
| `app/api/submit/route.ts` | Procesar referido: crear bonus signup para el referente |
| `app/page.tsx` | Pasar `ref` query param al form |

#### Cambios de DB

```sql
-- Tabla de referidos para tracking
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  referred_contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  referral_code TEXT NOT NULL,
  bonus_signup_id UUID REFERENCES signups(id),  -- signup bonus del referente
  status TEXT NOT NULL DEFAULT 'pending',  -- pending, completed, expired
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
```

#### Criterios de Aceptacion

- [ ] Success screen muestra link de referido con boton de compartir
- [ ] Link de referido funciona: al abrirlo, el formulario sabe quien refirio
- [ ] Al completar el formulario referido, el referente recibe un bonus
- [ ] Bonus se registra como signup con metadata de referido
- [ ] WhatsApp al referente notificando el referido (si WhatsApp configurado)
- [ ] Un contacto no puede referirse a si mismo
- [ ] Un contacto referido no puede usar el mismo referido dos veces

---

### F-14: Analytics Avanzados y Reportes

**Prioridad:** MEDIA
**Esfuerzo estimado:** 5-7 dias
**Depende de:** F-07 (dashboard), F-04 (funnel analytics)

#### Contexto

Con el dashboard basico (F-07) y los eventos de funnel (F-04), se tiene la data. Falta visualizarla de forma util.

#### User Stories

1. **Como dueño**, quiero ver un funnel visual (scans → views → starts → submits → redemptions).
2. **Como dueño**, quiero ver metricas por dia de la semana y hora, para saber cuando la promo funciona mejor.
3. **Como dueño**, quiero recibir un email semanal con el resumen de mi campana.

#### Enfoque Tecnico

**Funnel visualization:**
```
QR Scans → Page Views → Form Starts → Form Submits → Redemptions
  100%        85%          60%            45%            30%
```

**Metricas por tiempo:**
- Signups por dia (line chart)
- Signups por hora del dia (bar chart — "pico a las 8pm")
- Signups por dia de la semana (bar chart — "sabados es el mejor dia")
- Trend vs semana anterior (% change)

**Email digest semanal:**
- Cron job (pg_cron o external) cada lunes a las 9am
- Envia resumen: signups, canjes, tasa conversion, top dia, top hora
- Via Resend (mismo proveedor que F-09)

#### Archivos a Crear

| Archivo | Descripcion |
|---------|-------------|
| `app/dashboard/analytics/page.tsx` | Pagina de analytics detallados |
| `components/dashboard/funnel-chart.tsx` | Visualizacion de funnel |
| `components/dashboard/time-chart.tsx` | Charts de signups por dia/hora |
| `lib/analytics-queries.ts` | Queries optimizados para analytics |
| `app/api/cron/weekly-digest/route.ts` | Email digest semanal |

#### Cambios de DB

```sql
-- Vista materializada para analytics rapidos (opcional, si la tabla crece mucho)
CREATE MATERIALIZED VIEW campaign_daily_stats AS
SELECT
  campaign_id,
  date_trunc('day', created_at) AS day,
  event_type,
  COUNT(*) AS count
FROM analytics_events
GROUP BY campaign_id, date_trunc('day', created_at), event_type;

-- Refresh diario
SELECT cron.schedule('refresh-daily-stats', '0 2 * * *', $$REFRESH MATERIALIZED VIEW CONCURRENTLY campaign_daily_stats$$);
```

#### Criterios de Aceptacion

- [ ] Funnel chart muestra conversion en cada paso
- [ ] Signups por dia muestra ultimos 30 dias
- [ ] Signups por hora muestra patron de uso diario
- [ ] Todos los charts son interactivos (hover muestra valor)
- [ ] Data se carga rapido (< 2s para 10k eventos)

---

### F-15: API Publica y Webhooks

**Prioridad:** BAJA
**Esfuerzo estimado:** 1-2 semanas
**Depende de:** F-07 (dashboard), F-12 (billing — solo plan Pro)

#### Contexto

Algunos restaurantes quieren integrar OfertaCore con su POS (Square, Toast), CRM externo, o herramientas de marketing. Una API publica + webhooks permite estas integraciones.

#### User Stories

1. **Como restaurante con POS**, quiero que cuando se canjee un codigo en OfertaCore, mi POS reciba una notificacion.
2. **Como restaurante**, quiero poder crear campanas via API desde mi sistema interno.
3. **Como desarrollador externo**, quiero documentacion clara de la API.

#### Enfoque Tecnico

**API REST:**
```
GET    /api/v1/campaigns          → Lista campanas
POST   /api/v1/campaigns          → Crear campana
GET    /api/v1/contacts            → Lista contactos
GET    /api/v1/signups             → Lista signups
POST   /api/v1/signups/:id/redeem → Canjear codigo via API
GET    /api/v1/stats               → Estadisticas
```

**Auth:** API key por restaurante (campo nuevo en `restaurants`).

**Webhooks:**
```
Events:
- signup.created    → Nuevo signup
- signup.redeemed   → Codigo canjeado
- contact.created   → Nuevo contacto
- campaign.updated  → Campana modificada
```

**Webhook delivery:**
- Config en `restaurants.settings.webhooks: [{ url, events, secret }]`
- Retry logic: 3 intentos con exponential backoff
- Log en tabla nueva `webhook_deliveries`

#### Archivos a Crear

| Archivo | Descripcion |
|---------|-------------|
| `app/api/v1/[...route]/route.ts` | API Router principal |
| `lib/api-auth.ts` | Middleware de autenticacion por API key |
| `lib/webhooks.ts` | Dispatcher de webhooks con retry |
| `app/dashboard/api-keys/page.tsx` | UI para gestionar API keys |

#### Cambios de DB

```sql
ALTER TABLE restaurants ADD COLUMN api_key TEXT UNIQUE;
ALTER TABLE restaurants ADD COLUMN api_key_created_at TIMESTAMPTZ;

CREATE TABLE webhook_deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  attempts INT NOT NULL DEFAULT 0,
  last_attempt_at TIMESTAMPTZ,
  response_status INT,
  response_body TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

#### Criterios de Aceptacion

- [ ] API key se genera desde el dashboard
- [ ] Endpoints REST funcionan con API key auth
- [ ] Webhooks se disparan en eventos configurados
- [ ] Retry logic funciona (3 intentos)
- [ ] Rate limiting en API (1000 req/hora por default)

---

### F-16: App Mobile para Staff

**Prioridad:** BAJA
**Esfuerzo estimado:** 2-3 semanas
**Depende de:** F-01 (pagina de canje), F-07 (dashboard)

#### Contexto

La pagina de canje web (F-01) funciona en el browser del celular del mozo. Pero una app nativa ofrece:
- Escaneo de QR mas rapido (camara nativa)
- Push notifications para nuevos signups
- Acceso offline a codigos recientes
- Mejor UX para uso repetido

#### User Stories

1. **Como mozo**, quiero escanear el QR del codigo del cliente con la camara, para canjearlo mas rapido que escribirlo.
2. **Como manager**, quiero recibir push notifications cuando hay nuevos signups.
3. **Como mozo**, quiero ver los canjes recientes sin internet, por si falla el wifi del restaurante.

#### Enfoque Tecnico

**Framework:** React Native + Expo (comparte logica con el web)

**Screens:**
```
Login → PIN o biometric
Scan → Camara para escanear QR/codigo
Manual Entry → Input de codigo (igual que web)
History → Canjes recientes (cached offline)
Notifications → Lista de push notifications
```

**QR Format:**
```
El codigo de redencion se puede mostrar como QR en la success screen del cliente.
El QR contiene: { code: "ZEZ26G", restaurant_id: "uuid" }
La app escanea el QR y llama a la misma API /api/redeem
```

**Offline:**
- Cache SQLite local con los ultimos 50 canjes
- Sync automatico cuando recupera conexion
- Indicador de "offline mode" en la UI

**Push Notifications:**
- Supabase Realtime subscriptions → nuevo signup → push via Expo Notifications
- O webhook a servicio de push (OneSignal, Firebase FCM)

#### Archivos a Crear

Proyecto separado: `mobile/` (React Native + Expo)

```
mobile/
├── app/
│   ├── (tabs)/
│   │   ├── scan.tsx
│   │   ├── history.tsx
│   │   └── settings.tsx
│   ├── login.tsx
│   └── _layout.tsx
├── components/
│   ├── camera-scanner.tsx
│   ├── code-input.tsx
│   └── redemption-card.tsx
├── lib/
│   ├── supabase.ts
│   ├── offline-cache.ts
│   └── push-notifications.ts
```

#### Cambios de DB

```sql
-- Push notification tokens por usuario
CREATE TABLE push_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  platform TEXT NOT NULL,  -- 'ios', 'android'
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

#### Criterios de Aceptacion

- [ ] Login con email/password (Supabase Auth)
- [ ] Escaneo de QR con camara nativa funciona
- [ ] Canje manual por codigo funciona
- [ ] Historial de canjes recientes (cached offline)
- [ ] Push notification cuando hay nuevo signup
- [ ] Funciona en iOS y Android
- [ ] UX fluida (< 1s para escanear + verificar)

---

### F-17: Canje Autenticado por Empleado

**Prioridad:** MEDIA
**Esfuerzo estimado:** 1-2 dias
**Depende de:** F-07 (Dashboard — Supabase Auth + restaurant_users)

#### Contexto

Actualmente en F-01, el campo "Nombre del empleado" es un input libre y opcional. No hay forma de saber con certeza **quien** canjeo un codigo. Un mozo podria poner cualquier nombre o dejarlo vacio.

Cuando F-07 implemente autenticacion con Supabase Auth y la tabla `restaurant_users` (que ya tiene roles: owner/manager/staff), la pagina de canje puede identificar automaticamente al empleado logueado.

La idea es que `/redeem` requiera login y la URL contenga o resuelva el ID del usuario autenticado, eliminando el input manual de nombre.

#### User Stories

1. **Como manager**, quiero saber exactamente cual empleado canjeo cada codigo, para tener control y trazabilidad.
2. **Como mozo**, quiero no tener que escribir mi nombre cada vez, que el sistema me reconozca automaticamente.
3. **Como dueño**, quiero ver en el historial de canjes el nombre real del empleado (no uno inventado).

#### Enfoque Tecnico

**Flujo actual (F-01):**
```
/redeem → input codigo → verificar → input nombre (opcional) → confirmar
                                      ^^^^^^^^^^^^^^^^^^^^^^
                                      campo libre, no verificable
```

**Flujo nuevo (F-17):**
```
/redeem → login si no autenticado → input codigo → verificar → confirmar
          ^^^^^^^^^^^^^^^^^^^^^^^^                              (user_id automatico)
          Supabase Auth session
```

**Cambios clave:**

1. `/redeem` verifica session de Supabase Auth (middleware o server component)
2. Si no hay session → redirect a `/dashboard/login?redirect=/redeem`
3. Si hay session → resolver `user_id` → buscar en `restaurant_users` → obtener nombre y rol
4. Al confirmar canje, enviar `user_id` en vez de `redeemed_by` texto libre
5. La tabla `redemptions` ya tiene `redeemed_by TEXT` — se puede mantener como texto (nombre resuelto) o agregar `redeemed_by_user_id UUID`

**Opcion recomendada para DB:**

```sql
-- Agregar columna para vincular con auth.users
ALTER TABLE redemptions ADD COLUMN redeemed_by_user_id UUID REFERENCES auth.users(id);

-- Index para buscar canjes por empleado
CREATE INDEX idx_redemptions_user ON redemptions(redeemed_by_user_id) WHERE redeemed_by_user_id IS NOT NULL;
```

Mantener `redeemed_by TEXT` para compatibilidad con canjes anteriores (F-01 sin auth). Los nuevos canjes tendran ambos: `redeemed_by_user_id` (FK) + `redeemed_by` (nombre resuelto para display rapido).

#### Archivos a Modificar

| Archivo | Cambio |
|---------|--------|
| `app/redeem/page.tsx` | Verificar session de Supabase Auth, redirect si no autenticado |
| `components/redeem/redeem-form.tsx` | Eliminar input de nombre manual, recibir `user` como prop, mostrar nombre del empleado logueado |
| `app/api/redeem/confirm/route.ts` | Recibir `user_id`, resolver nombre desde `restaurant_users`, guardar ambos campos |

#### Cambios de DB

```sql
ALTER TABLE redemptions ADD COLUMN redeemed_by_user_id UUID REFERENCES auth.users(id);
CREATE INDEX idx_redemptions_user ON redemptions(redeemed_by_user_id) WHERE redeemed_by_user_id IS NOT NULL;
```

#### Relacion con F-01

F-01 queda como esta (funcional, sin auth). F-17 es una **mejora sobre F-01** que se activa cuando F-07 provee el sistema de auth. La transicion es suave:
- Canjes anteriores: tienen `redeemed_by` texto + `redeemed_by_user_id` NULL
- Canjes nuevos: tienen ambos campos populados

#### Criterios de Aceptacion

- [ ] `/redeem` requiere login (redirect a login si no autenticado)
- [ ] Empleado logueado ve su nombre automaticamente (sin input manual)
- [ ] `redemptions.redeemed_by_user_id` se guarda con el UUID del empleado
- [ ] `redemptions.redeemed_by` se guarda con el nombre del empleado (para display)
- [ ] Solo usuarios con rol staff/manager/owner del restaurante pueden acceder
- [ ] Canjes anteriores (sin auth) siguen visibles en el historial
- [ ] Dashboard (F-07) muestra nombre del empleado en la lista de canjes

---

## QR & Tracking

---

### F-18: QR Codes con Tracking y Analytics

**Prioridad:** ALTA
**Esfuerzo estimado:** 3-4 dias
**Depende de:** F-04 (Analytics de Funnel — para correlacion scan→signup)

#### Contexto

El flujo actual asume que el cliente "de alguna forma" llega a la URL del formulario. En la practica, el canal principal es un **QR code fisico en la mesa del restaurante**. Sin embargo:
- No hay forma de generar QR codes desde el sistema
- No se trackea cuando alguien escanea un QR (solo el `page_view` posterior)
- No se sabe que mesa/ubicacion genera mas escaneos
- No se puede medir el funnel completo: escaneo → vista → formulario → canje
- Si se quiere cambiar la URL destino, hay que reimprimir todos los QR

El campo `qr_scan` ya existe como event_type en `analytics_events`, pero nunca se dispara porque no hay ruta de escaneo.

#### Enfoque: Self-Hosted con Redirect Tracking

Se descartaron servicios terceros (Uniqode $5-49/mo, Flowcode, Supercode $29/mo, QR Code Generator PRO) porque:
- Agregan costo recurrente por restaurante que escala linealmente
- Los analytics son genericos (no se integran con campaign/signup/redemption data)
- La data queda en un vendor externo
- Requieren integracion adicional para correlacionar con nuestro funnel

El enfoque self-hosted cuesta **$0 extra**, se integra con la tabla `analytics_events` existente, y da control total.

#### Librerias Evaluadas

| Libreria | Uso | npm Weekly DL | Recomendada |
|----------|-----|---------------|-------------|
| **`qrcode`** | Generacion server-side (API route) → PNG, SVG, data URL | 3.7M | **Si — para generar QR imprimibles** |
| **`react-qrcode-logo`** | Render client-side con logo del restaurante embebido | 92K | **Si — para preview en dashboard** |
| `qrcode.react` | Render client-side (SVG/Canvas) sin logo | 1.7M | Alternativa mas simple |
| `react-qr-code` | Render SVG lightweight | 270K | Solo si no se necesita logo |
| `next-qrcode` | Wrapper hooks para Next.js | 60K | No — inactivo 2+ anos |
| `ua-parser-js` | Parseo de User-Agent (device, OS, browser) | — | **Si — para analytics de escaneo** |
| `nanoid` | Generacion de short codes unicos y URL-safe | — | **Si — para codigos cortos** |

**Paquetes a instalar:**
```bash
pnpm add qrcode react-qrcode-logo ua-parser-js nanoid
pnpm add -D @types/qrcode @types/ua-parser-js
```

#### User Stories

1. **Como dueño**, quiero generar QR codes para cada mesa/ubicacion de mi restaurante, para que los clientes escaneen y accedan a la promo.
2. **Como dueño**, quiero que cada QR tenga el logo de mi restaurante, para que se vea profesional.
3. **Como dueño**, quiero saber cuantos escaneos tiene cada QR, para saber que mesas/ubicaciones generan mas engagement.
4. **Como dueño**, quiero ver desde que dispositivo/sistema operativo escanean, para entender a mi audiencia.
5. **Como dueño**, quiero poder desactivar un QR sin eliminarlo, para manejo de mesas temporales.
6. **Como dueño**, quiero poder cambiar la URL destino de un QR sin reimprimir, para redirigir a campanas diferentes.
7. **Como dueño**, quiero descargar los QR en PNG o SVG para imprimir, en alta resolucion.
8. **Como sistema**, quiero correlacionar escaneos QR con signups y canjes, para medir el funnel completo.

#### Arquitectura

```
QR fisico en mesa
  → Contiene URL: https://{domain}/r/{shortCode}
  → Cliente escanea con camara del celular
  → GET /r/{shortCode} (Next.js route handler)
    → 1. Buscar shortCode en tabla qr_codes
    → 2. Si activo: log qr_scan en analytics_events (fire-and-forget via after())
    → 3. Incrementar scan_count + last_scanned_at
    → 4. 302 Redirect → /?loc={location_id}&table={table}&campaign={campaign_id}
    → 5. Si inactivo/inexistente: redirect a / (sin tracking)
  → Cliente llega al formulario (flujo normal)
```

**Dato clave:** El `after()` de Next.js asegura que el redirect sea instantaneo. El logging ocurre despues de enviar la respuesta, asi el cliente no percibe latencia.

**Geolocalizacion:** Vercel provee `request.geo` gratis (city, country, region, lat/lng) via headers. No se necesita servicio externo.

#### Formato del Short Code

Se usa **`nanoid`** con alfabeto URL-safe y longitud 8 (ej: `Xk9mP2aB`).

```typescript
import { nanoid } from 'nanoid';
const shortCode = nanoid(8); // "Xk9mP2aB"
```

Ventajas de short codes vs parametros en la URL:
- QR mas pequeno y facil de escanear (menos datos codificados)
- URLs no adivinables (seguridad)
- Se pueden desactivar/reasignar sin reimprimir
- DB lookup actua como "dynamic URL"

#### Enfoque Tecnico

**1. Ruta de redirect con tracking: `app/r/[code]/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { after } from 'next/server';
import { UAParser } from 'ua-parser-js';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  // 1. Buscar QR code
  const { data: qrCode } = await supabaseAdmin
    .from('qr_codes')
    .select('*')
    .eq('short_code', code)
    .eq('is_active', true)
    .single();

  if (!qrCode) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 2. Parsear device info
  const userAgent = request.headers.get('user-agent') || '';
  const parser = new UAParser(userAgent);
  const device = parser.getDevice();
  const os = parser.getOS();
  const browser = parser.getBrowser();

  // 3. Geo info (gratis en Vercel)
  const geo = request.geo; // { city, country, region, latitude, longitude }

  // 4. Fire-and-forget: log scan + increment counter
  after(async () => {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown';

    await Promise.all([
      supabaseAdmin.from('analytics_events').insert({
        restaurant_id: qrCode.restaurant_id,
        campaign_id: qrCode.campaign_id,
        event_type: 'qr_scan',
        event_data: {
          qr_code_id: qrCode.id,
          location_id: qrCode.location_id,
          table_number: qrCode.table_number,
          short_code: code,
          ip_address: ip,
          user_agent: userAgent,
          referrer: request.headers.get('referer') || null,
          device_type: device.type || 'desktop',
          device_vendor: device.vendor || null,
          os_name: os.name || null,
          os_version: os.version || null,
          browser_name: browser.name || null,
          browser_version: browser.version || null,
          geo_city: geo?.city || null,
          geo_country: geo?.country || null,
          geo_region: geo?.region || null,
          geo_latitude: geo?.latitude || null,
          geo_longitude: geo?.longitude || null,
        },
      }),
      supabaseAdmin.rpc('increment_qr_scan_count', {
        p_qr_code_id: qrCode.id,
      }),
    ]);
  });

  // 5. Construir URL de redirect
  const params_redirect = new URLSearchParams();
  if (qrCode.location_id) params_redirect.set('loc', qrCode.location_id);
  if (qrCode.table_number) params_redirect.set('table', qrCode.table_number);
  if (qrCode.campaign_id) params_redirect.set('campaign', qrCode.campaign_id);

  const targetUrl = qrCode.target_url
    || `/?${params_redirect.toString()}`;

  return NextResponse.redirect(new URL(targetUrl, request.url), 302);
}
```

**2. API de generacion: `app/api/qr/generate/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function POST(request: NextRequest) {
  const { shortCode, format = 'svg', size = 300 } = await request.json();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin;
  const url = `${baseUrl}/r/${shortCode}`;

  if (format === 'svg') {
    const svg = await QRCode.toString(url, {
      type: 'svg',
      width: size,
      errorCorrectionLevel: 'H', // Alto — permite logo overlay
      margin: 2,
    });
    return new NextResponse(svg, {
      headers: { 'Content-Type': 'image/svg+xml' },
    });
  }

  if (format === 'png') {
    const buffer = await QRCode.toBuffer(url, {
      width: size,
      errorCorrectionLevel: 'H',
      margin: 2,
    });
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="qr-${shortCode}.png"`,
      },
    });
  }

  const dataUrl = await QRCode.toDataURL(url, {
    width: size,
    errorCorrectionLevel: 'H',
  });
  return NextResponse.json({ dataUrl, url });
}
```

**3. Componente de preview con logo (dashboard): `react-qrcode-logo`**

```tsx
import { QRCode } from 'react-qrcode-logo';

function TableQRPreview({ shortCode, restaurantLogo, primaryColor }: Props) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/r/${shortCode}`;

  return (
    <QRCode
      value={url}
      size={256}
      logoImage={restaurantLogo}
      logoWidth={60}
      logoHeight={60}
      logoPadding={5}
      logoPaddingStyle="circle"
      qrStyle="dots"
      eyeRadius={8}
      fgColor={primaryColor || '#1a1a1a'}
      bgColor="#ffffff"
    />
  );
}
```

#### Archivos a Crear

| Archivo | Descripcion |
|---------|-------------|
| `app/r/[code]/route.ts` | Route handler de redirect con tracking (el corazon del feature) |
| `app/api/qr/generate/route.ts` | API para generar QR en PNG/SVG/dataURL para descarga/impresion |
| `app/api/qr/create/route.ts` | API para crear un nuevo QR code en la DB (CRUD) |
| `lib/qr.ts` | Utilidades: `generateShortCode()`, `buildQRUrl()`, tipos |

#### Archivos a Modificar

| Archivo | Cambio |
|---------|--------|
| `lib/types.ts` | Agregar interfaz `QRCode` |

#### Archivos futuros (cuando se implemente F-07 Dashboard)

| Archivo | Descripcion |
|---------|-------------|
| `app/dashboard/qr-codes/page.tsx` | Lista de QR codes con stats de escaneo |
| `app/dashboard/qr-codes/new/page.tsx` | Crear nuevo QR (seleccionar ubicacion, mesa, campana) |
| `app/dashboard/qr-codes/[id]/page.tsx` | Detalle de QR: preview, stats, descargar, editar destino |
| `components/dashboard/qr-preview.tsx` | Preview del QR con logo usando `react-qrcode-logo` |
| `components/dashboard/qr-stats.tsx` | Stats de escaneo: total, por dia, por hora, por dispositivo |
| `components/dashboard/qr-download.tsx` | Botones de descarga PNG/SVG en distintos tamanos |

#### Cambios de DB

```sql
-- Tabla principal de QR codes
CREATE TABLE public.qr_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  location_id UUID REFERENCES public.locations(id) ON DELETE SET NULL,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
  short_code TEXT NOT NULL UNIQUE,
  table_number TEXT,               -- "12", "patio-3", "barra-1"
  label TEXT,                      -- etiqueta legible: "Mesa 12 - Salon Principal"
  target_url TEXT,                 -- URL override (null = construir con params)
  is_active BOOLEAN NOT NULL DEFAULT true,
  scan_count INTEGER NOT NULL DEFAULT 0,
  unique_scan_count INTEGER NOT NULL DEFAULT 0,
  last_scanned_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',     -- extensible: { print_batch, notes, etc. }
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indices
CREATE UNIQUE INDEX idx_qr_codes_short_code ON public.qr_codes(short_code);
CREATE INDEX idx_qr_codes_restaurant ON public.qr_codes(restaurant_id);
CREATE INDEX idx_qr_codes_location ON public.qr_codes(location_id) WHERE location_id IS NOT NULL;
CREATE INDEX idx_qr_codes_campaign ON public.qr_codes(campaign_id) WHERE campaign_id IS NOT NULL;

-- RLS
ALTER TABLE public.qr_codes ENABLE ROW LEVEL SECURITY;

-- Anon puede leer QR codes activos (para la ruta de redirect)
CREATE POLICY "Anon can read active QR codes"
  ON public.qr_codes FOR SELECT
  USING (is_active = true);

-- Authenticated users con acceso al restaurante pueden CRUD
CREATE POLICY "Restaurant users can manage QR codes"
  ON public.qr_codes FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.restaurant_users ru
      WHERE ru.restaurant_id = qr_codes.restaurant_id
        AND ru.user_id = auth.uid()
        AND ru.is_active = true
    )
  );

-- Funcion para incrementar scan count atomicamente
CREATE OR REPLACE FUNCTION public.increment_qr_scan_count(p_qr_code_id UUID)
RETURNS VOID
LANGUAGE plpgsql SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  UPDATE public.qr_codes
  SET scan_count = scan_count + 1,
      last_scanned_at = now(),
      updated_at = now()
  WHERE id = p_qr_code_id;
END;
$$;

-- Trigger para auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_qr_codes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_qr_codes_updated_at
  BEFORE UPDATE ON public.qr_codes
  FOR EACH ROW EXECUTE FUNCTION public.update_qr_codes_updated_at();
```

#### Variables de Entorno Nuevas

```
NEXT_PUBLIC_BASE_URL=https://laferneteria.ofertacore.com  # Base URL para construir links de QR
```

> Nota: en dev se puede usar `http://localhost:3000`. En produccion, la URL del dominio del restaurante.

#### Data que se captura por escaneo

| Campo | Fuente | Ejemplo |
|-------|--------|---------|
| `qr_code_id` | DB lookup | UUID |
| `location_id` | DB (del QR code) | UUID |
| `table_number` | DB (del QR code) | "12" |
| `campaign_id` | DB (del QR code) | UUID |
| `ip_address` | `x-forwarded-for` header | "190.210.45.12" |
| `user_agent` | Request header | "Mozilla/5.0 (iPhone; ..." |
| `device_type` | ua-parser-js | "mobile" / "tablet" / "desktop" |
| `device_vendor` | ua-parser-js | "Apple" / "Samsung" |
| `os_name` | ua-parser-js | "iOS" / "Android" |
| `os_version` | ua-parser-js | "17.2" |
| `browser_name` | ua-parser-js | "Safari" / "Chrome" |
| `browser_version` | ua-parser-js | "17.2" |
| `referrer` | Request header | null (direct scan) o URL |
| `geo_city` | Vercel `request.geo` | "Buenos Aires" |
| `geo_country` | Vercel `request.geo` | "AR" |
| `geo_region` | Vercel `request.geo` | "Buenos Aires" |
| `geo_latitude` | Vercel `request.geo` | "-34.6037" |
| `geo_longitude` | Vercel `request.geo` | "-58.3816" |
| `timestamp` | `analytics_events.created_at` | "2026-02-09T20:30:00Z" |

#### Queries de Analytics Utiles

```sql
-- Escaneos totales por QR code
SELECT qc.label, qc.table_number, qc.scan_count, qc.last_scanned_at
FROM qr_codes qc
WHERE qc.restaurant_id = $1
ORDER BY qc.scan_count DESC;

-- Escaneos por hora del dia (patron de uso)
SELECT
  EXTRACT(HOUR FROM ae.created_at) AS hour,
  COUNT(*) AS scans
FROM analytics_events ae
WHERE ae.restaurant_id = $1
  AND ae.event_type = 'qr_scan'
  AND ae.created_at >= CURRENT_DATE - 30
GROUP BY EXTRACT(HOUR FROM ae.created_at)
ORDER BY hour;

-- Dispositivos mas usados para escanear
SELECT
  ae.event_data->>'os_name' AS os,
  ae.event_data->>'device_type' AS device,
  COUNT(*) AS scans
FROM analytics_events ae
WHERE ae.restaurant_id = $1
  AND ae.event_type = 'qr_scan'
GROUP BY ae.event_data->>'os_name', ae.event_data->>'device_type'
ORDER BY scans DESC;

-- Funnel completo: scan → page_view → form_start → form_submit → redemption
SELECT
  (SELECT COUNT(*) FROM analytics_events WHERE restaurant_id = $1 AND event_type = 'qr_scan') AS scans,
  (SELECT COUNT(*) FROM analytics_events WHERE restaurant_id = $1 AND event_type = 'page_view') AS views,
  (SELECT COUNT(*) FROM analytics_events WHERE restaurant_id = $1 AND event_type = 'form_start') AS starts,
  (SELECT COUNT(*) FROM analytics_events WHERE restaurant_id = $1 AND event_type = 'form_submit') AS submits,
  (SELECT COUNT(*) FROM redemptions r JOIN campaigns c ON c.id = r.campaign_id WHERE c.restaurant_id = $1) AS redemptions;

-- Conversion por mesa (que mesa convierte mas)
SELECT
  qc.table_number,
  qc.scan_count AS scans,
  COUNT(s.id) AS signups,
  ROUND(COUNT(s.id)::NUMERIC / NULLIF(qc.scan_count, 0) * 100, 1) AS conversion_pct
FROM qr_codes qc
LEFT JOIN signups s ON s.metadata->>'table_number' = qc.table_number
  AND s.campaign_id = qc.campaign_id
WHERE qc.restaurant_id = $1
GROUP BY qc.id, qc.table_number, qc.scan_count
ORDER BY conversion_pct DESC;
```

#### Comparacion: Self-Hosted vs Servicios Terceros

| Caracteristica | Self-Hosted (recomendado) | Uniqode ($5-49/mo) | Flowcode (Free-$5/mo) | Supercode ($29/mo) |
|---------------|--------------------------|--------------------|-----------------------|-------------------|
| Costo por restaurante | **$0** | $5-49/mo | $0-5/mo | $29/mo |
| Scan tracking | Si | Si | Si | Si |
| Device detection | Si (ua-parser-js) | Si | Si | Si |
| Geolocalizacion | Si (Vercel gratis) | Solo plan Pro | Limitado | Si |
| Tracking por mesa | **Nativo** | Config manual | No | No |
| Correlacion scan→signup→canje | **Directo (misma DB)** | Requiere API | No | No |
| Dynamic URLs | Si (campo `target_url`) | Si | Si | Si |
| Logo en QR | Si (react-qrcode-logo) | Si | Si | Si |
| QR deactivation | Si (`is_active` flag) | Si | Si | Si |
| Data ownership | **100% propia** | Vendor | Vendor | Vendor |
| API access | Si (tu propia API) | Solo Pro | Limitado | Desconocido |
| Bulk generation | Si (script vs DB) | Segun plan | Segun plan | Segun plan |

#### Criterios de Aceptacion

**Core (redirect + tracking):**
- [ ] `/r/{shortCode}` redirige al formulario con los query params correctos (loc, table, campaign)
- [ ] Cada escaneo se registra en `analytics_events` con event_type `qr_scan`
- [ ] El redirect es instantaneo (tracking via `after()`, no bloquea)
- [ ] Short code inexistente o inactivo redirige a `/` sin error
- [ ] `scan_count` se incrementa atomicamente en cada escaneo
- [ ] `last_scanned_at` se actualiza

**Data capturada por escaneo:**
- [ ] Device type (mobile/tablet/desktop), vendor, OS, browser (via ua-parser-js)
- [ ] IP address (via x-forwarded-for)
- [ ] Geolocalizacion: city, country, region (via Vercel request.geo)
- [ ] Referrer (para detectar si viene de link compartido vs escaneo directo)
- [ ] Timestamp preciso

**Generacion de QR:**
- [ ] API `/api/qr/generate` genera QR en formato SVG
- [ ] API `/api/qr/generate` genera QR en formato PNG (alta resolucion para impresion)
- [ ] Error correction level H (permite logo overlay sin perder legibilidad)
- [ ] QR code apunta a `/r/{shortCode}` (no a la URL final)

**CRUD de QR codes:**
- [ ] Se puede crear un QR code vinculado a restaurante + ubicacion + mesa + campana
- [ ] Se puede desactivar un QR sin eliminarlo
- [ ] Se puede cambiar el `target_url` de un QR sin recrearlo
- [ ] Se puede asignar un label descriptivo ("Mesa 12 - Salon Principal")
- [ ] Short code es unico y URL-safe (nanoid de 8 chars)

**Integracion con sistema existente:**
- [ ] Los query params `?loc=` y `?table=` siguen funcionando (backward compatible)
- [ ] `analytics_events` existentes no se ven afectados
- [ ] RLS permite a la ruta de redirect leer QR codes activos (anon SELECT)
- [ ] RLS permite a restaurant_users gestionar QR codes de su restaurante

---

## Resumen de Dependencias

```
F-01 (Canje)         → independiente ✅ COMPLETADO
F-02 (Multi-tipo)    → independiente
F-03 (Rate limit)    → independiente
F-04 (Analytics)     → independiente
F-05 (WA idioma)     → independiente

F-06 (Spin Wheel)    → F-02
F-07 (Dashboard)     → independiente
F-08 (Cumpleanos)    → F-02, F-05
F-09 (Email)         → independiente
F-10 (Multi-campana) → F-02
F-17 (Canje auth)    → F-01, F-07
F-18 (QR Tracking)   → F-04 (para correlacion scan→signup)

F-11 (Multi-tenant)  → F-07
F-12 (Billing)       → F-07, F-11
F-13 (Referidos)     → F-02
F-14 (Analytics+)    → F-07, F-04, F-18
F-15 (API)           → F-07, F-12
F-16 (Mobile)        → F-01, F-07
```

## Orden de Implementacion Recomendado

```
Semana 1:  F-01 (Canje) ✅ + F-02 (Multi-tipo) + F-03 (Rate limit)
Semana 2:  F-04 (Analytics) + F-05 (WA idioma) + F-10 (Multi-campana)
Semana 3:  F-18 (QR Tracking — redirect + generacion + DB) ← requiere F-04 para funnel completo
Semana 4-5: F-06 (Spin Wheel)
Semana 6-9: F-07 (Dashboard completo + UI de QR codes de F-18) + F-17 (Canje auth)
Semana 8:  F-08 (Cumpleanos) + F-09 (Email fallback)
Mes 3:     F-11 (Multi-tenant) + F-12 (Billing)
Mes 4+:    F-13, F-14, F-15, F-16 segun demanda
```
