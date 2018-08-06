import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProcesoIms } from 'app/shared/model/proceso-ims.model';
import { ProcesoImsService } from './proceso-ims.service';
import { ProcesoImsComponent } from './proceso-ims.component';
import { ProcesoImsDetailComponent } from './proceso-ims-detail.component';
import { ProcesoImsUpdateComponent } from './proceso-ims-update.component';
import { ProcesoImsDeletePopupComponent } from './proceso-ims-delete-dialog.component';
import { IProcesoIms } from 'app/shared/model/proceso-ims.model';

@Injectable({ providedIn: 'root' })
export class ProcesoImsResolve implements Resolve<IProcesoIms> {
    constructor(private service: ProcesoImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((proceso: HttpResponse<ProcesoIms>) => proceso.body));
        }
        return of(new ProcesoIms());
    }
}

export const procesoRoute: Routes = [
    {
        path: 'proceso-ims',
        component: ProcesoImsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.proceso.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'proceso-ims/:id/view',
        component: ProcesoImsDetailComponent,
        resolve: {
            proceso: ProcesoImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.proceso.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'proceso-ims/new',
        component: ProcesoImsUpdateComponent,
        resolve: {
            proceso: ProcesoImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.proceso.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'proceso-ims/:id/edit',
        component: ProcesoImsUpdateComponent,
        resolve: {
            proceso: ProcesoImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.proceso.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const procesoPopupRoute: Routes = [
    {
        path: 'proceso-ims/:id/delete',
        component: ProcesoImsDeletePopupComponent,
        resolve: {
            proceso: ProcesoImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.proceso.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
