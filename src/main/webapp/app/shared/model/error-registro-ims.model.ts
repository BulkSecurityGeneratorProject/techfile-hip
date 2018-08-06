import { ITipoErrorIms } from 'app/shared/model//tipo-error-ims.model';
import { IProcesoIms } from 'app/shared/model//proceso-ims.model';

export interface IErrorRegistroIms {
    id?: number;
    numeroLinea?: number;
    textoLinea?: string;
    tipoError?: ITipoErrorIms;
    proceso?: IProcesoIms;
}

export class ErrorRegistroIms implements IErrorRegistroIms {
    constructor(
        public id?: number,
        public numeroLinea?: number,
        public textoLinea?: string,
        public tipoError?: ITipoErrorIms,
        public proceso?: IProcesoIms
    ) {}
}
