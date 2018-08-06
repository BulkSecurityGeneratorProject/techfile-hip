import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IConvivienteIms } from 'app/shared/model/conviviente-ims.model';
import { ConvivienteImsService } from './conviviente-ims.service';
import { IPensionistaIms } from 'app/shared/model/pensionista-ims.model';
import { PensionistaImsService } from 'app/entities/pensionista-ims';

@Component({
    selector: 'jhi-conviviente-ims-update',
    templateUrl: './conviviente-ims-update.component.html'
})
export class ConvivienteImsUpdateComponent implements OnInit {
    private _conviviente: IConvivienteIms;
    isSaving: boolean;

    pensionistas: IPensionistaIms[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private convivienteService: ConvivienteImsService,
        private pensionistaService: PensionistaImsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ conviviente }) => {
            this.conviviente = conviviente;
        });
        this.pensionistaService.query().subscribe(
            (res: HttpResponse<IPensionistaIms[]>) => {
                this.pensionistas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.conviviente.id !== undefined) {
            this.subscribeToSaveResponse(this.convivienteService.update(this.conviviente));
        } else {
            this.subscribeToSaveResponse(this.convivienteService.create(this.conviviente));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IConvivienteIms>>) {
        result.subscribe((res: HttpResponse<IConvivienteIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPensionistaById(index: number, item: IPensionistaIms) {
        return item.id;
    }
    get conviviente() {
        return this._conviviente;
    }

    set conviviente(conviviente: IConvivienteIms) {
        this._conviviente = conviviente;
    }
}
