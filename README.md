# TrendNova (SaaS Base)

Plataforma SaaS para análisis de tendencias en tiempo real.
Estructura base escalable (Next.js 14 App Router + Supabase + Tailwind).

## 🚀 Instalación

1.  **Dependencias:**
    ```bash
    npm install
    ```

2.  **Variables de Entorno:**
    Renombrar `.env.local.example` o crear `.env.local` con tus credenciales de Supabase:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

3.  **Base de Datos (Supabase):**
    Ejecutar el script `schema.sql` en el Editor SQL de tu dashboard de Supabase para crear todas las tablas, triggers y políticas RLS.

4.  **Iniciar Desarrollo:**
    ```bash
    npm run dev
    ```
    Visita `http://localhost:3000`.

## 📂 Estructura

-   `/app`: Rutas del App Router (Public, Dashboard, Admin).
-   `/components/ui`: Componentes reutilizables (shadcn-like).
-   `/lib/supabase`: Cliente, Server y Middleware para Supabase SSR.
-   `/services`: Capa de lógica de negocio (Stubs para Trends, News, Scoring).
-   `/types`: Definiciones de TypeScript (incluyendo Database).

## 🌍 Rutas Principales

-   `/login`, `/register`: Autenticación.
-   `/[country]`: Dashboard principal filtrado por país (us, mx, es, do).
-   `/[country]/t/[slug]`: Detalle de tendencia (Placeholder).

## 🎨 Diseño

-   **Tema**: Dark Mode por defecto.
-   **Colores**:
    -   Background: `#0B0F14`
    -   Primary: `#00B3FF`
    -   Secondary: `#00FF9C`

## 🔜 Próximos Pasos (No incluidos en esta fase)

-   Integrar `google-trends-api` en `trendService.ts`.
-   Conectar NewsAPI en `newsService.ts`.
-   Activar Cron Jobs para actualización automática.
