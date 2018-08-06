import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoRelacionIms } from 'app/shared/model/tipo-relacion-ims.model';
import { TipoRelacionImsService } from './tipo-relacion-ims.service';
import { TipoRelacionImsComponent } from './tipo-relacion-ims.component';
import { TipoRelacionImsDetailComponent } from './tipo-relacion-ims-detail.component';
import { TipoRelacionImsUpdateComponent } from './tipo-relacion-ims-update.component';
import { TipoRelacionImsDeletePopupComponent } from './tipo-relacion-ims-delete-dialog.component';
import { ITipoRelacionIms } from 'app/shared/model/tipo-relacion-ims.model';

@Injectable({ providedIn: 'root' })
export class TipoRelacionImsResolve implements Resolve<ITipoRelacionIms> {
    constructor(private service: TipoRelacionImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((tipoRelacion: HttpResponse<TipoRelacionIms>) => tipoRelacion.body));
        }
        return of(new TipoRelacionIms());
    }
}

export const tipoRelacionRoute: Routes = [
    {
        path: 'tipo-relacion-ims',
        component: TipoRelacionImsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.tipoRelacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-relacion-ims/:id/view',
        component: TipoRelacionImsDetailComponent,
        resolve: {
            tipoRelacion: TipoRelacionImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.tipoRelacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-relacion-ims/new',
        component: TipoRelacionImsUpdateComponent,
        resolve: {
            tipoRelacion: TipoRelacionImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.tipoRelacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-relacion-ims/:id/edit',
        component: TipoRelacionImsUpdateComponent,
        resolve: {
            tipoRelacion: TipoRelacionImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.tipoRelacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoRelacionPopupRoute: Routes = [
    {
        path: 'tipo-relacion-ims/:id/delete',
        component: TipoRelacionImsDeletePopupComponent,
        resolve: {
            tipoRelacion: TipoRelacionImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.tipoRelacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
