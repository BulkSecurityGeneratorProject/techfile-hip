import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProvinciaIms } from 'app/shared/model/provincia-ims.model';
import { ProvinciaImsService } from './provincia-ims.service';
import { ProvinciaImsComponent } from './provincia-ims.component';
import { ProvinciaImsDetailComponent } from './provincia-ims-detail.component';
import { ProvinciaImsUpdateComponent } from './provincia-ims-update.component';
import { ProvinciaImsDeletePopupComponent } from './provincia-ims-delete-dialog.component';
import { IProvinciaIms } from 'app/shared/model/provincia-ims.model';

@Injectable({ providedIn: 'root' })
export class ProvinciaImsResolve implements Resolve<IProvinciaIms> {
    constructor(private service: ProvinciaImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((provincia: HttpResponse<ProvinciaIms>) => provincia.body));
        }
        return of(new ProvinciaIms());
    }
}

export const provinciaRoute: Routes = [
    {
        path: 'provincia-ims',
        component: ProvinciaImsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.provincia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'provincia-ims/:id/view',
        component: ProvinciaImsDetailComponent,
        resolve: {
            provincia: ProvinciaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.provincia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'provincia-ims/new',
        component: ProvinciaImsUpdateComponent,
        resolve: {
            provincia: ProvinciaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.provincia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'provincia-ims/:id/edit',
        component: ProvinciaImsUpdateComponent,
        resolve: {
            provincia: ProvinciaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.provincia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const provinciaPopupRoute: Routes = [
    {
        path: 'provincia-ims/:id/delete',
        component: ProvinciaImsDeletePopupComponent,
        resolve: {
            provincia: ProvinciaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.provincia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
