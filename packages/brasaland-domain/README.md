# Brasaland Domain

Paquete TypeScript que contiene el modelado y las utilidades de dominio utilizadas para trabajar con los datos de Brasaland.

## Funcionalidades

- Interfaces y tipos para restaurantes y registros de Brasa Points.
- Filtrado de restaurantes y registros.
- Ordenamiento ascendente, descendente y por múltiples campos.
- Búsqueda lineal.
- Búsqueda binaria sobre colecciones previamente ordenadas.
- Agrupación de restaurantes por ciudad.
- Reportes y agregaciones.
- Validaciones de las reglas de negocio de Brasa Points.

## Estructura

```text
src/
├── data/
│   └── restaurants.ts
├── types/
│   └── models.ts
├── utils/
│   ├── collections.ts
│   ├── search.ts
│   ├── transformations.ts
│   └── validations.ts
├── demo.ts
└── index.ts
```
