import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    AutonomiaImsComponent,
    AutonomiaImsDetailComponent,
    AutonomiaImsUpdateComponent,
    AutonomiaImsDeletePopupComponent,
    AutonomiaImsDeleteDialogComponent,
    autonomiaRoute,
    autonomiaPopupRoute
} from './';

const ENTITY_STATES = [...autonomiaRoute, ...autonomiaPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AutonomiaImsComponent,
        AutonomiaImsDetailComponent,
        AutonomiaImsUpdateComponent,
        AutonomiaImsDeleteDialogComponent,
        AutonomiaImsDeletePopupComponent
    ],
    entryComponents: [
        AutonomiaImsComponent,
        AutonomiaImsUpdateComponent,
        AutonomiaImsDeleteDialogComponent,
        AutonomiaImsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileAutonomiaImsModule {}
