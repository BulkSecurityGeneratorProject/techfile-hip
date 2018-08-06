import { IPersonaIms } from 'app/shared/model//persona-ims.model';
import { IPensionistaIms } from 'app/shared/model//pensionista-ims.model';

export interface IPerceptorIms {
    id?: number;
    persona?: IPersonaIms;
    pensionista?: IPensionistaIms;
}

export class PerceptorIms implements IPerceptorIms {
    constructor(public id?: number, public persona?: IPersonaIms, public pensionista?: IPensionistaIms) {}
}
