# CONTEXT.es.md — Brasaland

Este documento contiene el contexto general de empresa de Brasaland.

Define la información de negocio que aplica a todo el monorepo.

Los requisitos específicos de cada milestone se documentan por separado dentro de `docs/` y solo deben leerse cuando sean relevantes para la tarea actual.

---

## Empresa

**Brasaland** es una cadena de restaurantes de comida a la brasa fundada en 2008 en Medellín, Colombia.

La empresa opera **14 restaurantes propios** entre Colombia y Estados Unidos:

- 10 sedes en Colombia
- 4 sedes en Florida, EE. UU.

Brasaland cuenta con aproximadamente 115 empleados entre operaciones de restaurantes, gestión y equipos corporativos.

La sede principal se encuentra en Medellín y la empresa mantiene presencia comercial en Miami.

---

## Principios de Marca

Brasaland se basa en tres principios principales:

- **Calidad Consistente** — los productos, recetas y estándares de servicio deben mantenerse consistentes entre las sedes.
- **Experiencia Cálida** — los clientes deben recibir un servicio amable y confiable.
- **Rapidez** — el servicio debe ser eficiente sin sacrificar la calidad del producto.

---

## Brasaland Digital

**Brasaland Digital** es el equipo interno responsable de la transformación digital de la empresa.

El equipo trabaja bajo la dirección de:

- **Nicolás Park — CTO**

Las iniciativas digitales pueden apoyar diferentes áreas de la empresa, incluyendo:

- experiencias para clientes
- operaciones de restaurantes
- herramientas internas de backoffice
- fidelización
- análisis de datos
- People & Talent
- automatización y flujos de trabajo asistidos por IA

Los requisitos de estas iniciativas pertenecen a sus correspondientes contextos específicos de milestone.

---

## Terminología Oficial de Negocio

Utiliza de forma consistente los nombres oficiales:

- `Brasaland`
- `Brasaland Digital`
- `Brasa Points`

No reemplaces la terminología establecida de Brasaland por alternativas genéricas salvo que un milestone lo requiera explícitamente.

---

## Modelo de Contexto del Monorepo

Este archivo contiene únicamente **contexto general de empresa**.

Los requisitos específicos de cada funcionalidad viven dentro de `docs/`.

Los contextos de milestone siguen este patrón:

`docs/<nombre-del-milestone>/CONTEXT-brasaland.md`

Las versiones en español, cuando existan:

`docs/<nombre-del-milestone>/CONTEXT-brasaland.es.md`

Los archivos de contexto específicos de milestone:

- extienden este contexto general de empresa
- no lo reemplazan
- aplican únicamente a su milestone o dominio correspondiente

Los agentes de desarrollo con IA deben leer únicamente el contexto de milestone relevante para la tarea en la que están trabajando.

Cuando el milestone relevante ya sea conocido, ve directamente a su ruta de contexto en lugar de explorar todos los archivos dentro de `docs/`.

---

## Fuente de Verdad

Utiliza este orden de prioridad al interpretar los requisitos:

1. `CONTEXT.md` para información general y terminología de Brasaland.
2. El único archivo `docs/**/CONTEXT-*.md` relevante para el milestone de la tarea actual.
3. Las reglas aplicables en `.agents/rules/` para las restricciones de desarrollo.
4. Las convenciones y documentación existentes de cada aplicación para los detalles de implementación.

No apliques requisitos de un milestone a una aplicación no relacionada.

Cuando existan requisitos contradictorios o no esté claro qué contexto corresponde, detente y consulta al desarrollador en lugar de asumir.
