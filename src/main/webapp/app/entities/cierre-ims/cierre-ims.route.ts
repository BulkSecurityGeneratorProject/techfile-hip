import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CierreIms } from 'app/shared/model/cierre-ims.model';
import { CierreImsService } from './cierre-ims.service';
import { CierreImsComponent } from './cierre-ims.component';
import { CierreImsDetailComponent } from './cierre-ims-detail.component';
import { CierreImsUpdateComponent } from './cierre-ims-update.component';
import { CierreImsDeletePopupComponent } from './cierre-ims-delete-dialog.component';
import { ICierreIms } from 'app/shared/model/cierre-ims.model';

@Injectable({ providedIn: 'root' })
export class CierreImsResolve implements Resolve<ICierreIms> {
    constructor(private service: CierreImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((cierre: HttpResponse<CierreIms>) => cierre.body));
        }
        return of(new CierreIms());
    }
}

export const cierreRoute: Routes = [
    {
        path: 'cierre-ims',
        component: CierreImsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.cierre.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cierre-ims/:id/view',
        component: CierreImsDetailComponent,
        resolve: {
            cierre: CierreImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.cierre.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cierre-ims/new',
        component: CierreImsUpdateComponent,
        resolve: {
            cierre: CierreImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.cierre.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cierre-ims/:id/edit',
        component: CierreImsUpdateComponent,
        resolve: {
            cierre: CierreImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.cierre.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cierrePopupRoute: Routes = [
    {
        path: 'cierre-ims/:id/delete',
        component: CierreImsDeletePopupComponent,
        resolve: {
            cierre: CierreImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.cierre.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
