import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    DiagnosticoImsComponent,
    DiagnosticoImsDetailComponent,
    DiagnosticoImsUpdateComponent,
    DiagnosticoImsDeletePopupComponent,
    DiagnosticoImsDeleteDialogComponent,
    diagnosticoRoute,
    diagnosticoPopupRoute
} from './';

const ENTITY_STATES = [...diagnosticoRoute, ...diagnosticoPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DiagnosticoImsComponent,
        DiagnosticoImsDetailComponent,
        DiagnosticoImsUpdateComponent,
        DiagnosticoImsDeleteDialogComponent,
        DiagnosticoImsDeletePopupComponent
    ],
    entryComponents: [
        DiagnosticoImsComponent,
        DiagnosticoImsUpdateComponent,
        DiagnosticoImsDeleteDialogComponent,
        DiagnosticoImsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileDiagnosticoImsModule {}
