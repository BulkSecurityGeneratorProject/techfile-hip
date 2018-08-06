import { Moment } from 'moment';
import { IMesIms } from 'app/shared/model//mes-ims.model';

export interface ICierreIms {
    id?: number;
    fechaCierre?: Moment;
    mesCerrado?: IMesIms;
    mesAbierto?: IMesIms;
}

export class CierreIms implements ICierreIms {
    constructor(public id?: number, public fechaCierre?: Moment, public mesCerrado?: IMesIms, public mesAbierto?: IMesIms) {}
}
