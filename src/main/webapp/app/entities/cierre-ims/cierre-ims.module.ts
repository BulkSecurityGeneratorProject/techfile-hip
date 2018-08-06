import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    CierreImsComponent,
    CierreImsDetailComponent,
    CierreImsUpdateComponent,
    CierreImsDeletePopupComponent,
    CierreImsDeleteDialogComponent,
    cierreRoute,
    cierrePopupRoute
} from './';

const ENTITY_STATES = [...cierreRoute, ...cierrePopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CierreImsComponent,
        CierreImsDetailComponent,
        CierreImsUpdateComponent,
        CierreImsDeleteDialogComponent,
        CierreImsDeletePopupComponent
    ],
    entryComponents: [CierreImsComponent, CierreImsUpdateComponent, CierreImsDeleteDialogComponent, CierreImsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileCierreImsModule {}
