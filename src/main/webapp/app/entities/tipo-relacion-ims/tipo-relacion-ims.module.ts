import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    TipoRelacionImsComponent,
    TipoRelacionImsDetailComponent,
    TipoRelacionImsUpdateComponent,
    TipoRelacionImsDeletePopupComponent,
    TipoRelacionImsDeleteDialogComponent,
    tipoRelacionRoute,
    tipoRelacionPopupRoute
} from './';

const ENTITY_STATES = [...tipoRelacionRoute, ...tipoRelacionPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoRelacionImsComponent,
        TipoRelacionImsDetailComponent,
        TipoRelacionImsUpdateComponent,
        TipoRelacionImsDeleteDialogComponent,
        TipoRelacionImsDeletePopupComponent
    ],
    entryComponents: [
        TipoRelacionImsComponent,
        TipoRelacionImsUpdateComponent,
        TipoRelacionImsDeleteDialogComponent,
        TipoRelacionImsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileTipoRelacionImsModule {}
