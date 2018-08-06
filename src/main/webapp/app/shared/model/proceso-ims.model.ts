import { Moment } from 'moment';
import { IErrorRegistroIms } from 'app/shared/model//error-registro-ims.model';
import { IFicheroIms } from 'app/shared/model//fichero-ims.model';

export const enum ResultadoProceso {
    OK = 'OK',
    OK_CON_ERRORES = 'OK_CON_ERRORES',
    ERRONEO = 'ERRONEO'
}

export interface IProcesoIms {
    id?: number;
    fecha?: Moment;
    duracion?: number;
    resultado?: ResultadoProceso;
    errorRegistros?: IErrorRegistroIms[];
    fichero?: IFicheroIms;
}

export class ProcesoIms implements IProcesoIms {
    constructor(
        public id?: number,
        public fecha?: Moment,
        public duracion?: number,
        public resultado?: ResultadoProceso,
        public errorRegistros?: IErrorRegistroIms[],
        public fichero?: IFicheroIms
    ) {}
}
