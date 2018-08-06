import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    FicheroByteImsComponent,
    FicheroByteImsDetailComponent,
    FicheroByteImsUpdateComponent,
    FicheroByteImsDeletePopupComponent,
    FicheroByteImsDeleteDialogComponent,
    ficheroByteRoute,
    ficheroBytePopupRoute
} from './';

const ENTITY_STATES = [...ficheroByteRoute, ...ficheroBytePopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FicheroByteImsComponent,
        FicheroByteImsDetailComponent,
        FicheroByteImsUpdateComponent,
        FicheroByteImsDeleteDialogComponent,
        FicheroByteImsDeletePopupComponent
    ],
    entryComponents: [
        FicheroByteImsComponent,
        FicheroByteImsUpdateComponent,
        FicheroByteImsDeleteDialogComponent,
        FicheroByteImsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileFicheroByteImsModule {}
