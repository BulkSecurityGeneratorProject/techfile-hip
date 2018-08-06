import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FicheroByteIms } from 'app/shared/model/fichero-byte-ims.model';
import { FicheroByteImsService } from './fichero-byte-ims.service';
import { FicheroByteImsComponent } from './fichero-byte-ims.component';
import { FicheroByteImsDetailComponent } from './fichero-byte-ims-detail.component';
import { FicheroByteImsUpdateComponent } from './fichero-byte-ims-update.component';
import { FicheroByteImsDeletePopupComponent } from './fichero-byte-ims-delete-dialog.component';
import { IFicheroByteIms } from 'app/shared/model/fichero-byte-ims.model';

@Injectable({ providedIn: 'root' })
export class FicheroByteImsResolve implements Resolve<IFicheroByteIms> {
    constructor(private service: FicheroByteImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((ficheroByte: HttpResponse<FicheroByteIms>) => ficheroByte.body));
        }
        return of(new FicheroByteIms());
    }
}

export const ficheroByteRoute: Routes = [
    {
        path: 'fichero-byte-ims',
        component: FicheroByteImsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'techfileApp.ficheroByte.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fichero-byte-ims/:id/view',
        component: FicheroByteImsDetailComponent,
        resolve: {
            ficheroByte: FicheroByteImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.ficheroByte.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fichero-byte-ims/new',
        component: FicheroByteImsUpdateComponent,
        resolve: {
            ficheroByte: FicheroByteImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.ficheroByte.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fichero-byte-ims/:id/edit',
        component: FicheroByteImsUpdateComponent,
        resolve: {
            ficheroByte: FicheroByteImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.ficheroByte.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ficheroBytePopupRoute: Routes = [
    {
        path: 'fichero-byte-ims/:id/delete',
        component: FicheroByteImsDeletePopupComponent,
        resolve: {
            ficheroByte: FicheroByteImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.ficheroByte.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
