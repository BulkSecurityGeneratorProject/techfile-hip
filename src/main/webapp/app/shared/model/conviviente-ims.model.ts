import { IPensionistaIms } from 'app/shared/model//pensionista-ims.model';

export interface IConvivienteIms {
    id?: number;
    orden?: number;
    pensionista?: IPensionistaIms;
}

export class ConvivienteIms implements IConvivienteIms {
    constructor(public id?: number, public orden?: number, public pensionista?: IPensionistaIms) {}
}
