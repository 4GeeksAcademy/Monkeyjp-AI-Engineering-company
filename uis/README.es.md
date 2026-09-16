# `uis` — Interfaces de Usuario

Este directorio contiene las aplicaciones con interfaz de usuario de Brasaland.

Cada subdirectorio representa una aplicación frontend independiente con su propia estructura, dependencias, configuración de ejecución y documentación.

## Aplicaciones Actuales

- `website` — sitio web público de Brasaland.
- `backoffice` — interfaz interna de operaciones.
- `talent-pipeline-tracker` — aplicación interna de People & Talent.

## Organización

Utiliza un subdirectorio por cada aplicación o área de negocio diferenciada.

Las aplicaciones dentro de `uis/` deben permanecer independientes salvo que se apruebe explícitamente una integración o migración.

Los requisitos específicos de cada aplicación pertenecen a:

- el contexto del milestone correspondiente dentro de `docs/`
- el `README.md` propio de la aplicación
- las reglas aplicables dentro de `.agents/rules/`

No dupliques en este archivo las especificaciones de los milestones.

## Documentación

El README de cada aplicación debe documentar únicamente:

- propósito
- stack tecnológico
- estructura importante
- cómo ejecutar la aplicación
- cómo validarla
- notas técnicas específicas de la aplicación

> _Estas instrucciones también están disponibles en [inglés](./README.md)._
