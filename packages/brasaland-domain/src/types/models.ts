export type Pais = "Colombia" | "Estados Unidos";

export type Ciudad =
    | "Medellín"
    | "Bogotá"
    | "Cali"
    | "Miami"
    | "Orlando";

export type PreferenciaAlimentaria =
    | "Sin restricciones"
    | "Vegetariano"
    | "Sin gluten"
    | "Otro";

export type ComoNosConociste =
    | "Redes sociales"
    | "Recomendación"
    | "Pasando por el local"
    | "Búsqueda en internet"
    | "Otro";

export interface Restaurante {
    nombre: string;
    pais: Pais;
    ciudad: Ciudad;
}

export interface RegistroBrasaPoints {
    nombreCompleto: string;
    email: string;
    telefono: string;
    pais: Pais;
    ciudad: Ciudad;
    ubicacionFavorita?: string;
    preferenciasAlimentarias?: PreferenciaAlimentaria[];
    comoNosConociste: ComoNosConociste;
    fechaNacimiento: string;
    aceptaTerminos: boolean;
    recibirOfertasEmail: boolean;
}

export interface ResultadoValidacion {
    esValido: boolean;
    errores: string[];
}

export interface ResumenEdades {
    total: number;
    promedio: number;
    minima: number | null;
    maxima: number | null;
}