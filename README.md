# CIEP MERCI - Petanca SaaS (Railway Optimized)

Este es un monorepo que contiene el Backend (NestJS) y el Frontend (Next.js) para la plataforma de seguimiento de petanca basada en el método MERCI.

## Estructura
- `/backend`: API REST con NestJS, TypeORM y PostgreSQL.
- `/frontend`: Aplicación web con Next.js y TailwindCSS.

---

## 🚀 Despliegue en Railway

Sigue estos pasos para desplegar la plataforma completa. **No uses Vercel**, todo se puede gestionar dentro de Railway.

### 1. Base de Datos (PostgreSQL)
1. En tu proyecto de Railway, haz clic en **+ New** -> **Database** -> **Add PostgreSQL**.
2. Railway creará la base de datos automáticamente.

### 2. Servicio de Backend (API)
1. Haz clic en **+ New** -> **GitHub Repo** -> Selecciona este repositorio.
2. En los ajustes del servicio (**Settings**):
   - **Service Name**: `backend`
   - **Root Directory**: `backend`
3. En la pestaña **Variables**, añade las siguientes:
   - `PORT`: `3001`
   - `DATABASE_URL`: `${{Postgres.DATABASE_URL}}` (Selecciona la variable de la base de datos creada en el paso 1)
   - `JWT_SECRET`: (Cualquier cadena larga y segura)
   - `STRIPE_SECRET_KEY`: (Tu sk_test_... de Stripe)
   - `STRIPE_WEBHOOK_SECRET`: (whsec_... de Stripe Webhooks)
   - `FRONTEND_URL`: (La URL que Railway te asigne para el servicio frontend, ej: `https://frontend-production.up.railway.app`)
   - `DB_SYNC`: `true` (Cambia a `false` después del primer despliegue exitoso)

### 3. Servicio de Frontend (Web App)
1. Haz clic en **+ New** -> **GitHub Repo** -> Selecciona el mismo repositorio.
2. En los ajustes del servicio (**Settings**):
   - **Service Name**: `frontend`
   - **Root Directory**: `frontend`
3. En la pestaña **Variables**, añade:
   - `NEXT_PUBLIC_API_URL`: (La URL que Railway te asigne para el servicio backend, ej: `https://backend-production.up.railway.app`)

---

## 🛠 Desarrollo Local
Si tienes Docker instalado, puedes correr todo localmente:
```bash
docker-compose up --build
```
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

## 🔒 Seguridad
- El registro público está restringido al rol `PLAYER`.
- Los endpoints de entrenamiento están protegidos por un `GatingGuard` que verifica que el jugador haya completado el onboarding (Pago y Compromiso).
