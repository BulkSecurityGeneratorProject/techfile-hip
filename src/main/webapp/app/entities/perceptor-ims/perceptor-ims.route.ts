import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PerceptorIms } from 'app/shared/model/perceptor-ims.model';
import { PerceptorImsService } from './perceptor-ims.service';
import { PerceptorImsComponent } from './perceptor-ims.component';
import { PerceptorImsDetailComponent } from './perceptor-ims-detail.component';
import { PerceptorImsUpdateComponent } from './perceptor-ims-update.component';
import { PerceptorImsDeletePopupComponent } from './perceptor-ims-delete-dialog.component';
import { IPerceptorIms } from 'app/shared/model/perceptor-ims.model';

@Injectable({ providedIn: 'root' })
export class PerceptorImsResolve implements Resolve<IPerceptorIms> {
    constructor(private service: PerceptorImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((perceptor: HttpResponse<PerceptorIms>) => perceptor.body));
        }
        return of(new PerceptorIms());
    }
}

export const perceptorRoute: Routes = [
    {
        path: 'perceptor-ims',
        component: PerceptorImsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'techfileApp.perceptor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'perceptor-ims/:id/view',
        component: PerceptorImsDetailComponent,
        resolve: {
            perceptor: PerceptorImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.perceptor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'perceptor-ims/new',
        component: PerceptorImsUpdateComponent,
        resolve: {
            perceptor: PerceptorImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.perceptor.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'perceptor-ims/:id/edit',
        component: PerceptorImsUpdateComponent,
        resolve: {
            perceptor: PerceptorImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.perceptor.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const perceptorPopupRoute: Routes = [
    {
        path: 'perceptor-ims/:id/delete',
        component: PerceptorImsDeletePopupComponent,
        resolve: {
            perceptor: PerceptorImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.perceptor.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
