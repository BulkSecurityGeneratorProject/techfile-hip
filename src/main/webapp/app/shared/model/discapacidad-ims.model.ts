export interface IDiscapacidadIms {
    id?: number;
    descripcion?: string;
}

export class DiscapacidadIms implements IDiscapacidadIms {
    constructor(public id?: number, public descripcion?: string) {}
}
