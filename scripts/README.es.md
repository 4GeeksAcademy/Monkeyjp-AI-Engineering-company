# `scripts` — Scripts Auxiliares

Este directorio contiene scripts auxiliares a nivel del repositorio y utilidades internas que no pertenecen a una aplicación, servicio o paquete específico.

## Propósito

Utiliza este directorio para scripts como:

- automatización de desarrollo
- utilidades de mantenimiento
- herramientas de procesamiento de datos
- tareas de configuración
- ayudas para migraciones
- herramientas operativas puntuales

Los scripts deben mantenerse enfocados y ser reproducibles entre distintos entornos.

## Documentación

Cada script debe documentar, ya sea en su propio código o en este README:

- propósito
- parámetros requeridos
- dependencias
- entrada y salida esperadas
- ejemplo de uso cuando sea útil

## Scripts Actuales

- `analyze.py` — analiza archivos CSV de incidencias de Brasaland utilizando la lógica compartida de `packages/incident_analysis`.

No dupliques lógica de negocio dentro de los scripts cuando ya exista un paquete reutilizable que la proporcione.

> _Versión en inglés: [README.md](./README.md)._
