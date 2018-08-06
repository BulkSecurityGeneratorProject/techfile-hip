import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AutonomiaIms } from 'app/shared/model/autonomia-ims.model';
import { AutonomiaImsService } from './autonomia-ims.service';
import { AutonomiaImsComponent } from './autonomia-ims.component';
import { AutonomiaImsDetailComponent } from './autonomia-ims-detail.component';
import { AutonomiaImsUpdateComponent } from './autonomia-ims-update.component';
import { AutonomiaImsDeletePopupComponent } from './autonomia-ims-delete-dialog.component';
import { IAutonomiaIms } from 'app/shared/model/autonomia-ims.model';

@Injectable({ providedIn: 'root' })
export class AutonomiaImsResolve implements Resolve<IAutonomiaIms> {
    constructor(private service: AutonomiaImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((autonomia: HttpResponse<AutonomiaIms>) => autonomia.body));
        }
        return of(new AutonomiaIms());
    }
}

export const autonomiaRoute: Routes = [
    {
        path: 'autonomia-ims',
        component: AutonomiaImsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.autonomia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'autonomia-ims/:id/view',
        component: AutonomiaImsDetailComponent,
        resolve: {
            autonomia: AutonomiaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.autonomia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'autonomia-ims/new',
        component: AutonomiaImsUpdateComponent,
        resolve: {
            autonomia: AutonomiaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.autonomia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'autonomia-ims/:id/edit',
        component: AutonomiaImsUpdateComponent,
        resolve: {
            autonomia: AutonomiaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.autonomia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const autonomiaPopupRoute: Routes = [
    {
        path: 'autonomia-ims/:id/delete',
        component: AutonomiaImsDeletePopupComponent,
        resolve: {
            autonomia: AutonomiaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.autonomia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
