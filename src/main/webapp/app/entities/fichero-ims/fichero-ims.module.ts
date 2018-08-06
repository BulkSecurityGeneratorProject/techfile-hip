import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    FicheroImsComponent,
    FicheroImsDetailComponent,
    FicheroImsUpdateComponent,
    FicheroImsDeletePopupComponent,
    FicheroImsDeleteDialogComponent,
    ficheroRoute,
    ficheroPopupRoute
} from './';

const ENTITY_STATES = [...ficheroRoute, ...ficheroPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FicheroImsComponent,
        FicheroImsDetailComponent,
        FicheroImsUpdateComponent,
        FicheroImsDeleteDialogComponent,
        FicheroImsDeletePopupComponent
    ],
    entryComponents: [FicheroImsComponent, FicheroImsUpdateComponent, FicheroImsDeleteDialogComponent, FicheroImsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileFicheroImsModule {}
