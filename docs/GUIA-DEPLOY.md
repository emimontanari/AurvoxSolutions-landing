# Guia de Deploy y Operaciones -- OfertaCore (Single-Tenant)

> **OfertaCore** es una plataforma de captura de leads para restaurantes. En el modelo **single-tenant**, cada restaurante cliente recibe su propio deploy: su propio proyecto en Supabase y su propio proyecto en Vercel. Nada se comparte entre clientes. Agregar un nuevo restaurante significa crear una nueva instancia completa.

---

## Tabla de Contenidos

1. [Requisitos Previos](#parte-1-requisitos-previos)
2. [Preparar el Proyecto para un Nuevo Cliente](#parte-2-preparar-el-proyecto-para-un-nuevo-cliente)
3. [Crear Proyecto Supabase](#parte-3-crear-proyecto-supabase)
4. [Deploy en Vercel](#parte-4-deploy-en-vercel)
5. [Configurar Dominio Personalizado](#parte-5-configurar-dominio-personalizado)
6. [Generacion de QR Codes](#parte-6-generacion-de-qr-codes)
7. [Monitoreo y Mantenimiento](#parte-7-monitoreo-y-mantenimiento)
8. [Checklist por Cliente](#parte-8-checklist-por-cliente)
9. [Troubleshooting Comun](#parte-9-troubleshooting-comun)

---

## Diferencias Clave vs. Multi-Tenant

Antes de empezar, es importante entender como cambia el modelo:

| Aspecto | Multi-Tenant (antes) | Single-Tenant (ahora) |
|---------|---------------------|----------------------|
| **Deploy** | Un solo Vercel deploy para todos | Un Vercel deploy **por cliente** |
| **Base de datos** | Un Supabase compartido | Un Supabase **por cliente** |
| **Automatizacion** | n8n compartido (workflow por restaurante) | Sin n8n — la API route maneja todo directamente |
| **URL del formulario** | `https://dominio.com/slug` | `https://dominio-cliente.com/` (raiz) |
| **Slug del restaurante** | Viene del path en la URL | Viene de la variable de entorno `NEXT_PUBLIC_RESTAURANT_SLUG` |
| **Agregar un cliente** | INSERT en Supabase + workflow en n8n | Nuevo Supabase + nuevo Vercel |

---

## Parte 1: Requisitos Previos

Antes de comenzar, asegurate de tener lo siguiente:

### Software Local

| Requisito | Version Minima | Verificar con |
|-----------|---------------|---------------|
| Node.js | 18.0+ | `node --version` |
| pnpm | 8.0+ | `pnpm --version` |
| Git | 2.30+ | `git --version` |
| Vercel CLI (opcional) | Ultima | `vercel --version` |

Si no tenes `pnpm` instalado:

```bash
npm install -g pnpm
```

Si no tenes Vercel CLI (opcional, se puede hacer todo desde el dashboard web):

```bash
npm install -g vercel
```

### Cuentas y Servicios

| Servicio | Proposito | URL |
|----------|-----------|-----|
| **GitHub** | Repositorio del codigo (para auto-deploy desde Vercel) | [github.com](https://github.com) |
| **Vercel** | Hosting de la aplicacion Next.js (un proyecto por cliente) | [vercel.com](https://vercel.com) |
| **Supabase** | Base de datos PostgreSQL, Auth, Storage (un proyecto por cliente) | [supabase.com](https://supabase.com) |
| **Meta for Developers** | WhatsApp Business API | [developers.facebook.com](https://developers.facebook.com) |

> **Nota sobre limites de Supabase:** El plan gratuito permite hasta 2 proyectos activos. Si ya tenes 2 proyectos, necesitas pausar uno o hacer upgrade de plan para crear mas. El plan Pro no tiene limite de proyectos.

---

## Parte 2: Preparar el Proyecto para un Nuevo Cliente

Cada nuevo cliente parte de una copia (fork o clone) del repositorio base de OfertaCore.

### Paso 1: Clonar o Forkear el Repositorio

**Opcion A: Fork en GitHub (recomendado si cada cliente tiene su propio repo)**

1. Ir al repositorio base en GitHub
2. Hacer clic en **Fork**
3. Nombrar el fork con el nombre del cliente: `ofertacore-taqueria-el-rey`
4. Clonar el fork localmente:

```bash
git clone https://github.com/tu-usuario/ofertacore-taqueria-el-rey.git
cd ofertacore-taqueria-el-rey
pnpm install
```

**Opcion B: Clone directo (si usas un solo repo con branches)**

```bash
git clone https://github.com/tu-usuario/ofertacore.git ofertacore-taqueria-el-rey
cd ofertacore-taqueria-el-rey
```

### Paso 2: Datos que Necesitas del Cliente

Antes de configurar, recopilar la siguiente informacion:

- Nombre del restaurante
- Slug URL-friendly (ej: `taqueria-el-rey`)
- Email del dueno
- Telefono del restaurante
- Sitio web (si tiene)
- URL del logo (subir a Supabase Storage o usar URL externa)
- Colores de marca (primario y secundario en hexadecimal)
- Idioma preferido (`es` o `en`)
- Zona horaria (ej: `America/Argentina/Buenos_Aires`, `America/Mexico_City`)
- Moneda (`ARS`, `MXN`, `USD`, etc.)
- Nombre y texto de la oferta (ej: "Guacamole Gratis", "10% de Descuento")
- Direccion de cada sucursal
- Cantidad de mesas (para generar QR codes)
- Credenciales de WhatsApp Business API (si aplica)

### Paso 3: Elegir un Slug

El slug se usa internamente para identificar al restaurante en la base de datos. En el modelo single-tenant, el slug **no aparece en la URL** (el formulario se sirve en la raiz `/`), pero sigue siendo necesario como identificador en Supabase.

Debe ser:

- Todo en minusculas
- Sin espacios (usar guiones)
- Sin caracteres especiales ni acentos
- Unico dentro de su propio Supabase (en single-tenant esto se cumple automaticamente)

Ejemplos:

- "Taqueria El Rey" -> `taqueria-el-rey`
- "Sushi Garden Buenos Aires" -> `sushi-garden-ba`
- "Pizzeria Roma Centro" -> `pizzeria-roma-centro`

### Paso 4: Variables de Entorno

Cada deploy de cliente necesita estas 4 variables de entorno:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_...
NEXT_PUBLIC_RESTAURANT_SLUG=taqueria-el-rey
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Explicacion de cada variable:**

| Variable | Exposicion | Descripcion |
|----------|-----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Publica (navegador) | URL del proyecto Supabase **de este cliente**. Segura porque solo permite operaciones autorizadas por RLS. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | Publica (navegador) | Clave publicable de Supabase **de este cliente**. NO es la clave `service_role`. Solo permite operaciones restringidas por RLS. |
| `NEXT_PUBLIC_RESTAURANT_SLUG` | Publica (navegador) | El slug del restaurante. La aplicacion lo usa para buscar los datos del restaurante en Supabase al cargar la pagina. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only | Clave `service_role` del Supabase **de este cliente**. Bypasea RLS. Sin prefijo `NEXT_PUBLIC_` porque no debe exponerse al navegador. La usa la API route `/api/submit` para escribir contactos y signups. |

> **Importante:** Notar que `SUPABASE_SERVICE_ROLE_KEY` NO tiene el prefijo `NEXT_PUBLIC_`. Esto es intencional. La variable solo se usa del lado del servidor en la ruta `/api/submit`. NUNCA exponerla al navegador.

---

## Parte 3: Crear Proyecto Supabase

Cada cliente necesita su propio proyecto en Supabase con el esquema aplicado y los datos iniciales insertados.

### Paso 1: Crear el Proyecto

1. Ir a [supabase.com/dashboard](https://supabase.com/dashboard)
2. Hacer clic en **"New Project"**
3. Seleccionar la organizacion (o crear una nueva para este cliente)
4. Completar los datos:

| Campo | Valor |
|-------|-------|
| **Name** | `ofertacore-taqueria-el-rey` (nombre descriptivo) |
| **Database Password** | Generar una password segura y guardarla |
| **Region** | Elegir la mas cercana al cliente (ej: `East US` para Latam) |
| **Plan** | Free o Pro segun necesidades |

5. Hacer clic en **"Create new project"**
6. Esperar a que el proyecto termine de inicializarse (1-2 minutos)

### Paso 2: Obtener las Credenciales

Una vez creado el proyecto, ir a **Settings > API** y anotar:

- **Project URL**: `https://xxxxxxxxxxxx.supabase.co` (esta es `NEXT_PUBLIC_SUPABASE_URL`)
- **Publishable Key**: `sb_publishable_...` (esta es `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`)
- **Service Role Key**: `eyJhbGciOiJIUzI1NiIs...` (esta es `SUPABASE_SERVICE_ROLE_KEY`)

> **Importante:** La clave `service_role` bypasea RLS y da acceso completo a la base de datos. Solo usarla del lado del servidor (API route). NUNCA exponerla al navegador.

### Paso 3: Aplicar el Esquema de Base de Datos

1. Ir al dashboard de Supabase > **SQL Editor**
2. Copiar y pegar el contenido completo del archivo `schema.sql` de la raiz del repositorio
3. Ejecutar

Las tablas que se crean son: `restaurants`, `locations`, `campaigns`, `campaign_prizes`, `contacts`, `contact_tags`, `signups`, `redemptions`, `messages_log`, `analytics_events`.

Ademas se crean triggers, funciones, politicas RLS, indexes, y un job de `pg_cron` para expirar signups pendientes.

> **Nota sobre pg_cron:** La extension `pg_cron` debe estar habilitada en el dashboard de Supabase > **Database > Extensions**. Buscar "pg_cron" y activarla si no lo esta. Lo mismo para `pgcrypto`.

### Paso 4: Insertar Datos del Restaurante

Ir al **SQL Editor** de Supabase y ejecutar las siguientes queries, reemplazando los valores entre `< >` con los datos reales del cliente.

#### 4a. Crear el Restaurante

```sql
-- =================================================================
-- SETUP: <Nombre del Restaurante>
-- Fecha: <YYYY-MM-DD>
-- =================================================================

-- 1. CREAR EL RESTAURANTE
INSERT INTO restaurants (
  name,
  slug,
  owner_email,
  phone,
  website,
  logo_url,
  plan,
  whatsapp_config,
  settings
)
VALUES (
  '<Nombre del Restaurante>',
  '<slug-del-restaurante>',
  '<email@deldueno.com>',
  '<+54 11 1234-5678>',
  '<https://www.restaurante.com>',
  '<https://url-del-logo.com/logo.png>',
  'starter',
  jsonb_build_object(
    'waba_id', '<ID_WABA>',
    'phone_number_id', '<ID_PHONE_NUMBER>',
    'access_token', '<TOKEN_WHATSAPP>',
    'verified', false
  ),
  jsonb_build_object(
    'timezone', '<America/Argentina/Buenos_Aires>',
    'language', '<es>',
    'currency', '<ARS>',
    'branding', jsonb_build_object(
      'primary_color', '<#FF6B35>',
      'secondary_color', '<#004E89>'
    )
  )
)
RETURNING id;
-- IMPORTANTE: Anotar el UUID que devuelve esta query (RESTAURANT_ID).
-- Ejemplo: a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

#### 4b. Crear la Ubicacion (Sucursal)

```sql
-- 2. CREAR LA UBICACION
-- Reemplazar <RESTAURANT_ID> con el UUID del paso anterior.
-- Si el restaurante tiene mas de una sucursal, ejecutar este INSERT
-- una vez por cada sucursal.

INSERT INTO locations (
  restaurant_id,
  name,
  address,
  city,
  state,
  country,
  phone,
  google_maps_url
)
VALUES (
  '<RESTAURANT_ID>',
  '<Sucursal Centro>',
  '<Av. Corrientes 1234>',
  '<Buenos Aires>',
  '<CABA>',
  'AR',
  '<+54 11 1234-5678>',
  '<https://maps.google.com/?q=...>'
)
RETURNING id;
-- Anotar el UUID de la ubicacion (LOCATION_ID).
```

#### 4c. Crear la Campana

```sql
-- 3. CREAR LA CAMPANA
-- Reemplazar <RESTAURANT_ID> con el UUID del restaurante.

-- Opcion A: Campana de Aperitivo Gratis
INSERT INTO campaigns (
  restaurant_id,
  name,
  display_name,
  campaign_type,
  offer_text,
  expiry_days,
  cooldown_days,
  code_prefix,
  config
)
VALUES (
  '<RESTAURANT_ID>',
  '<Nombre Interno - Promo Febrero 2026>',
  '<Aperitivo Gratis>',
  'appetizer',
  '<Guacamole artesanal gratis con tu primera visita>',
  7,       -- dias para canjear el codigo
  30,      -- dias de espera entre participaciones del mismo contacto
  NULL,    -- sin prefijo en el codigo de canje
  '{"require_email": true, "require_birthday": false}'::jsonb
)
RETURNING id;
-- Anotar el UUID de la campana (CAMPAIGN_ID).

-- Opcion B: Campana de Ruleta (Spin Wheel)
-- INSERT INTO campaigns (
--   restaurant_id, name, display_name, campaign_type, offer_text,
--   expiry_days, cooldown_days, code_prefix, config
-- )
-- VALUES (
--   '<RESTAURANT_ID>',
--   '<Nombre Interno - Ruleta Febrero>',
--   '<Gira y Gana>',
--   'spin_wheel',
--   '<Gira la ruleta y gana premios increibles>',
--   14, 1, 'SPIN-',
--   '{"show_recent_winners": true, "share_enabled": true, "sound_enabled": true}'::jsonb
-- )
-- RETURNING id;
```

#### 4d. Crear los Premios

```sql
-- 4. CREAR LOS PREMIOS DE LA CAMPANA
-- Reemplazar <CAMPAIGN_ID> con el UUID de la campana.

-- Para campana tipo APPETIZER (un solo premio):
INSERT INTO campaign_prizes (
  campaign_id,
  label,
  prize_type,
  prize_value,
  probability,
  description
)
VALUES (
  '<CAMPAIGN_ID>',
  '<Guacamole Gratis>',
  'freebie',
  '<Guacamole Artesanal>',
  1.0,
  '<Guacamole artesanal preparado al momento>'
);

-- Para campana tipo SPIN WHEEL (multiples premios, las probabilidades deben sumar 1.0):
-- INSERT INTO campaign_prizes (campaign_id, label, prize_type, prize_value, probability, color, display_order)
-- VALUES
--   ('<CAMPAIGN_ID>', '10% OFF',          'discount_percent', '10',    0.30, '#FF6B6B', 1),
--   ('<CAMPAIGN_ID>', '15% OFF',          'discount_percent', '15',    0.25, '#4ECDC4', 2),
--   ('<CAMPAIGN_ID>', '20% OFF',          'discount_percent', '20',    0.15, '#45B7D1', 3),
--   ('<CAMPAIGN_ID>', '25% OFF',          'discount_percent', '25',    0.10, '#96CEB4', 4),
--   ('<CAMPAIGN_ID>', 'Postre Gratis',    'freebie',          'Flan',  0.08, '#FFEAA7', 5),
--   ('<CAMPAIGN_ID>', '50% OFF',          'discount_percent', '50',    0.05, '#DDA0DD', 6),
--   ('<CAMPAIGN_ID>', 'Intenta de Nuevo', 'try_again',        NULL,    0.05, '#B0B0B0', 7),
--   ('<CAMPAIGN_ID>', 'CENA GRATIS',      'grand_prize',      'Cena para 2', 0.02, '#FFD700', 8);
```

### Paso 5: Verificar los Datos Insertados

Ejecutar esta query para confirmar que todo esta correcto:

```sql
SELECT
  r.name AS restaurante,
  r.slug,
  r.is_active AS restaurante_activo,
  l.name AS ubicacion,
  c.name AS campana,
  c.campaign_type AS tipo,
  c.is_active AS campana_activa,
  COUNT(cp.id) AS premios
FROM restaurants r
LEFT JOIN locations l ON l.restaurant_id = r.id
LEFT JOIN campaigns c ON c.restaurant_id = r.id
LEFT JOIN campaign_prizes cp ON cp.campaign_id = c.id
WHERE r.slug = '<slug-del-restaurante>'
GROUP BY r.name, r.slug, r.is_active, l.name, c.name, c.campaign_type, c.is_active;
```

Debe devolver una fila con `restaurante_activo = true`, `campana_activa = true`, y `premios >= 1`.

---

## Parte 4: Deploy en Vercel

Cada cliente tiene su propio proyecto en Vercel. El formulario se sirve en la raiz `/` (no hay slug en la URL).

### Opcion A: Deploy desde el Dashboard de Vercel (Recomendado)

#### Paso 1: Subir el Codigo a GitHub

Si el repositorio del cliente aun no esta en GitHub:

```bash
# Desde la carpeta del proyecto del cliente
cd "/ruta/al/proyecto-cliente"

# Inicializar git (si no existe)
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Initial commit: OfertaCore for <nombre-restaurante>"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/tu-usuario/ofertacore-<slug>.git
git branch -M main
git push -u origin main
```

#### Paso 2: Importar el Proyecto en Vercel

1. Ir a [vercel.com/new](https://vercel.com/new)
2. Hacer clic en **"Import Git Repository"**
3. Seleccionar el repositorio del cliente (ej: `ofertacore-taqueria-el-rey`)
4. Vercel detectara automaticamente que es un proyecto Next.js

#### Paso 3: Configurar el Proyecto

En la pantalla de configuracion, verificar estos valores:

| Campo | Valor |
|-------|-------|
| **Framework Preset** | Next.js (auto-detectado) |
| **Root Directory** | `./` (por defecto) |
| **Build Command** | `pnpm build` (auto-detectado si hay `pnpm-lock.yaml`) |
| **Install Command** | `pnpm install` |
| **Output Directory** | `.next` (por defecto, no cambiar) |

**Importante sobre pnpm:** Vercel detecta automaticamente el package manager si existe un archivo `pnpm-lock.yaml` en el repositorio. Si Vercel intenta usar `npm` en lugar de `pnpm`, ir a **Settings > General > Build & Development Settings** y establecer explicitamente:

- Install Command: `pnpm install`
- Build Command: `pnpm build`

#### Paso 4: Configurar Variables de Entorno

En la misma pantalla de import (o despues en **Settings > Environment Variables**), agregar las 4 variables:

| Nombre | Valor | Entornos |
|--------|-------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxxxxxxxxx.supabase.co` (del Supabase del cliente) | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | `sb_publishable_...` (clave del cliente) | Production, Preview, Development |
| `NEXT_PUBLIC_RESTAURANT_SLUG` | `taqueria-el-rey` (slug del cliente) | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1Ni...` (service_role key del cliente) | Production, Preview, Development |

Para agregar cada variable:

1. Escribir el nombre en el campo **Key**
2. Pegar el valor en el campo **Value**
3. Seleccionar los entornos donde aplica (recomendado: los tres)
4. Hacer clic en **Add**

> **Nota:** La variable `SUPABASE_SERVICE_ROLE_KEY` es obligatoria para que los envios del formulario funcionen. Sin ella, la API route no puede escribir contactos ni signups. El formulario cargara correctamente (lee datos con la clave publicable), pero los envios fallaran.

#### Paso 5: Deploy

Hacer clic en el boton **"Deploy"**. Vercel va a:

1. Clonar el repositorio
2. Ejecutar `pnpm install` para instalar dependencias
3. Ejecutar `pnpm build` para compilar la aplicacion
4. Desplegar las funciones serverless y los archivos estaticos

El proceso toma aproximadamente 1-3 minutos.

#### Paso 6: Verificar el Deploy

Una vez completado, Vercel te da una URL como:

```
https://ofertacore-taqueria-el-rey-xxxxx.vercel.app
```

Visitar la URL raiz (sin slug, sin path adicional):

```
https://ofertacore-taqueria-el-rey-xxxxx.vercel.app/
```

Deberias ver el formulario de captura de leads con el branding del restaurante (colores, logo, nombre). La aplicacion lee el slug de la variable de entorno `NEXT_PUBLIC_RESTAURANT_SLUG` y busca los datos del restaurante en Supabase.

Si ves una pagina 404 o un error, verificar que:
- La variable `NEXT_PUBLIC_RESTAURANT_SLUG` esta configurada correctamente en Vercel
- El restaurante existe en la tabla `restaurants` del Supabase del cliente
- El campo `is_active` del restaurante es `true`
- El campo `slug` en Supabase coincide exactamente con el valor de la variable de entorno
- El restaurante tiene al menos una campana activa en la tabla `campaigns`
- Las variables `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` apuntan al Supabase correcto

#### Paso 7: Configurar Auto-Deploy

Por defecto, Vercel ya esta configurado para auto-deploy. Cada vez que hagas `git push` a la rama `main`, Vercel va a re-deployar automaticamente. Los push a otras ramas generan "Preview Deployments" con URLs temporales.

### Opcion B: Deploy via CLI de Vercel

Si preferis usar la linea de comandos:

```bash
# Desde la carpeta del proyecto del cliente
cd "/ruta/al/proyecto-cliente"

# Login (abre el navegador para autenticar)
vercel login

# Primer deploy (crea el proyecto en Vercel)
vercel

# Responder a las preguntas:
# - Set up and deploy? Y
# - Which scope? (seleccionar tu cuenta)
# - Link to existing project? N
# - Project name? ofertacore-taqueria-el-rey
# - Directory? ./ (Enter)
# - Override settings? N
```

Despues del primer deploy, configurar las variables de entorno:

```bash
# Agregar variables de entorno una por una
vercel env add NEXT_PUBLIC_SUPABASE_URL
# (pegar el valor cuando lo pida, seleccionar Production + Preview + Development)

vercel env add NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
# (pegar el valor)

vercel env add NEXT_PUBLIC_RESTAURANT_SLUG
# (pegar el slug del restaurante)

vercel env add SUPABASE_SERVICE_ROLE_KEY
# (pegar la clave service_role del Supabase del cliente)
```

Hacer el deploy de produccion:

```bash
# Deploy a produccion (con las variables de entorno ya configuradas)
vercel --prod
```

> **Nota:** Si el repositorio ya esta conectado a GitHub en Vercel, no necesitas usar `vercel --prod` manualmente. Con hacer `git push origin main` alcanza.

---

## Parte 5: Configurar Dominio Personalizado

### Agregar el Dominio en Vercel

1. Ir al dashboard de Vercel > seleccionar el proyecto del cliente
2. Ir a **Settings > Domains**
3. Escribir el dominio del cliente (ej: `promo.taqueriaelrey.com` o `ofertas.restaurante.com`)
4. Hacer clic en **Add**

### Configuracion de DNS

Vercel te mostrara los registros DNS que necesitas configurar. Depende de si estas usando un dominio raiz (apex) o un subdominio.

#### Para un subdominio (ej: `promo.taqueriaelrey.com`)

Agregar un registro **CNAME** en el proveedor de DNS del cliente:

| Tipo | Nombre | Valor |
|------|--------|-------|
| CNAME | `promo` | `cname.vercel-dns.com` |

#### Para un dominio raiz/apex (ej: `taqueriaelrey.com`)

Agregar un registro **A** en el proveedor de DNS:

| Tipo | Nombre | Valor |
|------|--------|-------|
| A | `@` | `76.76.21.21` |

Y opcionalmente un CNAME para `www`:

| Tipo | Nombre | Valor |
|------|--------|-------|
| CNAME | `www` | `cname.vercel-dns.com` |

### Certificado SSL

Vercel genera y renueva automaticamente los certificados SSL (HTTPS) para el dominio personalizado. No necesitas hacer nada adicional. El certificado suele estar listo en pocos minutos despues de que los registros DNS se propaguen.

### Verificar el Dominio

Despues de configurar los DNS, esperar unos minutos para la propagacion. Luego verificar:

```
https://promo.taqueriaelrey.com/
```

Si el dominio no resuelve despues de 30 minutos, verificar la configuracion de DNS en el proveedor del cliente.

### Como se Ven las URLs

Con el dominio personalizado, las URLs del cliente quedan asi:

```
# Formulario principal (raiz)
https://promo.taqueriaelrey.com/

# Con numero de mesa
https://promo.taqueriaelrey.com/?table=5

# Con ubicacion y mesa
https://promo.taqueriaelrey.com/?loc=b0000000-0000-0000-0000-000000000001&table=12
```

Notar que **no hay slug en la URL**. El formulario se sirve directamente en la raiz. Cada deploy es exclusivo de un cliente, asi que no hace falta diferenciar restaurantes por path.

---

## Parte 6: Generacion de QR Codes

### Formato de la URL

Cada QR code apunta a una URL con la siguiente estructura:

```
https://<dominio-del-cliente>/?loc=<LOCATION_ID>&table=<NUMERO_DE_MESA>
```

**Parametros:**

| Parametro | Obligatorio | Descripcion |
|-----------|------------|-------------|
| `loc` | No | UUID de la ubicacion/sucursal |
| `table` | No | Numero de mesa (para tracking) |

**Ejemplos de URLs:**

```
# Basico (solo el dominio)
https://promo.taqueriaelrey.com/

# Con numero de mesa
https://promo.taqueriaelrey.com/?table=5

# Con ubicacion y mesa
https://promo.taqueriaelrey.com/?loc=b0000000-0000-0000-0000-000000000001&table=12

# Solo mesa (sin location UUID, para restaurantes con una sola sucursal)
https://promo.taqueriaelrey.com/?table=8
```

> **Nota:** En la mayoria de los casos, para restaurantes con una sola sucursal, alcanza con usar solo el parametro `table`. El parametro `loc` es util cuando un restaurante tiene multiples sucursales y necesita diferenciar los signups.

### Obtener los UUIDs de Ubicaciones

```sql
SELECT id, name FROM locations
WHERE restaurant_id = '<RESTAURANT_ID>'
AND is_active = true;
```

### Generar las URLs para Todas las Mesas

Para un restaurante con 20 mesas y un solo local:

```sql
-- Genera las URLs para todas las mesas
SELECT
  table_number,
  'https://promo.taqueriaelrey.com/?table=' || table_number AS qr_url
FROM generate_series(1, 20) AS table_number;
```

Para un restaurante con multiples sucursales:

```sql
-- Genera las URLs con location_id
SELECT
  table_number,
  'https://promo.taqueriaelrey.com/?loc=<LOCATION_ID>&table=' || table_number AS qr_url
FROM generate_series(1, 20) AS table_number;
```

### Herramientas para Generar QR Codes

| Herramienta | Tipo | URL |
|-------------|------|-----|
| **QR Code Generator (goqr.me)** | Web gratuita | [goqr.me](https://goqr.me) |
| **QR Code Monkey** | Web gratuita con personalizacion | [qrcode-monkey.com](https://www.qrcode-monkey.com) |
| **Canva** | Diseno + QR | [canva.com](https://canva.com) |
| **qrencode** (CLI) | Linea de comandos | `brew install qrencode` |
| **Bulk QR Code Generator** | Generar muchos a la vez | [bulkqrcodegenerator.com](https://bulkqrcodegenerator.com) |

#### Generacion por linea de comandos (para generar muchos):

```bash
# Instalar qrencode (macOS)
brew install qrencode

# Generar un QR individual
qrencode -o mesa-5.png -s 10 "https://promo.taqueriaelrey.com/?table=5"

# Generar QR para mesas 1 a 20
for i in $(seq 1 20); do
  qrencode -o "mesa-${i}.png" -s 10 \
    "https://promo.taqueriaelrey.com/?table=${i}"
done

# Con location_id (para multiples sucursales)
for i in $(seq 1 20); do
  qrencode -o "mesa-${i}.png" -s 10 \
    "https://promo.taqueriaelrey.com/?loc=UUID_AQUI&table=${i}"
done
```

### Buenas Practicas para QR Codes en Restaurantes

- **Tamano minimo:** El QR debe tener al menos 2.5 cm x 2.5 cm para que los telefonos lo lean bien.
- **Contraste:** Fondo blanco con QR negro. Evitar fondos de color que reduzcan el contraste.
- **Material:** Usar stickers laminados o acrilicos. Los QR en papel se deterioran rapidamente en un restaurante.
- **Ubicacion:** Colocar en las mesas, en los menus, o en porta-servilletas. Debe ser visible sin necesidad de pedirlo.
- **Texto acompanante:** Agregar un texto junto al QR como "Escanea y lleva tu aperitivo gratis" para incentivar la accion.
- **Probar antes de imprimir:** Siempre escanear el QR desde un telefono antes de enviar a imprenta. Verificar que carga la pagina correcta.

---

## Parte 7: Monitoreo y Mantenimiento

### Dashboard de Vercel (por cliente)

Acceder en [vercel.com/dashboard](https://vercel.com/dashboard). Cada cliente tiene su propio proyecto.

**Que monitorear:**

- **Deployments:** Ver el estado de cada deploy (exito, error, en progreso). Los deploys fallidos no afectan la version actual en produccion.
- **Function Logs:** En el proyecto > **Logs**. Filtrar por "Serverless Function" para ver los logs de `/api/submit`. Buscar errores como `[submit] Contact upsert failed:`, `[submit] Signup creation failed:`, o `[submit] WhatsApp send failed`.
- **Analytics:** Metricas de visitas, rendimiento y Web Vitals (disponible en planes pagos).
- **Speed Insights:** Tiempos de carga por pagina.

### Dashboard de Supabase (por cliente)

Acceder en [supabase.com/dashboard](https://supabase.com/dashboard). Cada cliente tiene su propio proyecto.

**Que monitorear:**

- **Table Editor:** Revisar los datos de las tablas directamente. Util para verificar que los signups y contactos se estan creando correctamente.
- **SQL Editor:** Ejecutar queries de diagnostico.
- **Logs:** En el menu lateral > **Logs**. Filtrar por tipo (Postgres, API, Auth).
- **Database Health:** En **Database > Health** ver el uso de CPU, memoria y conexiones.

#### Queries de Diagnostico Utiles

```sql
-- Signups de las ultimas 24 horas
SELECT COUNT(*) AS signups_24h
FROM signups
WHERE created_at > now() - INTERVAL '24 hours';
```

```sql
-- Funnel de conversion (ultimos 7 dias)
SELECT
  event_type,
  COUNT(*) AS total
FROM analytics_events
WHERE created_at > now() - INTERVAL '7 days'
AND event_type IN ('page_view', 'form_start', 'form_submit')
GROUP BY event_type
ORDER BY total DESC;
```

```sql
-- Codigos pendientes que estan por vencer (proximas 24 horas)
SELECT
  s.redemption_code,
  c.first_name,
  c.phone,
  s.expires_at
FROM signups s
JOIN contacts c ON c.id = s.contact_id
WHERE s.status = 'pending'
  AND s.expires_at BETWEEN now() AND now() + INTERVAL '24 hours'
ORDER BY s.expires_at;
```

```sql
-- Tasa de canje
SELECT
  COUNT(*) AS total_signups,
  COUNT(*) FILTER (WHERE status = 'claimed') AS canjeados,
  COUNT(*) FILTER (WHERE status = 'expired') AS expirados,
  COUNT(*) FILTER (WHERE status = 'pending') AS pendientes,
  ROUND(
    (COUNT(*) FILTER (WHERE status = 'claimed')::DECIMAL / NULLIF(COUNT(*), 0)) * 100, 1
  ) AS tasa_canje_pct
FROM signups;
```

### Job de Expiracion Automatica (pg_cron)

El schema incluye un job de `pg_cron` que expira signups pendientes cada 15 minutos:

```sql
-- Verificar que el job esta activo
SELECT * FROM cron.job WHERE jobname = 'expire-pending-signups';

-- Ver las ejecuciones recientes del job
SELECT * FROM cron.job_run_details
WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname = 'expire-pending-signups')
ORDER BY start_time DESC
LIMIT 10;
```

Si el job no esta activo, recrearlo:

```sql
SELECT cron.schedule(
  'expire-pending-signups',
  '*/15 * * * *',
  $$SELECT expire_signups()$$
);
```

> **Nota:** La extension `pg_cron` debe estar habilitada en el dashboard de Supabase > **Database > Extensions**. Buscar "pg_cron" y activarla si no lo esta.

---

## Parte 8: Checklist por Cliente

Usar esta checklist cada vez que se configura un nuevo cliente. Copiar y marcar cada item a medida que se completa.

```
CLIENTE: ___________________________ (nombre del restaurante)
SLUG: ___________________________
FECHA: _______________
RESPONSABLE: _______________

SUPABASE
[ ] Proyecto Supabase creado (nombre, region, password anotada)
[ ] Credenciales obtenidas (URL, publishable key, service_role key)
[ ] Schema aplicado (schema.sql ejecutado en SQL Editor)
[ ] pg_cron y pgcrypto habilitados en Extensions
[ ] INSERT en tabla restaurants (con slug, branding, settings, whatsapp_config)
[ ] INSERT en tabla locations (una o mas sucursales)
[ ] INSERT en tabla campaigns (tipo de campana definido)
[ ] INSERT en tabla campaign_prizes (premios configurados)
[ ] Query de verificacion ejecutada y datos correctos

VERCEL
[ ] Repositorio creado/forkeado en GitHub
[ ] Proyecto importado en Vercel
[ ] Variable: NEXT_PUBLIC_SUPABASE_URL configurada
[ ] Variable: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY configurada
[ ] Variable: NEXT_PUBLIC_RESTAURANT_SLUG configurada
[ ] Variable: SUPABASE_SERVICE_ROLE_KEY configurada
[ ] Deploy exitoso
[ ] Formulario carga en la URL raiz (/)

QR CODES
[ ] URLs generadas para cada mesa/ubicacion
[ ] QR codes generados e impresos
[ ] QR codes probados con telefono real

PRUEBA DE FLUJO COMPLETO
[ ] Formulario carga correctamente (branding, colores, logo, nombre)
[ ] Formulario enviado con datos de prueba
[ ] Contacto creado en Supabase (tabla contacts)
[ ] Signup creado con codigo de canje (tabla signups)
[ ] Codigo de canje mostrado en pantalla de exito
[ ] WhatsApp recibido con codigo (si whatsapp_config esta configurado)
[ ] Datos de prueba limpiados (borrar contacto y signup de prueba)

DOMINIO (OPCIONAL)
[ ] Dominio personalizado agregado en Vercel
[ ] DNS configurado (CNAME o registro A)
[ ] SSL activo
[ ] URLs de QR actualizadas con el dominio final

ENTREGA AL CLIENTE
[ ] QR codes entregados/instalados en las mesas
[ ] Cliente informado sobre como funciona el sistema
[ ] Contacto de soporte proporcionado
```

---

## Parte 9: Troubleshooting Comun

### Problema: El formulario no carga (pagina en blanco o error)

**Sintomas:** Al visitar `https://dominio-del-cliente.com/` aparece una pagina de error o una pagina 404.

**Causas posibles y soluciones:**

1. **La variable `NEXT_PUBLIC_RESTAURANT_SLUG` no esta configurada o tiene un valor incorrecto.**

   Verificar en Vercel > **Settings > Environment Variables** que la variable existe y que el valor coincide con el slug en la base de datos.

2. **El restaurante no existe en la base de datos.** Verificar en el Supabase del cliente:
   ```sql
   SELECT id, name, slug, is_active FROM restaurants WHERE slug = '<slug>';
   ```
   Si no devuelve resultados, el restaurante no fue insertado.

3. **El restaurante esta inactivo.** Verificar que `is_active` sea `true`:
   ```sql
   UPDATE restaurants SET is_active = true WHERE slug = '<slug>';
   ```

4. **No hay campana activa.** El formulario requiere al menos una campana activa:
   ```sql
   SELECT id, name, campaign_type, is_active
   FROM campaigns
   WHERE restaurant_id = '<RESTAURANT_ID>'
   ORDER BY created_at DESC;
   ```
   Si ninguna campana tiene `is_active = true`, activar una:
   ```sql
   UPDATE campaigns SET is_active = true WHERE id = '<CAMPAIGN_ID>';
   ```

5. **Las credenciales de Supabase apuntan al proyecto equivocado.** Verificar que `NEXT_PUBLIC_SUPABASE_URL` corresponde al Supabase donde insertaste los datos del cliente, no a otro proyecto.

---

### Problema: El formulario se envia pero da error

**Sintomas:** El usuario completa el formulario, hace clic en enviar, pero recibe un error.

**Causas posibles y soluciones:**

1. **La variable `SUPABASE_SERVICE_ROLE_KEY` no esta configurada o es incorrecta.**

   Verificar en los logs de Vercel (proyecto > Logs) si aparece:
   ```
   [submit] Contact upsert failed:
   ```
   o
   ```
   [submit] Signup creation failed:
   ```

   Solucion: Verificar que `SUPABASE_SERVICE_ROLE_KEY` en Vercel contiene la clave `service_role` correcta del Supabase del cliente (Settings > API > Project API keys).

2. **El contacto ya participo de la campana (cooldown activo).**

   Si el log muestra `[submit]` con status 409, el contacto ya participo y esta en periodo de cooldown. Esto es comportamiento esperado.

3. **Las variables fueron actualizadas pero no se re-deployo.** Despues de agregar o modificar variables de entorno en Vercel, es necesario hacer un nuevo deploy:
   ```bash
   git commit --allow-empty -m "trigger redeploy"
   git push origin main
   ```

---

### Problema: El WhatsApp no se envia

**Sintomas:** El signup se crea correctamente en Supabase pero no llega el mensaje de WhatsApp.

**Causas posibles y soluciones:**

1. **Credenciales de WhatsApp incorrectas.** Verificar en la tabla `restaurants` que `whatsapp_config` contiene:
   - `access_token` vigente (los tokens de Meta expiran periodicamente)
   - `phone_number_id` correcto
   - `verified` en `true`

   ```sql
   SELECT whatsapp_config FROM restaurants WHERE slug = '<slug>';
   ```

2. **Template de WhatsApp no aprobado.** Los mensajes de WhatsApp Business API requieren templates pre-aprobados por Meta. Verificar en el dashboard de Meta que el template `coupon_confirmation` esta aprobado y activo.

3. **Numero de telefono del contacto invalido.** WhatsApp requiere el formato internacional completo (ej: `+5491112345678`). Verificar que el formulario no esta guardando numeros en formato local.

4. **Error silencioso en el envio.** El envio de WhatsApp es fire-and-forget (no bloquea la respuesta al usuario). Revisar los logs de Vercel buscando `[submit] WhatsApp send failed`. Tambien verificar la tabla `messages_log`:
   ```sql
   SELECT * FROM messages_log WHERE status = 'failed' ORDER BY created_at DESC LIMIT 10;
   ```

---

### Problema: Las variables de entorno no cargan

**Sintomas:** La aplicacion no se conecta a Supabase o los formularios fallan con errores de "supabaseUrl is required".

**Causas posibles y soluciones:**

1. **Las variables no estan configuradas en Vercel.** Ir a Vercel > Proyecto > Settings > Environment Variables y verificar que las 4 variables estan presentes (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`, `NEXT_PUBLIC_RESTAURANT_SLUG`, `SUPABASE_SERVICE_ROLE_KEY`).

2. **Las variables se agregaron pero no se re-deployo.** Despues de agregar o modificar variables de entorno en Vercel, es necesario hacer un nuevo deploy para que tomen efecto:
   - Via GitHub: hacer un commit vacio y push
     ```bash
     git commit --allow-empty -m "trigger redeploy"
     git push origin main
     ```
   - Via dashboard: ir a Deployments > seleccionar el ultimo deploy > Redeploy

3. **Las variables `NEXT_PUBLIC_*` estan sin el prefijo.** Las variables que necesita el navegador **deben** tener el prefijo `NEXT_PUBLIC_`. Si la variable se llama `SUPABASE_URL` en vez de `NEXT_PUBLIC_SUPABASE_URL`, el frontend no va a poder acceder a ella.

4. **La variable `SUPABASE_SERVICE_ROLE_KEY` tiene el prefijo `NEXT_PUBLIC_`.** Esta variable es server-only y **no debe** tener el prefijo `NEXT_PUBLIC_` porque contiene la clave de acceso completo a la base de datos y no deberia exponerse al navegador.

5. **Las credenciales de Supabase apuntan al proyecto equivocado.** En single-tenant, cada cliente tiene su propio Supabase. Verificar que las variables `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` corresponden al Supabase correcto para este cliente.

---

### Problema: El deploy en Vercel falla

**Sintomas:** El build falla con errores.

**Causas posibles y soluciones:**

1. **Error de dependencias.** Si el error menciona `pnpm` no encontrado:
   - Verificar que existe `pnpm-lock.yaml` en el repositorio
   - Configurar el Install Command como `pnpm install` en Settings > General

2. **Error de TypeScript.** El proyecto tiene configurado `ignoreBuildErrors: true` en `next.config.mjs`, asi que errores de TypeScript no deberian romper el build. Si aun asi falla, el error es probablemente de otro tipo.

3. **Error de memoria.** Si el build falla por falta de memoria, ir a Settings > General > Build & Development Settings y aumentar el Node.js Memory (si tu plan lo permite).

4. **La variable `NEXT_PUBLIC_RESTAURANT_SLUG` no esta definida.** Si la aplicacion depende de esta variable durante el build (no solo en runtime), asegurate de que este configurada antes de ejecutar el build.

---

### Problema: Los datos de analytics no se registran

**Sintomas:** La tabla `analytics_events` esta vacia o no registra ciertos eventos.

**Causas posibles y soluciones:**

1. **La politica RLS de anon INSERT no esta activa.** Verificar:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'analytics_events';
   ```
   Debe existir una politica que permita `INSERT` al rol `anon`.

2. **Error silencioso en el cliente.** El tracking de analytics usa fire-and-forget (no reporta errores al usuario). Revisar la consola del navegador (DevTools > Console) para ver si hay errores de red al insertar en `analytics_events`.

---

### Problema: Los codigos de canje no se generan

**Sintomas:** Los signups se crean pero el campo `redemption_code` esta vacio o el insert falla.

**Causas posibles y soluciones:**

1. **El trigger `auto_generate_signup_code` no existe.** Verificar:
   ```sql
   SELECT tgname FROM pg_trigger WHERE tgname = 'trg_signups_auto_code';
   ```
   Si no existe, volver a ejecutar el `schema.sql` completo o la parte relevante que crea la funcion y el trigger.

2. **La extension `pgcrypto` no esta habilitada.** Verificar:
   ```sql
   SELECT * FROM pg_extension WHERE extname = 'pgcrypto';
   ```
   Si no esta, habilitarla en **Database > Extensions**.

---

## Apendice: Referencia Rapida de Comandos

### Desarrollo Local

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Build de produccion (para probar localmente)
pnpm build && pnpm start

# Lint
pnpm lint
```

Para desarrollo local, crear un archivo `.env.local` con las variables del cliente que estes trabajando:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_...
NEXT_PUBLIC_RESTAURANT_SLUG=taqueria-el-rey
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Vercel CLI

```bash
# Login
vercel login

# Deploy preview
vercel

# Deploy produccion
vercel --prod

# Ver logs en tiempo real
vercel logs <url-del-deploy>

# Listar variables de entorno
vercel env ls

# Agregar variable de entorno
vercel env add <NOMBRE_VARIABLE>

# Eliminar variable de entorno
vercel env rm <NOMBRE_VARIABLE>
```

### SQL Utiles en Supabase

```sql
-- Ver el restaurante configurado
SELECT id, name, slug, plan, is_active, settings FROM restaurants;

-- Ver las campanas
SELECT id, name, display_name, campaign_type, is_active
FROM campaigns
ORDER BY created_at DESC;

-- Ver las ubicaciones
SELECT id, name, address, city, is_active FROM locations;

-- Contar signups por dia (ultimos 30 dias)
SELECT
  DATE(created_at) AS fecha,
  COUNT(*) AS total
FROM signups
WHERE created_at > now() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY fecha DESC;

-- Buscar un contacto por telefono
SELECT * FROM contacts WHERE phone LIKE '%1234567890%';

-- Buscar un signup por codigo de canje
SELECT
  s.redemption_code,
  s.status,
  s.expires_at,
  c.first_name,
  c.phone,
  camp.name AS campana
FROM signups s
JOIN contacts c ON c.id = s.contact_id
JOIN campaigns camp ON camp.id = s.campaign_id
WHERE s.redemption_code = '<CODIGO>';

-- Desactivar el restaurante (sin borrar datos)
UPDATE restaurants SET is_active = false WHERE slug = '<slug>';

-- Reactivar el restaurante
UPDATE restaurants SET is_active = true WHERE slug = '<slug>';
```

### Proceso para Agregar un Nuevo Cliente (Resumen)

```
1. Crear proyecto Supabase para el cliente
2. Aplicar schema.sql
3. Insertar datos (restaurant, location, campaign, prizes)
4. Fork/clone del repositorio
5. Crear proyecto en Vercel con las 4 variables de entorno
6. Configurar dominio personalizado (opcional)
7. Generar QR codes con las URLs del dominio del cliente
8. Probar flujo completo
9. Entregar QR codes al cliente
```

---

**Ultima actualizacion:** Febrero 2026
**Plataforma:** OfertaCore v2.0 (Single-Tenant)
