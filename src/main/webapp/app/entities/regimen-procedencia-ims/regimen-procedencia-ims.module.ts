import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    RegimenProcedenciaImsComponent,
    RegimenProcedenciaImsDetailComponent,
    RegimenProcedenciaImsUpdateComponent,
    RegimenProcedenciaImsDeletePopupComponent,
    RegimenProcedenciaImsDeleteDialogComponent,
    regimenProcedenciaRoute,
    regimenProcedenciaPopupRoute
} from './';

const ENTITY_STATES = [...regimenProcedenciaRoute, ...regimenProcedenciaPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RegimenProcedenciaImsComponent,
        RegimenProcedenciaImsDetailComponent,
        RegimenProcedenciaImsUpdateComponent,
        RegimenProcedenciaImsDeleteDialogComponent,
        RegimenProcedenciaImsDeletePopupComponent
    ],
    entryComponents: [
        RegimenProcedenciaImsComponent,
        RegimenProcedenciaImsUpdateComponent,
        RegimenProcedenciaImsDeleteDialogComponent,
        RegimenProcedenciaImsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileRegimenProcedenciaImsModule {}
