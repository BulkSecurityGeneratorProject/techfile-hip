import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    TipoErrorImsComponent,
    TipoErrorImsDetailComponent,
    TipoErrorImsUpdateComponent,
    TipoErrorImsDeletePopupComponent,
    TipoErrorImsDeleteDialogComponent,
    tipoErrorRoute,
    tipoErrorPopupRoute
} from './';

const ENTITY_STATES = [...tipoErrorRoute, ...tipoErrorPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoErrorImsComponent,
        TipoErrorImsDetailComponent,
        TipoErrorImsUpdateComponent,
        TipoErrorImsDeleteDialogComponent,
        TipoErrorImsDeletePopupComponent
    ],
    entryComponents: [
        TipoErrorImsComponent,
        TipoErrorImsUpdateComponent,
        TipoErrorImsDeleteDialogComponent,
        TipoErrorImsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileTipoErrorImsModule {}
