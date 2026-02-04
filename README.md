# CIEP MERCI - Petanca SaaS

Este es un monorepo que contiene el Backend (NestJS) y el Frontend (Next.js) para la plataforma de seguimiento de petanca.

## Estructura
- `/backend`: API REST con NestJS y TypeORM (PostgreSQL).
- `/frontend`: Aplicación web con Next.js y TailwindCSS.

## Despliegue en Railway

Para un despliegue exitoso en Railway, se recomienda crear **dos servicios separados** apuntando al mismo repositorio:

### 1. Servicio de Backend
- **Root Directory**: `backend`
- **Variables de Entorno**:
  - `PORT`: 3001 (o el que asigne Railway)
  - `DATABASE_URL`: (Conectar a tu base de datos PostgreSQL de Railway)
  - `JWT_SECRET`: (Tu clave secreta)
  - `STRIPE_SECRET_KEY`: (Tu clave de Stripe)
  - `FRONTEND_URL`: (La URL final de tu servicio frontend)
  - `DB_SYNC`: `true` (Solo para la primera ejecución, luego `false`)

### 2. Servicio de Frontend
- **Root Directory**: `frontend`
- **Variables de Entorno**:
  - `NEXT_PUBLIC_API_URL`: (La URL de tu servicio backend de Railway)

## Desarrollo Local con Docker
Usa el comando:
```bash
docker-compose up --build
```
El backend correrá en `http://localhost:3001` y el frontend en `http://localhost:3000`.
