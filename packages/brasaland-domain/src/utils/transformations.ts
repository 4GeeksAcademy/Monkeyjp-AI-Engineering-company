import {
    Ciudad,
    Pais,
    RegistroBrasaPoints,
    Restaurante,
    ResumenEdades
} from "../types/models";

export const contarRestaurantesPorPais = (
    restaurantes: Restaurante[]
): Record<Pais, number> => {
    return restaurantes.reduce(
        (conteo, restaurante) => {
            conteo[restaurante.pais]++;

            return conteo;
        },
        {
            Colombia: 0,
            "Estados Unidos": 0
        } as Record<Pais, number>
    );
};

export const contarRestaurantesPorCiudad = (
    restaurantes: Restaurante[]
): Partial<Record<Ciudad, number>> => {
    return restaurantes.reduce(
        (conteo, restaurante) => {
            const ciudad = restaurante.ciudad;

            conteo[ciudad] =
                (conteo[ciudad] ?? 0) + 1;

            return conteo;
        },
        {} as Partial<Record<Ciudad, number>>
    );
};

export const contarRegistrosPorPais = (
    registros: RegistroBrasaPoints[]
): Record<Pais, number> => {
    return registros.reduce(
        (conteo, registro) => {
            conteo[registro.pais]++;

            return conteo;
        },
        {
            Colombia: 0,
            "Estados Unidos": 0
        } as Record<Pais, number>
    );
};

export const calcularEdad = (
    fechaNacimiento: string,
    fechaReferencia: Date
): number => {
    const [anio, mes, dia] =
        fechaNacimiento.split("-").map(Number);

    let edad =
        fechaReferencia.getFullYear() - anio;

    const mesActual =
        fechaReferencia.getMonth() + 1;

    const diaActual =
        fechaReferencia.getDate();

    if (
        mesActual < mes ||
        (mesActual === mes && diaActual < dia)
    ) {
        edad--;
    }

    return edad;
};

export const sumarEdades = (
    registros: RegistroBrasaPoints[],
    fechaReferencia: Date
): number => {
    return registros.reduce(
        (total, registro) =>
            total +
            calcularEdad(
                registro.fechaNacimiento,
                fechaReferencia
            ),
        0
    );
};

export const calcularEdadPromedio = (
    registros: RegistroBrasaPoints[],
    fechaReferencia: Date
): number => {
    if (registros.length === 0) {
        return 0;
    }

    const total =
        sumarEdades(registros, fechaReferencia);

    const promedio = total / registros.length;

    return Number(promedio.toFixed(2));
};

export const obtenerEdadMinima = (
    registros: RegistroBrasaPoints[],
    fechaReferencia: Date
): number | null => {
    if (registros.length === 0) {
        return null;
    }

    const edades = registros.map(
        (registro) =>
            calcularEdad(
                registro.fechaNacimiento,
                fechaReferencia
            )
    );

    return Math.min(...edades);
};

export const obtenerEdadMaxima = (
    registros: RegistroBrasaPoints[],
    fechaReferencia: Date
): number | null => {
    if (registros.length === 0) {
        return null;
    }

    const edades = registros.map(
        (registro) =>
            calcularEdad(
                registro.fechaNacimiento,
                fechaReferencia
            )
    );

    return Math.max(...edades);
};

export const generarResumenEdades = (
    registros: RegistroBrasaPoints[],
    fechaReferencia: Date
): ResumenEdades => {
    return {
        total: sumarEdades(
            registros,
            fechaReferencia
        ),

        promedio: calcularEdadPromedio(
            registros,
            fechaReferencia
        ),

        minima: obtenerEdadMinima(
            registros,
            fechaReferencia
        ),

        maxima: obtenerEdadMaxima(
            registros,
            fechaReferencia
        )
    };
};

export const calcularPorcentajeOfertasEmail = (
    registros: RegistroBrasaPoints[]
): number => {
    if (registros.length === 0) {
        return 0;
    }

    const aceptanOfertas = registros.filter(
        (registro) => registro.recibirOfertasEmail
    ).length;

    const porcentaje =
        (aceptanOfertas / registros.length) * 100;

    return Number(porcentaje.toFixed(2));
};