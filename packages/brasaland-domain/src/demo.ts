import {
    RegistroBrasaPoints
} from "./types/models";

import {
    restaurantes
} from "./data/restaurants";

import {
    filtrarRestaurantesPorPais,
    filtrarRestaurantesPorPaisYCiudad,
    ordenarRestaurantesPorNombre,
    agruparRestaurantesPorCiudad
} from "./utils/collections";

import {
    busquedaLinealPorNombre,
    busquedaBinariaPorNombre
} from "./utils/search";

import {
    contarRestaurantesPorPais,
    contarRestaurantesPorCiudad,
    contarRegistrosPorPais,
    generarResumenEdades,
    calcularPorcentajeOfertasEmail
} from "./utils/transformations";

import {
    validarRegistroBrasaPoints
} from "./utils/validations";

const registros: RegistroBrasaPoints[] = [
    {
        nombreCompleto: "Ana Gómez",
        email: "ana@correo.com",
        telefono: "+57 300 123 4567",
        pais: "Colombia",
        ciudad: "Medellín",
        ubicacionFavorita:
            "Brasaland El Poblado",
        preferenciasAlimentarias: [
            "Sin restricciones"
        ],
        comoNosConociste:
            "Redes sociales",
        fechaNacimiento: "1995-04-10",
        aceptaTerminos: true,
        recibirOfertasEmail: true
    },

    {
        nombreCompleto: "Carlos Pérez",
        email: "carlos@correo.com",
        telefono: "+57 310 555 4433",
        pais: "Colombia",
        ciudad: "Bogotá",
        ubicacionFavorita:
            "Brasaland Chapinero",
        preferenciasAlimentarias: [
            "Sin gluten"
        ],
        comoNosConociste:
            "Recomendación",
        fechaNacimiento: "1988-09-22",
        aceptaTerminos: true,
        recibirOfertasEmail: false
    },

    {
        nombreCompleto: "John Smith",
        email: "john@email.com",
        telefono: "+1 305 123 4567",
        pais: "Estados Unidos",
        ciudad: "Miami",
        ubicacionFavorita:
            "Brasaland Brickell",
        preferenciasAlimentarias: [
            "Vegetariano"
        ],
        comoNosConociste:
            "Búsqueda en internet",
        fechaNacimiento: "2000-02-15",
        aceptaTerminos: true,
        recibirOfertasEmail: true
    }
];

const fechaReferencia =
    new Date(2026, 7, 22);

console.log(
    "\n--- Restaurantes Colombia ---"
);

console.log(
    filtrarRestaurantesPorPais(
        restaurantes,
        "Colombia"
    )
);

console.log(
    "\n--- Restaurantes Medellín ---"
);

console.log(
    filtrarRestaurantesPorPaisYCiudad(
        restaurantes,
        "Colombia",
        "Medellín"
    )
);

console.log(
    "\n--- Ordenados A-Z ---"
);

const restaurantesOrdenados =
    ordenarRestaurantesPorNombre(
        restaurantes,
        "asc"
    );

console.log(restaurantesOrdenados);

console.log(
    "\n--- Agrupados por ciudad ---"
);

console.log(
    agruparRestaurantesPorCiudad(
        restaurantes
    )
);

console.log(
    "\n--- Búsqueda lineal ---"
);

console.log(
    busquedaLinealPorNombre(
        restaurantes,
        "Brasaland Brickell"
    )
);

console.log(
    "\n--- Búsqueda binaria ---"
);

console.log(
    busquedaBinariaPorNombre(
        restaurantesOrdenados,
        "Brasaland Brickell"
    )
);

console.log(
    "\n--- Restaurantes por país ---"
);

console.log(
    contarRestaurantesPorPais(
        restaurantes
    )
);

console.log(
    "\n--- Restaurantes por ciudad ---"
);

console.log(
    contarRestaurantesPorCiudad(
        restaurantes
    )
);

console.log(
    "\n--- Registros por país ---"
);

console.log(
    contarRegistrosPorPais(registros)
);

console.log(
    "\n--- Reporte de edades ---"
);

console.log(
    generarResumenEdades(
        registros,
        fechaReferencia
    )
);

console.log(
    "\n--- % acepta ofertas ---"
);

console.log(
    calcularPorcentajeOfertasEmail(
        registros
    )
);

console.log(
    "\n--- Validaciones ---"
);

registros.forEach((registro) => {
    console.log(
        registro.nombreCompleto,
        validarRegistroBrasaPoints(
            registro,
            restaurantes,
            fechaReferencia
        )
    );
});