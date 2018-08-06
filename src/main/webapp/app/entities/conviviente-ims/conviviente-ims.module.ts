import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    ConvivienteImsComponent,
    ConvivienteImsDetailComponent,
    ConvivienteImsUpdateComponent,
    ConvivienteImsDeletePopupComponent,
    ConvivienteImsDeleteDialogComponent,
    convivienteRoute,
    convivientePopupRoute
} from './';

const ENTITY_STATES = [...convivienteRoute, ...convivientePopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ConvivienteImsComponent,
        ConvivienteImsDetailComponent,
        ConvivienteImsUpdateComponent,
        ConvivienteImsDeleteDialogComponent,
        ConvivienteImsDeletePopupComponent
    ],
    entryComponents: [
        ConvivienteImsComponent,
        ConvivienteImsUpdateComponent,
        ConvivienteImsDeleteDialogComponent,
        ConvivienteImsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileConvivienteImsModule {}
