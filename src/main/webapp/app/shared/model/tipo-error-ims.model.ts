export const enum NivelError {
    FATAL = 'FATAL',
    ERROR = 'ERROR',
    WARN = 'WARN'
}

export interface ITipoErrorIms {
    id?: number;
    codigo?: string;
    descripcion?: string;
    nivel?: NivelError;
}

export class TipoErrorIms implements ITipoErrorIms {
    constructor(public id?: number, public codigo?: string, public descripcion?: string, public nivel?: NivelError) {}
}
