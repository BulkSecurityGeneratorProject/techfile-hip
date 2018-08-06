import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MesIms } from 'app/shared/model/mes-ims.model';
import { MesImsService } from './mes-ims.service';
import { MesImsComponent } from './mes-ims.component';
import { MesImsDetailComponent } from './mes-ims-detail.component';
import { MesImsUpdateComponent } from './mes-ims-update.component';
import { MesImsDeletePopupComponent } from './mes-ims-delete-dialog.component';
import { IMesIms } from 'app/shared/model/mes-ims.model';

@Injectable({ providedIn: 'root' })
export class MesImsResolve implements Resolve<IMesIms> {
    constructor(private service: MesImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((mes: HttpResponse<MesIms>) => mes.body));
        }
        return of(new MesIms());
    }
}

export const mesRoute: Routes = [
    {
        path: 'mes-ims',
        component: MesImsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.mes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mes-ims/:id/view',
        component: MesImsDetailComponent,
        resolve: {
            mes: MesImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.mes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mes-ims/new',
        component: MesImsUpdateComponent,
        resolve: {
            mes: MesImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.mes.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'mes-ims/:id/edit',
        component: MesImsUpdateComponent,
        resolve: {
            mes: MesImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.mes.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mesPopupRoute: Routes = [
    {
        path: 'mes-ims/:id/delete',
        component: MesImsDeletePopupComponent,
        resolve: {
            mes: MesImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.mes.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
