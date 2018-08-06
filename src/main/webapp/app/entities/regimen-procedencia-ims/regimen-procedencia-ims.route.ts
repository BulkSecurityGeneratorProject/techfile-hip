import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegimenProcedenciaIms } from 'app/shared/model/regimen-procedencia-ims.model';
import { RegimenProcedenciaImsService } from './regimen-procedencia-ims.service';
import { RegimenProcedenciaImsComponent } from './regimen-procedencia-ims.component';
import { RegimenProcedenciaImsDetailComponent } from './regimen-procedencia-ims-detail.component';
import { RegimenProcedenciaImsUpdateComponent } from './regimen-procedencia-ims-update.component';
import { RegimenProcedenciaImsDeletePopupComponent } from './regimen-procedencia-ims-delete-dialog.component';
import { IRegimenProcedenciaIms } from 'app/shared/model/regimen-procedencia-ims.model';

@Injectable({ providedIn: 'root' })
export class RegimenProcedenciaImsResolve implements Resolve<IRegimenProcedenciaIms> {
    constructor(private service: RegimenProcedenciaImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((regimenProcedencia: HttpResponse<RegimenProcedenciaIms>) => regimenProcedencia.body));
        }
        return of(new RegimenProcedenciaIms());
    }
}

export const regimenProcedenciaRoute: Routes = [
    {
        path: 'regimen-procedencia-ims',
        component: RegimenProcedenciaImsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.regimenProcedencia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'regimen-procedencia-ims/:id/view',
        component: RegimenProcedenciaImsDetailComponent,
        resolve: {
            regimenProcedencia: RegimenProcedenciaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.regimenProcedencia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'regimen-procedencia-ims/new',
        component: RegimenProcedenciaImsUpdateComponent,
        resolve: {
            regimenProcedencia: RegimenProcedenciaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.regimenProcedencia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'regimen-procedencia-ims/:id/edit',
        component: RegimenProcedenciaImsUpdateComponent,
        resolve: {
            regimenProcedencia: RegimenProcedenciaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.regimenProcedencia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const regimenProcedenciaPopupRoute: Routes = [
    {
        path: 'regimen-procedencia-ims/:id/delete',
        component: RegimenProcedenciaImsDeletePopupComponent,
        resolve: {
            regimenProcedencia: RegimenProcedenciaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.regimenProcedencia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
