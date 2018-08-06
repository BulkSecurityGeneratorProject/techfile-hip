import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioIms } from 'app/shared/model/usuario-ims.model';
import { UsuarioImsService } from './usuario-ims.service';
import { UsuarioImsComponent } from './usuario-ims.component';
import { UsuarioImsDetailComponent } from './usuario-ims-detail.component';
import { UsuarioImsUpdateComponent } from './usuario-ims-update.component';
import { UsuarioImsDeletePopupComponent } from './usuario-ims-delete-dialog.component';
import { IUsuarioIms } from 'app/shared/model/usuario-ims.model';

@Injectable({ providedIn: 'root' })
export class UsuarioImsResolve implements Resolve<IUsuarioIms> {
    constructor(private service: UsuarioImsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((usuario: HttpResponse<UsuarioIms>) => usuario.body));
        }
        return of(new UsuarioIms());
    }
}

export const usuarioRoute: Routes = [
    {
        path: 'usuario-ims',
        component: UsuarioImsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'usuario-ims/:id/view',
        component: UsuarioImsDetailComponent,
        resolve: {
            usuario: UsuarioImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'usuario-ims/new',
        component: UsuarioImsUpdateComponent,
        resolve: {
            usuario: UsuarioImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'usuario-ims/:id/edit',
        component: UsuarioImsUpdateComponent,
        resolve: {
            usuario: UsuarioImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const usuarioPopupRoute: Routes = [
    {
        path: 'usuario-ims/:id/delete',
        component: UsuarioImsDeletePopupComponent,
        resolve: {
            usuario: UsuarioImsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'techfileApp.usuario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
