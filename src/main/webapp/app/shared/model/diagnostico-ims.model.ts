export interface IDiagnosticoIms {
    id?: number;
    descripcion?: string;
}

export class DiagnosticoIms implements IDiagnosticoIms {
    constructor(public id?: number, public descripcion?: string) {}
}
