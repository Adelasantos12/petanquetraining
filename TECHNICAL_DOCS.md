# CIEP MERCI - Documentación Técnica (SaaS Petanca)

Esta plataforma es un SaaS especializado para el seguimiento intensivo de jugadores de petanca basado en el método MERCI (CIEP), gestionado por Adlai Pulido (CIEP-N2).

## 1. Arquitectura y Stack
- **Frontend**: Next.js 15+, TailwindCSS, Recharts, `next-intl` (i18n: es, en, fr).
- **Backend**: NestJS (Node.js), PostgreSQL (TypeORM).
- **Auth**: JWT + Cookies/Header, Roles: `coach`, `player`.
- **Infra**: Dockerizada (Multi-stage builds), compatible con Railway.

## 2. Modelo de Datos (Entidades Clave)

| Entidad | Descripción |
| :--- | :--- |
| `User` | Usuario base (Coach/Player), estado del funnel. |
| `PlayerProfile` | Información deportiva, experiencia, fortalezas/debilidades. |
| `Application` | Formulario de admisión inicial (v2 funnel). |
| `Interview` | Registro de cita y notas de la entrevista técnica. |
| `AdmissionDecision` | Decisión final del coach sobre la admisión. |
| `PaymentLink` | Enlaces dinámicos para Stripe/PayPal generados por el coach. |
| `MerciAssessment` | Diagnóstico MERCI (5 dominios), totales y radar chart. |
| `TrainingBlock` | Definición de bloques de ejercicios (7 ejercicios base). |
| `Exercise` | Definición de un ejercicio individual (Tiro, Punto, etc.). |
| `PlayerBlock` | Instancia de un bloque asignado a un jugador específico. |
| `PlayerExerciseRun` | Resultado binario (6 bolas) para una distancia específica. |
| `Payment` | Registro histórico de transacciones confirmadas. |

## 3. Máquina de Estados del Jugador (Funnel v2.0)

El jugador progresa secuencialmente (gating estricto):
1. `LEAD`: Registro inicial.
2. `APPLICANT_SUBMITTED`: Formulario de admisión enviado.
3. `PRESELECTED`: Coach revisa y preselecciona.
4. `INTERVIEW_SCHEDULED`: Cita agendada (Cal.com/Google).
5. `INTERVIEW_COMPLETED`: Entrevista realizada.
6. `DIAGNOSTIC_UNLOCKED`: El jugador puede realizar el test MERCI.
7. `ACCEPTED`: Coach aprueba perfil y diagnóstico.
8. `ACTIVE_MEMBER`: Pago de inscripción confirmado. Acceso total a entrenamientos.

## 4. API Endpoints (Resumen)

### Auth
- `POST /auth/register`: Registro de nuevos usuarios.
- `POST /auth/login`: Autenticación y obtención de JWT.

### Onboarding & Admission
- `POST /applications`: Envío del formulario de admisión.
- `POST /admission/preselect/:userId`: Coach preselecciona candidato.
- `POST /admission/decision`: Coach emite decisión final (Aceptar/Rechazar).
- `GET /onboarding/status`: Estado actual del jugador en el funnel.

### MERCI Diagnostic
- `POST /merci`: Envío de autoevaluación (5 dominios).
- `GET /merci/my-results`: Ver resultados propios aprobados.
- `PUT /merci/:id/approve`: Coach aprueba y comenta diagnóstico.

### Entrenamiento (Training)
- `GET /training/active-block`: Bloque de ejercicios actual del jugador.
- `POST /training/record-result`: Registro binario de 6 bolas (distancia 6m o 7m).
- `POST /training/debug/init-first-block`: Inicialización del bloque base.

### Coach Panel
- `GET /coach/players`: Lista de todos los jugadores con estado y KPIs.
- `GET /coach/pipeline`: Vista CRM para gestión de candidatos.
- `GET /coach/players/:id`: Perfil completo, diagnósticos y progreso técnico.

## 5. Lógica de Desbloqueo (Gating)
- **Ejercicios**: Un ejercicio se bloquea hasta completar la distancia anterior (6m antes que 7m). El bloque siguiente solo se asigna tras completar el anterior.
- **Acceso**: El middleware de NestJS (`GatingGuard`) bloquea el acceso a funcionalidades de entrenamiento si el estado no es `ACTIVE_MEMBER`.

## 6. Configuración de Producción
- El frontend usa `next start -p $PORT`.
- El Dockerfile realiza `npm run build` internamente.
- Las variables `DATABASE_URL` y `JWT_SECRET` son obligatorias.
