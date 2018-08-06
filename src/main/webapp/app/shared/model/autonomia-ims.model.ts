import { IProvinciaIms } from 'app/shared/model//provincia-ims.model';

export interface IAutonomiaIms {
    id?: number;
    nombre?: string;
    provincias?: IProvinciaIms[];
}

export class AutonomiaIms implements IAutonomiaIms {
    constructor(public id?: number, public nombre?: string, public provincias?: IProvinciaIms[]) {}
}
