# CIEP MERCI - Petanca SaaS (Railway Optimized)

Este es un monorepo que contiene el Backend (NestJS) y el Frontend (Next.js) para la plataforma de seguimiento de petanca basada en el método MERCI.

## 📌 Estado Actual
- **Frontend**: Ubicado en `/frontend`, desarrollado con Next.js y TailwindCSS.
- **Backend**: Ubicado en `/backend`, desarrollado con NestJS y TypeORM.
- **Rama Actual**: `feature/petanca-saas-merci-final` (Asegúrate de configurar Railway para usar esta rama).

---

## 🚀 Despliegue en Railway

### 1. Base de Datos (PostgreSQL)
1. En Railway: **+ New** -> **Database** -> **Add PostgreSQL**.

### 2. Servicio de Backend (API)
1. **+ New** -> **GitHub Repo** -> Selecciona este repositorio.
2. **Settings**:
   - **Service Name**: `backend`
   - **Root Directory**: `backend`
   - **Branch**: `feature/petanca-saas-merci-final`
3. **Variables**:
   - `PORT`: `3001`
   - `DATABASE_URL`: `${{Postgres.DATABASE_URL}}`
   - `JWT_SECRET`: (Tu clave segura)
   - `STRIPE_SECRET_KEY`: (Tu sk_test_...)
   - `STRIPE_WEBHOOK_SECRET`: (Tu whsec_...)
   - `FRONTEND_URL`: (Ej: `https://tu-frontend.up.railway.app`)
   - `DB_SYNC`: `true`

### 3. Servicio de Frontend (Web App)
1. **+ New** -> **GitHub Repo** -> Selecciona el mismo repositorio.
2. **Settings**:
   - **Service Name**: `frontend`
   - **Root Directory**: `frontend`
   - **Branch**: `feature/petanca-saas-merci-final`
3. **Variables**:
   - `NEXT_PUBLIC_API_URL`: `https://artistic-back-production.up.railway.app` (O la URL que te asigne Railway para el backend)

---

## 🛠 Desarrollo Local
```bash
docker-compose up --build
```

## 🔒 Seguridad
- Registro público limitado a `PLAYER`.
- Gating estricto mediante `GatingGuard` en API y Onboarding Wizard en UI.
