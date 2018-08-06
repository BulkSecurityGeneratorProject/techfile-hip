import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EtiologiaIms } from 'app/shared/model/etiologia-ims.model';
import { EtiologiaImsService } from './etiologia-ims.service';
import { EtiologiaImsComponent } from './etiologia-ims.component';
import { EtiologiaImsDetailComponent } from './etiologia-ims-detail.component';
import { EtiologiaImsUpdateComponent } from './etiologia-ims-update.component';
import { EtiologiaImsDeletePopupComponent } from './etiologia-ims-delete-dialog.component';
import { IEtiologiaIms } from 'app/shared/model/etiologia-ims.model';

@Injectable({ providedIn: 'root' })
export class EtiologiaImsResolve implements Resolve<IEtiologiaIms> {
    constructor(private service: EtiologiaImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((etiologia: HttpResponse<EtiologiaIms>) => etiologia.body));
        }
        return of(new EtiologiaIms());
    }
}

export const etiologiaRoute: Routes = [
    {
        path: 'etiologia-ims',
        component: EtiologiaImsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'techfileApp.etiologia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'etiologia-ims/:id/view',
        component: EtiologiaImsDetailComponent,
        resolve: {
            etiologia: EtiologiaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.etiologia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'etiologia-ims/new',
        component: EtiologiaImsUpdateComponent,
        resolve: {
            etiologia: EtiologiaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.etiologia.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'etiologia-ims/:id/edit',
        component: EtiologiaImsUpdateComponent,
        resolve: {
            etiologia: EtiologiaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.etiologia.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const etiologiaPopupRoute: Routes = [
    {
        path: 'etiologia-ims/:id/delete',
        component: EtiologiaImsDeletePopupComponent,
        resolve: {
            etiologia: EtiologiaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.etiologia.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
