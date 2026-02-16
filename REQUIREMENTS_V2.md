# Declaración de Cambio de Requisitos v2.0 - Funnel de Admisión

Esta declaración documenta el cambio oficial en el flujo de usuario y el modelo de datos, sustituyendo los requisitos iniciales.

## 1. Roles y Conceptos
- Role: COACH (admin)
- Role: USER (miembro), con estados dinámicos.

## 2. Máquina de Estados (15 estados)
LEAD, APPLICANT_SUBMITTED, PRESELECTED, INTERVIEW_SCHEDULED, INTERVIEW_COMPLETED, DIAGNOSTIC_UNLOCKED, DIAGNOSTIC_IN_PROGRESS, DIAGNOSTIC_COMPLETED, ACCEPTED, PAYMENT_PENDING, ACTIVE_MEMBER, DELINQUENT, SUSPENDED, WAITLISTED, NOT_ELIGIBLE.

## 3. Nuevas Entidades Obligatorias
- **Application**: Formulario inicial con secciones de Identificación, Perfil Deportivo, Disponibilidad y Motivación.
- **Interview**: Gestión de entrevistas y notas del coach.
- **AdmissionDecision**: Registro formal de la decisión de admisión.

## 4. Reglas de Negocio
- El pago ocurre DESPUÉS de la admisión (ACCEPTED).
- El acceso a entrenamiento requiere estado ACTIVE_MEMBER.
- El diagnóstico es parte del proceso de selección.
