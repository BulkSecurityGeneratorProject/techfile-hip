import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PensionConcurrenteIms } from 'app/shared/model/pension-concurrente-ims.model';
import { PensionConcurrenteImsService } from './pension-concurrente-ims.service';
import { PensionConcurrenteImsComponent } from './pension-concurrente-ims.component';
import { PensionConcurrenteImsDetailComponent } from './pension-concurrente-ims-detail.component';
import { PensionConcurrenteImsUpdateComponent } from './pension-concurrente-ims-update.component';
import { PensionConcurrenteImsDeletePopupComponent } from './pension-concurrente-ims-delete-dialog.component';
import { IPensionConcurrenteIms } from 'app/shared/model/pension-concurrente-ims.model';

@Injectable({ providedIn: 'root' })
export class PensionConcurrenteImsResolve implements Resolve<IPensionConcurrenteIms> {
    constructor(private service: PensionConcurrenteImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((pensionConcurrente: HttpResponse<PensionConcurrenteIms>) => pensionConcurrente.body));
        }
        return of(new PensionConcurrenteIms());
    }
}

export const pensionConcurrenteRoute: Routes = [
    {
        path: 'pension-concurrente-ims',
        component: PensionConcurrenteImsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionConcurrente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pension-concurrente-ims/:id/view',
        component: PensionConcurrenteImsDetailComponent,
        resolve: {
            pensionConcurrente: PensionConcurrenteImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionConcurrente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pension-concurrente-ims/new',
        component: PensionConcurrenteImsUpdateComponent,
        resolve: {
            pensionConcurrente: PensionConcurrenteImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionConcurrente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'pension-concurrente-ims/:id/edit',
        component: PensionConcurrenteImsUpdateComponent,
        resolve: {
            pensionConcurrente: PensionConcurrenteImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionConcurrente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pensionConcurrentePopupRoute: Routes = [
    {
        path: 'pension-concurrente-ims/:id/delete',
        component: PensionConcurrenteImsDeletePopupComponent,
        resolve: {
            pensionConcurrente: PensionConcurrenteImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.pensionConcurrente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
