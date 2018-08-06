import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITipoErrorIms } from 'app/shared/model/tipo-error-ims.model';
import { TipoErrorImsService } from './tipo-error-ims.service';

@Component({
    selector: 'jhi-tipo-error-ims-update',
    templateUrl: './tipo-error-ims-update.component.html'
})
export class TipoErrorImsUpdateComponent implements OnInit {
    private _tipoError: ITipoErrorIms;
    isSaving: boolean;

    constructor(private tipoErrorService: TipoErrorImsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tipoError }) => {
            this.tipoError = tipoError;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tipoError.id !== undefined) {
            this.subscribeToSaveResponse(this.tipoErrorService.update(this.tipoError));
        } else {
            this.subscribeToSaveResponse(this.tipoErrorService.create(this.tipoError));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITipoErrorIms>>) {
        result.subscribe((res: HttpResponse<ITipoErrorIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get tipoError() {
        return this._tipoError;
    }

    set tipoError(tipoError: ITipoErrorIms) {
        this._tipoError = tipoError;
    }
}
