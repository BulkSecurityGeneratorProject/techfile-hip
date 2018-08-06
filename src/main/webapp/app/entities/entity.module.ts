import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TechfileProvinciaImsModule } from './provincia-ims/provincia-ims.module';
import { TechfileAutonomiaImsModule } from './autonomia-ims/autonomia-ims.module';
import { TechfileMesImsModule } from './mes-ims/mes-ims.module';
import { TechfilePensionConcurrenteImsModule } from './pension-concurrente-ims/pension-concurrente-ims.module';
import { TechfileTipoRelacionImsModule } from './tipo-relacion-ims/tipo-relacion-ims.module';
import { TechfileRegimenProcedenciaImsModule } from './regimen-procedencia-ims/regimen-procedencia-ims.module';
import { TechfilePersonaImsModule } from './persona-ims/persona-ims.module';
import { TechfilePensionistaImsModule } from './pensionista-ims/pensionista-ims.module';
import { TechfileConvivienteImsModule } from './conviviente-ims/conviviente-ims.module';
import { TechfilePerceptorImsModule } from './perceptor-ims/perceptor-ims.module';
import { TechfileFicheroImsModule } from './fichero-ims/fichero-ims.module';
import { TechfileFicheroByteImsModule } from './fichero-byte-ims/fichero-byte-ims.module';
import { TechfileDiscapacidadImsModule } from './discapacidad-ims/discapacidad-ims.module';
import { TechfileDiagnosticoImsModule } from './diagnostico-ims/diagnostico-ims.module';
import { TechfileEtiologiaImsModule } from './etiologia-ims/etiologia-ims.module';
import { TechfileUsuarioImsModule } from './usuario-ims/usuario-ims.module';
import { TechfileCierreImsModule } from './cierre-ims/cierre-ims.module';
import { TechfileProcesoImsModule } from './proceso-ims/proceso-ims.module';
import { TechfileErrorRegistroImsModule } from './error-registro-ims/error-registro-ims.module';
import { TechfileTipoErrorImsModule } from './tipo-error-ims/tipo-error-ims.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        TechfileProvinciaImsModule,
        TechfileAutonomiaImsModule,
        TechfileMesImsModule,
        TechfilePensionConcurrenteImsModule,
        TechfileTipoRelacionImsModule,
        TechfileRegimenProcedenciaImsModule,
        TechfilePersonaImsModule,
        TechfilePensionistaImsModule,
        TechfileConvivienteImsModule,
        TechfilePerceptorImsModule,
        TechfileFicheroImsModule,
        TechfileFicheroByteImsModule,
        TechfileDiscapacidadImsModule,
        TechfileDiagnosticoImsModule,
        TechfileEtiologiaImsModule,
        TechfileUsuarioImsModule,
        TechfileCierreImsModule,
        TechfileProcesoImsModule,
        TechfileErrorRegistroImsModule,
        TechfileTipoErrorImsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileEntityModule {}
