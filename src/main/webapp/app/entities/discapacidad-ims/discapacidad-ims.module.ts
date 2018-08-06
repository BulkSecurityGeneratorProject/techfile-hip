import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    DiscapacidadImsComponent,
    DiscapacidadImsDetailComponent,
    DiscapacidadImsUpdateComponent,
    DiscapacidadImsDeletePopupComponent,
    DiscapacidadImsDeleteDialogComponent,
    discapacidadRoute,
    discapacidadPopupRoute
} from './';

const ENTITY_STATES = [...discapacidadRoute, ...discapacidadPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DiscapacidadImsComponent,
        DiscapacidadImsDetailComponent,
        DiscapacidadImsUpdateComponent,
        DiscapacidadImsDeleteDialogComponent,
        DiscapacidadImsDeletePopupComponent
    ],
    entryComponents: [
        DiscapacidadImsComponent,
        DiscapacidadImsUpdateComponent,
        DiscapacidadImsDeleteDialogComponent,
        DiscapacidadImsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileDiscapacidadImsModule {}
