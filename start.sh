#!/bin/sh
# Este script ayuda a Railway a identificar el punto de entrada si se despliega desde la raíz
# Sin embargo, se recomienda desplegar /backend y /frontend como servicios separados.

if [ "$SERVICE_TYPE" = "backend" ]; then
  cd backend && npm run start:prod
else
  cd frontend && npm run start
fi
