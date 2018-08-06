import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorRegistroIms } from 'app/shared/model/error-registro-ims.model';
import { ErrorRegistroImsService } from './error-registro-ims.service';
import { ErrorRegistroImsComponent } from './error-registro-ims.component';
import { ErrorRegistroImsDetailComponent } from './error-registro-ims-detail.component';
import { ErrorRegistroImsUpdateComponent } from './error-registro-ims-update.component';
import { ErrorRegistroImsDeletePopupComponent } from './error-registro-ims-delete-dialog.component';
import { IErrorRegistroIms } from 'app/shared/model/error-registro-ims.model';

@Injectable({ providedIn: 'root' })
export class ErrorRegistroImsResolve implements Resolve<IErrorRegistroIms> {
    constructor(private service: ErrorRegistroImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((errorRegistro: HttpResponse<ErrorRegistroIms>) => errorRegistro.body));
        }
        return of(new ErrorRegistroIms());
    }
}

export const errorRegistroRoute: Routes = [
    {
        path: 'error-registro-ims',
        component: ErrorRegistroImsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.errorRegistro.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'error-registro-ims/:id/view',
        component: ErrorRegistroImsDetailComponent,
        resolve: {
            errorRegistro: ErrorRegistroImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.errorRegistro.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'error-registro-ims/new',
        component: ErrorRegistroImsUpdateComponent,
        resolve: {
            errorRegistro: ErrorRegistroImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.errorRegistro.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'error-registro-ims/:id/edit',
        component: ErrorRegistroImsUpdateComponent,
        resolve: {
            errorRegistro: ErrorRegistroImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.errorRegistro.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const errorRegistroPopupRoute: Routes = [
    {
        path: 'error-registro-ims/:id/delete',
        component: ErrorRegistroImsDeletePopupComponent,
        resolve: {
            errorRegistro: ErrorRegistroImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.errorRegistro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
