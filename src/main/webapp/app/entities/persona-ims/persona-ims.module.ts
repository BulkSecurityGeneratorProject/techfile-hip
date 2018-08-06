import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    PersonaImsComponent,
    PersonaImsDetailComponent,
    PersonaImsUpdateComponent,
    PersonaImsDeletePopupComponent,
    PersonaImsDeleteDialogComponent,
    personaRoute,
    personaPopupRoute
} from './';

const ENTITY_STATES = [...personaRoute, ...personaPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PersonaImsComponent,
        PersonaImsDetailComponent,
        PersonaImsUpdateComponent,
        PersonaImsDeleteDialogComponent,
        PersonaImsDeletePopupComponent
    ],
    entryComponents: [PersonaImsComponent, PersonaImsUpdateComponent, PersonaImsDeleteDialogComponent, PersonaImsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfilePersonaImsModule {}
