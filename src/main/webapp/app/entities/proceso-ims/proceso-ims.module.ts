import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    ProcesoImsComponent,
    ProcesoImsDetailComponent,
    ProcesoImsUpdateComponent,
    ProcesoImsDeletePopupComponent,
    ProcesoImsDeleteDialogComponent,
    procesoRoute,
    procesoPopupRoute
} from './';

const ENTITY_STATES = [...procesoRoute, ...procesoPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProcesoImsComponent,
        ProcesoImsDetailComponent,
        ProcesoImsUpdateComponent,
        ProcesoImsDeleteDialogComponent,
        ProcesoImsDeletePopupComponent
    ],
    entryComponents: [ProcesoImsComponent, ProcesoImsUpdateComponent, ProcesoImsDeleteDialogComponent, ProcesoImsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileProcesoImsModule {}
