import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IErrorRegistroIms } from 'app/shared/model/error-registro-ims.model';
import { ErrorRegistroImsService } from './error-registro-ims.service';
import { ITipoErrorIms } from 'app/shared/model/tipo-error-ims.model';
import { TipoErrorImsService } from 'app/entities/tipo-error-ims';
import { IProcesoIms } from 'app/shared/model/proceso-ims.model';
import { ProcesoImsService } from 'app/entities/proceso-ims';

@Component({
    selector: 'jhi-error-registro-ims-update',
    templateUrl: './error-registro-ims-update.component.html'
})
export class ErrorRegistroImsUpdateComponent implements OnInit {
    private _errorRegistro: IErrorRegistroIms;
    isSaving: boolean;

    tipoerrors: ITipoErrorIms[];

    procesos: IProcesoIms[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private errorRegistroService: ErrorRegistroImsService,
        private tipoErrorService: TipoErrorImsService,
        private procesoService: ProcesoImsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ errorRegistro }) => {
            this.errorRegistro = errorRegistro;
        });
        this.tipoErrorService.query().subscribe(
            (res: HttpResponse<ITipoErrorIms[]>) => {
                this.tipoerrors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.procesoService.query().subscribe(
            (res: HttpResponse<IProcesoIms[]>) => {
                this.procesos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.errorRegistro.id !== undefined) {
            this.subscribeToSaveResponse(this.errorRegistroService.update(this.errorRegistro));
        } else {
            this.subscribeToSaveResponse(this.errorRegistroService.create(this.errorRegistro));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IErrorRegistroIms>>) {
        result.subscribe((res: HttpResponse<IErrorRegistroIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTipoErrorById(index: number, item: ITipoErrorIms) {
        return item.id;
    }

    trackProcesoById(index: number, item: IProcesoIms) {
        return item.id;
    }
    get errorRegistro() {
        return this._errorRegistro;
    }

    set errorRegistro(errorRegistro: IErrorRegistroIms) {
        this._errorRegistro = errorRegistro;
    }
}
