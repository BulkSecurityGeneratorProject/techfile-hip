import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRegimenProcedenciaIms } from 'app/shared/model/regimen-procedencia-ims.model';
import { RegimenProcedenciaImsService } from './regimen-procedencia-ims.service';

@Component({
    selector: 'jhi-regimen-procedencia-ims-update',
    templateUrl: './regimen-procedencia-ims-update.component.html'
})
export class RegimenProcedenciaImsUpdateComponent implements OnInit {
    private _regimenProcedencia: IRegimenProcedenciaIms;
    isSaving: boolean;

    constructor(private regimenProcedenciaService: RegimenProcedenciaImsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ regimenProcedencia }) => {
            this.regimenProcedencia = regimenProcedencia;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.regimenProcedencia.id !== undefined) {
            this.subscribeToSaveResponse(this.regimenProcedenciaService.update(this.regimenProcedencia));
        } else {
            this.subscribeToSaveResponse(this.regimenProcedenciaService.create(this.regimenProcedencia));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRegimenProcedenciaIms>>) {
        result.subscribe(
            (res: HttpResponse<IRegimenProcedenciaIms>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get regimenProcedencia() {
        return this._regimenProcedencia;
    }

    set regimenProcedencia(regimenProcedencia: IRegimenProcedenciaIms) {
        this._regimenProcedencia = regimenProcedencia;
    }
}
