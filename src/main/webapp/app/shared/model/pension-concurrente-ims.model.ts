export interface IPensionConcurrenteIms {
    id?: number;
    codigo?: string;
    descripcion?: string;
}

export class PensionConcurrenteIms implements IPensionConcurrenteIms {
    constructor(public id?: number, public codigo?: string, public descripcion?: string) {}
}
