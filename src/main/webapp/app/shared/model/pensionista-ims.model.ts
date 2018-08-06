import { Moment } from 'moment';
import { IPersonaIms } from 'app/shared/model//persona-ims.model';
import { IPerceptorIms } from 'app/shared/model//perceptor-ims.model';
import { IConvivienteIms } from 'app/shared/model//conviviente-ims.model';
import { IRegimenProcedenciaIms } from 'app/shared/model//regimen-procedencia-ims.model';
import { IPensionConcurrenteIms } from 'app/shared/model//pension-concurrente-ims.model';
import { ITipoRelacionIms } from 'app/shared/model//tipo-relacion-ims.model';
import { IFicheroIms } from 'app/shared/model//fichero-ims.model';
import { IDiscapacidadIms } from 'app/shared/model//discapacidad-ims.model';
import { IDiagnosticoIms } from 'app/shared/model//diagnostico-ims.model';
import { IEtiologiaIms } from 'app/shared/model//etiologia-ims.model';

export const enum FormaCobro {
    DIRECTO_EN_VENTANILLA = 'DIRECTO_EN_VENTANILLA',
    INGRESO_EN_CUENTA = 'INGRESO_EN_CUENTA'
}

export interface IPensionistaIms {
    id?: number;
    situacionPension?: number;
    ingresosTotales?: number;
    trabaja?: boolean;
    totalConvivientes?: number;
    ingresosAnualesConvivientes?: number;
    gradoMinusvalia?: number;
    porcentajeDiscapacidad?: number;
    baremoFactoresSocialesComplementarios?: number;
    baremoNecesidadTerceraPersona?: number;
    fechaSolicitudPension?: Moment;
    fechaResolucionPension?: Moment;
    fechaAltaNomina?: Moment;
    importeMensualPension?: number;
    importeMensualComplementoTerceraPersona?: number;
    formaCobro?: FormaCobro;
    entidadBancaria?: number;
    cuentaBancaria?: number;
    numeroCuenta?: string;
    persona?: IPersonaIms;
    perceptor?: IPerceptorIms;
    convivientes?: IConvivienteIms[];
    regimenProcedencia?: IRegimenProcedenciaIms;
    pensionConcurrente?: IPensionConcurrenteIms;
    tipoRelacion?: ITipoRelacionIms;
    fichero?: IFicheroIms;
    discapacidad?: IDiscapacidadIms;
    diagnostico?: IDiagnosticoIms;
    etiologia?: IEtiologiaIms;
}

export class PensionistaIms implements IPensionistaIms {
    constructor(
        public id?: number,
        public situacionPension?: number,
        public ingresosTotales?: number,
        public trabaja?: boolean,
        public totalConvivientes?: number,
        public ingresosAnualesConvivientes?: number,
        public gradoMinusvalia?: number,
        public porcentajeDiscapacidad?: number,
        public baremoFactoresSocialesComplementarios?: number,
        public baremoNecesidadTerceraPersona?: number,
        public fechaSolicitudPension?: Moment,
        public fechaResolucionPension?: Moment,
        public fechaAltaNomina?: Moment,
        public importeMensualPension?: number,
        public importeMensualComplementoTerceraPersona?: number,
        public formaCobro?: FormaCobro,
        public entidadBancaria?: number,
        public cuentaBancaria?: number,
        public numeroCuenta?: string,
        public persona?: IPersonaIms,
        public perceptor?: IPerceptorIms,
        public convivientes?: IConvivienteIms[],
        public regimenProcedencia?: IRegimenProcedenciaIms,
        public pensionConcurrente?: IPensionConcurrenteIms,
        public tipoRelacion?: ITipoRelacionIms,
        public fichero?: IFicheroIms,
        public discapacidad?: IDiscapacidadIms,
        public diagnostico?: IDiagnosticoIms,
        public etiologia?: IEtiologiaIms
    ) {
        this.trabaja = false;
    }
}
