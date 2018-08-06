import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    ProvinciaImsComponent,
    ProvinciaImsDetailComponent,
    ProvinciaImsUpdateComponent,
    ProvinciaImsDeletePopupComponent,
    ProvinciaImsDeleteDialogComponent,
    provinciaRoute,
    provinciaPopupRoute
} from './';

const ENTITY_STATES = [...provinciaRoute, ...provinciaPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProvinciaImsComponent,
        ProvinciaImsDetailComponent,
        ProvinciaImsUpdateComponent,
        ProvinciaImsDeleteDialogComponent,
        ProvinciaImsDeletePopupComponent
    ],
    entryComponents: [
        ProvinciaImsComponent,
        ProvinciaImsUpdateComponent,
        ProvinciaImsDeleteDialogComponent,
        ProvinciaImsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileProvinciaImsModule {}
