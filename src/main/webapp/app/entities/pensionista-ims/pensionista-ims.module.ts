import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    PensionistaImsComponent,
    PensionistaImsDetailComponent,
    PensionistaImsUpdateComponent,
    PensionistaImsDeletePopupComponent,
    PensionistaImsDeleteDialogComponent,
    pensionistaRoute,
    pensionistaPopupRoute
} from './';

const ENTITY_STATES = [...pensionistaRoute, ...pensionistaPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PensionistaImsComponent,
        PensionistaImsDetailComponent,
        PensionistaImsUpdateComponent,
        PensionistaImsDeleteDialogComponent,
        PensionistaImsDeletePopupComponent
    ],
    entryComponents: [
        PensionistaImsComponent,
        PensionistaImsUpdateComponent,
        PensionistaImsDeleteDialogComponent,
        PensionistaImsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfilePensionistaImsModule {}
