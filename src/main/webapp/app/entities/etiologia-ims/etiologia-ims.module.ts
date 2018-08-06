import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    EtiologiaImsComponent,
    EtiologiaImsDetailComponent,
    EtiologiaImsUpdateComponent,
    EtiologiaImsDeletePopupComponent,
    EtiologiaImsDeleteDialogComponent,
    etiologiaRoute,
    etiologiaPopupRoute
} from './';

const ENTITY_STATES = [...etiologiaRoute, ...etiologiaPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EtiologiaImsComponent,
        EtiologiaImsDetailComponent,
        EtiologiaImsUpdateComponent,
        EtiologiaImsDeleteDialogComponent,
        EtiologiaImsDeletePopupComponent
    ],
    entryComponents: [
        EtiologiaImsComponent,
        EtiologiaImsUpdateComponent,
        EtiologiaImsDeleteDialogComponent,
        EtiologiaImsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileEtiologiaImsModule {}
