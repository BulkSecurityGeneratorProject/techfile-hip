import { IAutonomiaIms } from 'app/shared/model//autonomia-ims.model';

export interface IProvinciaIms {
    id?: number;
    nombre?: string;
    autonomia?: IAutonomiaIms;
}

export class ProvinciaIms implements IProvinciaIms {
    constructor(public id?: number, public nombre?: string, public autonomia?: IAutonomiaIms) {}
}
