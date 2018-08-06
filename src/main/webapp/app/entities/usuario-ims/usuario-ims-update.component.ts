import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUsuarioIms } from 'app/shared/model/usuario-ims.model';
import { UsuarioImsService } from './usuario-ims.service';

@Component({
    selector: 'jhi-usuario-ims-update',
    templateUrl: './usuario-ims-update.component.html'
})
export class UsuarioImsUpdateComponent implements OnInit {
    private _usuario: IUsuarioIms;
    isSaving: boolean;

    constructor(private usuarioService: UsuarioImsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ usuario }) => {
            this.usuario = usuario;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.usuario.id !== undefined) {
            this.subscribeToSaveResponse(this.usuarioService.update(this.usuario));
        } else {
            this.subscribeToSaveResponse(this.usuarioService.create(this.usuario));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUsuarioIms>>) {
        result.subscribe((res: HttpResponse<IUsuarioIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get usuario() {
        return this._usuario;
    }

    set usuario(usuario: IUsuarioIms) {
        this._usuario = usuario;
    }
}
