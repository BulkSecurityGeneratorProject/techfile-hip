import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PersonaIms } from 'app/shared/model/persona-ims.model';
import { PersonaImsService } from './persona-ims.service';
import { PersonaImsComponent } from './persona-ims.component';
import { PersonaImsDetailComponent } from './persona-ims-detail.component';
import { PersonaImsUpdateComponent } from './persona-ims-update.component';
import { PersonaImsDeletePopupComponent } from './persona-ims-delete-dialog.component';
import { IPersonaIms } from 'app/shared/model/persona-ims.model';

@Injectable({ providedIn: 'root' })
export class PersonaImsResolve implements Resolve<IPersonaIms> {
    constructor(private service: PersonaImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((persona: HttpResponse<PersonaIms>) => persona.body));
        }
        return of(new PersonaIms());
    }
}

export const personaRoute: Routes = [
    {
        path: 'persona-ims',
        component: PersonaImsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'techfileApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'persona-ims/:id/view',
        component: PersonaImsDetailComponent,
        resolve: {
            persona: PersonaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'persona-ims/new',
        component: PersonaImsUpdateComponent,
        resolve: {
            persona: PersonaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'persona-ims/:id/edit',
        component: PersonaImsUpdateComponent,
        resolve: {
            persona: PersonaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personaPopupRoute: Routes = [
    {
        path: 'persona-ims/:id/delete',
        component: PersonaImsDeletePopupComponent,
        resolve: {
            persona: PersonaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.persona.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
