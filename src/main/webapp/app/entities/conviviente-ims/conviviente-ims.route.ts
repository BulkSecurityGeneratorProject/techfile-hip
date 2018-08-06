import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConvivienteIms } from 'app/shared/model/conviviente-ims.model';
import { ConvivienteImsService } from './conviviente-ims.service';
import { ConvivienteImsComponent } from './conviviente-ims.component';
import { ConvivienteImsDetailComponent } from './conviviente-ims-detail.component';
import { ConvivienteImsUpdateComponent } from './conviviente-ims-update.component';
import { ConvivienteImsDeletePopupComponent } from './conviviente-ims-delete-dialog.component';
import { IConvivienteIms } from 'app/shared/model/conviviente-ims.model';

@Injectable({ providedIn: 'root' })
export class ConvivienteImsResolve implements Resolve<IConvivienteIms> {
    constructor(private service: ConvivienteImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((conviviente: HttpResponse<ConvivienteIms>) => conviviente.body));
        }
        return of(new ConvivienteIms());
    }
}

export const convivienteRoute: Routes = [
    {
        path: 'conviviente-ims',
        component: ConvivienteImsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'techfileApp.conviviente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'conviviente-ims/:id/view',
        component: ConvivienteImsDetailComponent,
        resolve: {
            conviviente: ConvivienteImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.conviviente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'conviviente-ims/new',
        component: ConvivienteImsUpdateComponent,
        resolve: {
            conviviente: ConvivienteImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.conviviente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'conviviente-ims/:id/edit',
        component: ConvivienteImsUpdateComponent,
        resolve: {
            conviviente: ConvivienteImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.conviviente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const convivientePopupRoute: Routes = [
    {
        path: 'conviviente-ims/:id/delete',
        component: ConvivienteImsDeletePopupComponent,
        resolve: {
            conviviente: ConvivienteImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.conviviente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
