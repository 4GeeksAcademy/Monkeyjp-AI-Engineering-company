import {
    Ciudad,
    Pais,
    RegistroBrasaPoints,
    Restaurante
} from "../types/models";

export const filtrarRestaurantesPorPais = (
    restaurantes: Restaurante[],
    pais: Pais
): Restaurante[] => {
    return restaurantes.filter(
        (restaurante) => restaurante.pais === pais
    );
};

export const filtrarRestaurantesPorCiudad = (
    restaurantes: Restaurante[],
    ciudad: Ciudad
): Restaurante[] => {
    return restaurantes.filter(
        (restaurante) => restaurante.ciudad === ciudad
    );
};

export const filtrarRestaurantesPorPaisYCiudad = (
    restaurantes: Restaurante[],
    pais: Pais,
    ciudad: Ciudad
): Restaurante[] => {
    return restaurantes.filter(
        (restaurante) =>
            restaurante.pais === pais &&
            restaurante.ciudad === ciudad
    );
};

export const filtrarRegistrosPorPais = (
    registros: RegistroBrasaPoints[],
    pais: Pais
): RegistroBrasaPoints[] => {
    return registros.filter(
        (registro) => registro.pais === pais
    );
};

export const filtrarRegistrosConOfertasEmail = (
    registros: RegistroBrasaPoints[]
): RegistroBrasaPoints[] => {
    return registros.filter(
        (registro) => registro.recibirOfertasEmail
    );
};

export const ordenarRestaurantesPorNombre = (
    restaurantes: Restaurante[],
    orden: "asc" | "desc" = "asc"
): Restaurante[] => {
    return [...restaurantes].sort((a, b) => {
        const comparacion = a.nombre.localeCompare(b.nombre);

        return orden === "asc"
            ? comparacion
            : -comparacion;
    });
};

export const ordenarRestaurantesPorPaisYCiudad = (
    restaurantes: Restaurante[]
): Restaurante[] => {
    return [...restaurantes].sort((a, b) => {
        const comparacionPais =
            a.pais.localeCompare(b.pais);

        if (comparacionPais !== 0) {
            return comparacionPais;
        }

        return a.ciudad.localeCompare(b.ciudad);
    });
};

export const agruparRestaurantesPorCiudad = (
    restaurantes: Restaurante[]
): Partial<Record<Ciudad, Restaurante[]>> => {
    return restaurantes.reduce(
        (grupos, restaurante) => {
            const ciudad = restaurante.ciudad;

            if (!grupos[ciudad]) {
                grupos[ciudad] = [];
            }

            grupos[ciudad]?.push(restaurante);

            return grupos;
        },
        {} as Partial<Record<Ciudad, Restaurante[]>>
    );
};