export interface IMesIms {
    id?: number;
    agno?: number;
    mes?: number;
}

export class MesIms implements IMesIms {
    constructor(public id?: number, public agno?: number, public mes?: number) {}
}
