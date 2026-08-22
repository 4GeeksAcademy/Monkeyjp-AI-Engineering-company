import {
    Ciudad,
    Pais,
    RegistroBrasaPoints,
    Restaurante,
    ResultadoValidacion
} from "../types/models";

import {
    calcularEdad
} from "./transformations";

export const validarNombreCompleto = (
    nombreCompleto: string
): boolean => {
    const palabras = nombreCompleto
        .trim()
        .split(/\s+/);

    return palabras.length >= 2;
};

export const validarEmail = (
    email: string
): boolean => {
    const patronEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return patronEmail.test(email);
};

export const validarTelefono = (
    telefono: string,
    pais: Pais
): boolean => {
    const telefonoLimpio =
        telefono.replace(/\s/g, "");

    if (pais === "Colombia") {
        return /^\+57\d+$/.test(
            telefonoLimpio
        );
    }

    return /^\+1\d+$/.test(
        telefonoLimpio
    );
};

export const validarCiudadPorPais = (
    pais: Pais,
    ciudad: Ciudad
): boolean => {
    const ciudadesPorPais: Record<
        Pais,
        Ciudad[]
    > = {
        Colombia: [
            "Medellín",
            "Bogotá",
            "Cali"
        ],

        "Estados Unidos": [
            "Miami",
            "Orlando"
        ]
    };

    return ciudadesPorPais[pais].includes(
        ciudad
    );
};

export const validarUbicacionFavorita = (
    ubicacionFavorita: string | undefined,
    pais: Pais,
    ciudad: Ciudad,
    restaurantes: Restaurante[]
): boolean => {
    if (!ubicacionFavorita) {
        return true;
    }

    return restaurantes.some(
        (restaurante) =>
            restaurante.nombre === ubicacionFavorita &&
            restaurante.pais === pais &&
            restaurante.ciudad === ciudad
    );
};

export const validarFechaNacimiento = (
    fechaNacimiento: string
): boolean => {
    const patronFecha =
        /^\d{4}-\d{2}-\d{2}$/;

    if (!patronFecha.test(fechaNacimiento)) {
        return false;
    }

    const [anio, mes, dia] =
        fechaNacimiento.split("-").map(Number);

    const fecha = new Date(
        anio,
        mes - 1,
        dia
    );

    return (
        fecha.getFullYear() === anio &&
        fecha.getMonth() === mes - 1 &&
        fecha.getDate() === dia
    );
};

export const validarMayorDeEdad = (
    fechaNacimiento: string,
    fechaReferencia: Date
): boolean => {
    if (!validarFechaNacimiento(
        fechaNacimiento
    )) {
        return false;
    }

    return (
        calcularEdad(
            fechaNacimiento,
            fechaReferencia
        ) >= 18
    );
};

export const validarTerminos = (
    aceptaTerminos: boolean
): boolean => {
    return aceptaTerminos;
};

export const validarRegistroBrasaPoints = (
    registro: RegistroBrasaPoints,
    restaurantes: Restaurante[],
    fechaReferencia: Date
): ResultadoValidacion => {
    const errores: string[] = [];

    if (
        !validarNombreCompleto(
            registro.nombreCompleto
        )
    ) {
        errores.push(
            "Ingresa tu nombre completo (nombre y apellido)"
        );
    }

    if (!validarEmail(registro.email)) {
        errores.push(
            "Ingresa un email válido (ejemplo: nombre@correo.com)"
        );
    }

    if (
        !validarTelefono(
            registro.telefono,
            registro.pais
        )
    ) {
        errores.push(
            "El teléfono debe incluir código de país (ejemplo: +57 300 123 4567 o +1 305 123 4567)"
        );
    }

    if (
        !validarCiudadPorPais(
            registro.pais,
            registro.ciudad
        )
    ) {
        errores.push(
            "Selecciona tu ciudad"
        );
    }

    if (
        !validarUbicacionFavorita(
            registro.ubicacionFavorita,
            registro.pais,
            registro.ciudad,
            restaurantes
        )
    ) {
        errores.push(
            "La ubicación favorita no corresponde al país y ciudad seleccionados"
        );
    }

    if (
        !validarMayorDeEdad(
            registro.fechaNacimiento,
            fechaReferencia
        )
    ) {
        errores.push(
            "Debes ser mayor de 18 años para registrarte en Brasa Points"
        );
    }

    if (
        !validarTerminos(
            registro.aceptaTerminos
        )
    ) {
        errores.push(
            "Debes aceptar los términos del programa Brasa Points para continuar"
        );
    }

    return {
        esValido: errores.length === 0,
        errores
    };
};