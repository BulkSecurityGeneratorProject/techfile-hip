export interface ITipoRelacionIms {
    id?: number;
    descripcion?: string;
}

export class TipoRelacionIms implements ITipoRelacionIms {
    constructor(public id?: number, public descripcion?: string) {}
}
