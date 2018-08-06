export interface IRegimenProcedenciaIms {
    id?: number;
    descripcion?: string;
}

export class RegimenProcedenciaIms implements IRegimenProcedenciaIms {
    constructor(public id?: number, public descripcion?: string) {}
}
