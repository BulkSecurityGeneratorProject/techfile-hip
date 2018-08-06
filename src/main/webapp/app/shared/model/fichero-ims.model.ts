import { Moment } from 'moment';
import { IFicheroByteIms } from 'app/shared/model//fichero-byte-ims.model';
import { IProcesoIms } from 'app/shared/model//proceso-ims.model';
import { IAutonomiaIms } from 'app/shared/model//autonomia-ims.model';
import { IProvinciaIms } from 'app/shared/model//provincia-ims.model';
import { IMesIms } from 'app/shared/model//mes-ims.model';

export interface IFicheroIms {
    id?: number;
    nombre?: string;
    tamagno?: string;
    fechaCreacionOrigen?: Moment;
    fechaAltaAplicacion?: Moment;
    encoding?: string;
    lineas?: number;
    ficheroByte?: IFicheroByteIms;
    procesos?: IProcesoIms[];
    autonomia?: IAutonomiaIms;
    provincia?: IProvinciaIms;
    mes?: IMesIms;
}

export class FicheroIms implements IFicheroIms {
    constructor(
        public id?: number,
        public nombre?: string,
        public tamagno?: string,
        public fechaCreacionOrigen?: Moment,
        public fechaAltaAplicacion?: Moment,
        public encoding?: string,
        public lineas?: number,
        public ficheroByte?: IFicheroByteIms,
        public procesos?: IProcesoIms[],
        public autonomia?: IAutonomiaIms,
        public provincia?: IProvinciaIms,
        public mes?: IMesIms
    ) {}
}
