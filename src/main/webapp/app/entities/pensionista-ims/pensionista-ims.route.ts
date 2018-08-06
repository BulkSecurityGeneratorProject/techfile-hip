import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PensionistaIms } from 'app/shared/model/pensionista-ims.model';
import { PensionistaImsService } from './pensionista-ims.service';
import { PensionistaImsComponent } from './pensionista-ims.component';
import { PensionistaImsDetailComponent } from './pensionista-ims-detail.component';
import { PensionistaImsUpdateComponent } from './pensionista-ims-update.component';
import { PensionistaImsDeletePopupComponent } from './pensionista-ims-delete-dialog.component';
import { IPensionistaIms } from 'app/shared/model/pensionista-ims.model';

@Injectable({ providedIn: 'root' })
export class PensionistaImsResolve implements Resolve<IPensionistaIms> {
    constructor(private service: PensionistaImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((pensionista: HttpResponse<PensionistaIms>) => pensionista.body));
        }
        return of(new PensionistaIms());
    }
}

export const pensionistaRoute: Routes = [
    {
        path: 'pensionista-ims',
        component: PensionistaImsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'techfileApp.pensionista.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pensionista-ims/:id/view',
        component: PensionistaImsDetailComponent,
        resolve: {
            pensionista: PensionistaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionista.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pensionista-ims/new',
        component: PensionistaImsUpdateComponent,
        resolve: {
            pensionista: PensionistaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionista.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pensionista-ims/:id/edit',
        component: PensionistaImsUpdateComponent,
        resolve: {
            pensionista: PensionistaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionista.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pensionistaPopupRoute: Routes = [
    {
        path: 'pensionista-ims/:id/delete',
        component: PensionistaImsDeletePopupComponent,
        resolve: {
            pensionista: PensionistaImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionista.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
