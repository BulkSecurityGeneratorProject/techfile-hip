import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    PensionConcurrenteImsComponent,
    PensionConcurrenteImsDetailComponent,
    PensionConcurrenteImsUpdateComponent,
    PensionConcurrenteImsDeletePopupComponent,
    PensionConcurrenteImsDeleteDialogComponent,
    pensionConcurrenteRoute,
    pensionConcurrentePopupRoute
} from './';

const ENTITY_STATES = [...pensionConcurrenteRoute, ...pensionConcurrentePopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PensionConcurrenteImsComponent,
        PensionConcurrenteImsDetailComponent,
        PensionConcurrenteImsUpdateComponent,
        PensionConcurrenteImsDeleteDialogComponent,
        PensionConcurrenteImsDeletePopupComponent
    ],
    entryComponents: [
        PensionConcurrenteImsComponent,
        PensionConcurrenteImsUpdateComponent,
        PensionConcurrenteImsDeleteDialogComponent,
        PensionConcurrenteImsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfilePensionConcurrenteImsModule {}
