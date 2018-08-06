export const enum Role {
    FIT_PLANIFICADOR = 'FIT_PLANIFICADOR',
    FIT_AUTONOMIA = 'FIT_AUTONOMIA',
    FIT_GESTOR = 'FIT_GESTOR'
}

export interface IUsuarioIms {
    id?: number;
    nombre?: string;
    role?: Role;
}

export class UsuarioIms implements IUsuarioIms {
    constructor(public id?: number, public nombre?: string, public role?: Role) {}
}
