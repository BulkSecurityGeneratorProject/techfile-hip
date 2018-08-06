import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TechfileSharedModule } from 'app/shared';
import {
    UsuarioImsComponent,
    UsuarioImsDetailComponent,
    UsuarioImsUpdateComponent,
    UsuarioImsDeletePopupComponent,
    UsuarioImsDeleteDialogComponent,
    usuarioRoute,
    usuarioPopupRoute
} from './';

const ENTITY_STATES = [...usuarioRoute, ...usuarioPopupRoute];

@NgModule({
    imports: [TechfileSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UsuarioImsComponent,
        UsuarioImsDetailComponent,
        UsuarioImsUpdateComponent,
        UsuarioImsDeleteDialogComponent,
        UsuarioImsDeletePopupComponent
    ],
    entryComponents: [UsuarioImsComponent, UsuarioImsUpdateComponent, UsuarioImsDeleteDialogComponent, UsuarioImsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TechfileUsuarioImsModule {}
