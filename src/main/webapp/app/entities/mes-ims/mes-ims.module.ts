import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    MesImsComponent,
    MesImsDetailComponent,
    MesImsUpdateComponent,
    MesImsDeletePopupComponent,
    MesImsDeleteDialogComponent,
    mesRoute,
    mesPopupRoute
} from './';

const ENTITY_STATES = [...mesRoute, ...mesPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MesImsComponent, MesImsDetailComponent, MesImsUpdateComponent, MesImsDeleteDialogComponent, MesImsDeletePopupComponent],
    entryComponents: [MesImsComponent, MesImsUpdateComponent, MesImsDeleteDialogComponent, MesImsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileMesImsModule {}
