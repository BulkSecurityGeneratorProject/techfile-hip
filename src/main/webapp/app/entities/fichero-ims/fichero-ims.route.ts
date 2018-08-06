import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FicheroIms } from 'app/shared/model/fichero-ims.model';
import { FicheroImsService } from './fichero-ims.service';
import { FicheroImsComponent } from './fichero-ims.component';
import { FicheroImsDetailComponent } from './fichero-ims-detail.component';
import { FicheroImsUpdateComponent } from './fichero-ims-update.component';
import { FicheroImsDeletePopupComponent } from './fichero-ims-delete-dialog.component';
import { IFicheroIms } from 'app/shared/model/fichero-ims.model';

@Injectable({ providedIn: 'root' })
export class FicheroImsResolve implements Resolve<IFicheroIms> {
    constructor(private service: FicheroImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((fichero: HttpResponse<FicheroIms>) => fichero.body));
        }
        return of(new FicheroIms());
    }
}

export const ficheroRoute: Routes = [
    {
        path: 'fichero-ims',
        component: FicheroImsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'techfileApp.fichero.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fichero-ims/:id/view',
        component: FicheroImsDetailComponent,
        resolve: {
            fichero: FicheroImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.fichero.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fichero-ims/new',
        component: FicheroImsUpdateComponent,
        resolve: {
            fichero: FicheroImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.fichero.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fichero-ims/:id/edit',
        component: FicheroImsUpdateComponent,
        resolve: {
            fichero: FicheroImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.fichero.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ficheroPopupRoute: Routes = [
    {
        path: 'fichero-ims/:id/delete',
        component: FicheroImsDeletePopupComponent,
        resolve: {
            fichero: FicheroImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.fichero.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
