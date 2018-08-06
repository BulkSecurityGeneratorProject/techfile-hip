import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DiagnosticoIms } from 'app/shared/model/diagnostico-ims.model';
import { DiagnosticoImsService } from './diagnostico-ims.service';
import { DiagnosticoImsComponent } from './diagnostico-ims.component';
import { DiagnosticoImsDetailComponent } from './diagnostico-ims-detail.component';
import { DiagnosticoImsUpdateComponent } from './diagnostico-ims-update.component';
import { DiagnosticoImsDeletePopupComponent } from './diagnostico-ims-delete-dialog.component';
import { IDiagnosticoIms } from 'app/shared/model/diagnostico-ims.model';

@Injectable({ providedIn: 'root' })
export class DiagnosticoImsResolve implements Resolve<IDiagnosticoIms> {
    constructor(private service: DiagnosticoImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((diagnostico: HttpResponse<DiagnosticoIms>) => diagnostico.body));
        }
        return of(new DiagnosticoIms());
    }
}

export const diagnosticoRoute: Routes = [
    {
        path: 'diagnostico-ims',
        component: DiagnosticoImsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'techfileApp.diagnostico.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'diagnostico-ims/:id/view',
        component: DiagnosticoImsDetailComponent,
        resolve: {
            diagnostico: DiagnosticoImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.diagnostico.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'diagnostico-ims/new',
        component: DiagnosticoImsUpdateComponent,
        resolve: {
            diagnostico: DiagnosticoImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.diagnostico.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'diagnostico-ims/:id/edit',
        component: DiagnosticoImsUpdateComponent,
        resolve: {
            diagnostico: DiagnosticoImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.diagnostico.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const diagnosticoPopupRoute: Routes = [
    {
        path: 'diagnostico-ims/:id/delete',
        component: DiagnosticoImsDeletePopupComponent,
        resolve: {
            diagnostico: DiagnosticoImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.diagnostico.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
