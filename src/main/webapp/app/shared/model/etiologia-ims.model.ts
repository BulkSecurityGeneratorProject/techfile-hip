export interface IEtiologiaIms {
    id?: number;
    descripcion?: string;
}

export class EtiologiaIms implements IEtiologiaIms {
    constructor(public id?: number, public descripcion?: string) {}
}
