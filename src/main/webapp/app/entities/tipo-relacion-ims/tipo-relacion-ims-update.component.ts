import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITipoRelacionIms } from 'app/shared/model/tipo-relacion-ims.model';
import { TipoRelacionImsService } from './tipo-relacion-ims.service';

@Component({
    selector: 'jhi-tipo-relacion-ims-update',
    templateUrl: './tipo-relacion-ims-update.component.html'
})
export class TipoRelacionImsUpdateComponent implements OnInit {
    private _tipoRelacion: ITipoRelacionIms;
    isSaving: boolean;

    constructor(private tipoRelacionService: TipoRelacionImsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tipoRelacion }) => {
            this.tipoRelacion = tipoRelacion;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tipoRelacion.id !== undefined) {
            this.subscribeToSaveResponse(this.tipoRelacionService.update(this.tipoRelacion));
        } else {
            this.subscribeToSaveResponse(this.tipoRelacionService.create(this.tipoRelacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITipoRelacionIms>>) {
        result.subscribe((res: HttpResponse<ITipoRelacionIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get tipoRelacion() {
        return this._tipoRelacion;
    }

    set tipoRelacion(tipoRelacion: ITipoRelacionIms) {
        this._tipoRelacion = tipoRelacion;
    }
}
