import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DiscapacidadIms } from 'app/shared/model/discapacidad-ims.model';
import { DiscapacidadImsService } from './discapacidad-ims.service';
import { DiscapacidadImsComponent } from './discapacidad-ims.component';
import { DiscapacidadImsDetailComponent } from './discapacidad-ims-detail.component';
import { DiscapacidadImsUpdateComponent } from './discapacidad-ims-update.component';
import { DiscapacidadImsDeletePopupComponent } from './discapacidad-ims-delete-dialog.component';
import { IDiscapacidadIms } from 'app/shared/model/discapacidad-ims.model';

@Injectable({ providedIn: 'root' })
export class DiscapacidadImsResolve implements Resolve<IDiscapacidadIms> {
    constructor(private service: DiscapacidadImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((discapacidad: HttpResponse<DiscapacidadIms>) => discapacidad.body));
        }
        return of(new DiscapacidadIms());
    }
}

export const discapacidadRoute: Routes = [
    {
        path: 'discapacidad-ims',
        component: DiscapacidadImsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'techfileApp.discapacidad.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'discapacidad-ims/:id/view',
        component: DiscapacidadImsDetailComponent,
        resolve: {
            discapacidad: DiscapacidadImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.discapacidad.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'discapacidad-ims/new',
        component: DiscapacidadImsUpdateComponent,
        resolve: {
            discapacidad: DiscapacidadImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.discapacidad.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'discapacidad-ims/:id/edit',
        component: DiscapacidadImsUpdateComponent,
        resolve: {
            discapacidad: DiscapacidadImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.discapacidad.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const discapacidadPopupRoute: Routes = [
    {
        path: 'discapacidad-ims/:id/delete',
        component: DiscapacidadImsDeletePopupComponent,
        resolve: {
            discapacidad: DiscapacidadImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.discapacidad.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
