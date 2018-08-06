import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    ErrorRegistroImsComponent,
    ErrorRegistroImsDetailComponent,
    ErrorRegistroImsUpdateComponent,
    ErrorRegistroImsDeletePopupComponent,
    ErrorRegistroImsDeleteDialogComponent,
    errorRegistroRoute,
    errorRegistroPopupRoute
} from './';

const ENTITY_STATES = [...errorRegistroRoute, ...errorRegistroPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ErrorRegistroImsComponent,
        ErrorRegistroImsDetailComponent,
        ErrorRegistroImsUpdateComponent,
        ErrorRegistroImsDeleteDialogComponent,
        ErrorRegistroImsDeletePopupComponent
    ],
    entryComponents: [
        ErrorRegistroImsComponent,
        ErrorRegistroImsUpdateComponent,
        ErrorRegistroImsDeleteDialogComponent,
        ErrorRegistroImsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileErrorRegistroImsModule {}
