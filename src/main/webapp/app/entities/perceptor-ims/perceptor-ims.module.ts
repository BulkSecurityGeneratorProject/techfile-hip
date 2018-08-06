import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    PerceptorImsComponent,
    PerceptorImsDetailComponent,
    PerceptorImsUpdateComponent,
    PerceptorImsDeletePopupComponent,
    PerceptorImsDeleteDialogComponent,
    perceptorRoute,
    perceptorPopupRoute
} from './';

const ENTITY_STATES = [...perceptorRoute, ...perceptorPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PerceptorImsComponent,
        PerceptorImsDetailComponent,
        PerceptorImsUpdateComponent,
        PerceptorImsDeleteDialogComponent,
        PerceptorImsDeletePopupComponent
    ],
    entryComponents: [
        PerceptorImsComponent,
        PerceptorImsUpdateComponent,
        PerceptorImsDeleteDialogComponent,
        PerceptorImsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfilePerceptorImsModule {}
