# Nota Técnica: Resolución de Error 404 en Deploy (Railway)

## 1. Causa Raíz
El error 404 en producción se debía a una combinación de factores en la configuración de Next.js y el entorno de Railway:
- **Estructura de Rutas**: La implementación de i18n con `next-intl` movió las páginas al segmento dinámico `/[locale]`, pero el middleware no estaba capturando correctamente la raíz `/` para redirigirla al locale por defecto.
- **Comando de Inicio**: El comando `next start` por defecto escucha en el puerto 3000, pero Railway requiere que la aplicación escuche en el puerto inyectado mediante la variable de entorno `$PORT`.
- **Falta de Build en el Contenedor**: El Dockerfile original era de desarrollo y no ejecutaba `next build`, lo que causaba que Railway intentara arrancar una aplicación sin los artefactos de producción en `.next`.

## 2. Cambios Aplicados
### A. Configuración de Puerto (package.json)
Se actualizó el script `start` para aceptar el puerto dinámico de Railway:
```json
"start": "next start -p $PORT"
```

### B. Middleware e i18n
Se refinó `frontend/src/middleware.ts` para asegurar que todas las rutas sean procesadas por el middleware de `next-intl`, manejando correctamente la redirección de `/` a `/es` (o el idioma detectado).

### C. Dockerfile de Producción
Se implementó un `Dockerfile` multi-etapa que:
1. Instala dependencias (`npm ci`).
2. Compila la aplicación (`npm run build`).
3. Crea una imagen ligera de ejecución copiando solo `.next`, `node_modules` y `public`.

### D. Redirección Raíz
Se aseguró la existencia de `frontend/src/app/page.tsx` con un `redirect('/es')` como fallback adicional al middleware.

## 3. Verificación
- **Prueba `/`**: Debe devolver un 307 (Temporary Redirect) hacia `/es`.
- **Prueba `/es`**: Debe cargar la Landing Page con status 200.
- **Build**: Verificado exitosamente con `npm run build` localmente emulando entorno de producción.
