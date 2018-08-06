import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoErrorIms } from 'app/shared/model/tipo-error-ims.model';
import { TipoErrorImsService } from './tipo-error-ims.service';
import { TipoErrorImsComponent } from './tipo-error-ims.component';
import { TipoErrorImsDetailComponent } from './tipo-error-ims-detail.component';
import { TipoErrorImsUpdateComponent } from './tipo-error-ims-update.component';
import { TipoErrorImsDeletePopupComponent } from './tipo-error-ims-delete-dialog.component';
import { ITipoErrorIms } from 'app/shared/model/tipo-error-ims.model';

@Injectable({ providedIn: 'root' })
export class TipoErrorImsResolve implements Resolve<ITipoErrorIms> {
    constructor(private service: TipoErrorImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((tipoError: HttpResponse<TipoErrorIms>) => tipoError.body));
        }
        return of(new TipoErrorIms());
    }
}

export const tipoErrorRoute: Routes = [
    {
        path: 'tipo-error-ims',
        component: TipoErrorImsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.tipoError.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-error-ims/:id/view',
        component: TipoErrorImsDetailComponent,
        resolve: {
            tipoError: TipoErrorImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.tipoError.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-error-ims/new',
        component: TipoErrorImsUpdateComponent,
        resolve: {
            tipoError: TipoErrorImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.tipoError.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-error-ims/:id/edit',
        component: TipoErrorImsUpdateComponent,
        resolve: {
            tipoError: TipoErrorImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.tipoError.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoErrorPopupRoute: Routes = [
    {
        path: 'tipo-error-ims/:id/delete',
        component: TipoErrorImsDeletePopupComponent,
        resolve: {
            tipoError: TipoErrorImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.tipoError.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
