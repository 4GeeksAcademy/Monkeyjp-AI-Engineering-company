import { Restaurante } from "../types/models";

export const busquedaLinealPorNombre = (
    restaurantes: Restaurante[],
    nombre: string
): number => {
    for (let i = 0; i < restaurantes.length; i++) {
        if (restaurantes[i].nombre === nombre) {
            return i;
        }
    }

    return -1;
};

export const busquedaBinariaPorNombre = (
    restaurantesOrdenados: Restaurante[],
    nombre: string
): number => {
    let izquierda = 0;
    let derecha = restaurantesOrdenados.length - 1;

    while (izquierda <= derecha) {
        const medio = Math.floor(
            (izquierda + derecha) / 2
        );

        const restauranteActual =
            restaurantesOrdenados[medio];

        const comparacion =
            restauranteActual.nombre.localeCompare(nombre);

        if (comparacion === 0) {
            return medio;
        }

        if (comparacion < 0) {
            izquierda = medio + 1;
        } else {
            derecha = medio - 1;
        }
    }

    return -1;
};