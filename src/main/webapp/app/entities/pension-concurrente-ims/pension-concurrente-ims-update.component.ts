import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPensionConcurrenteIms } from 'app/shared/model/pension-concurrente-ims.model';
import { PensionConcurrenteImsService } from './pension-concurrente-ims.service';

@Component({
    selector: 'jhi-pension-concurrente-ims-update',
    templateUrl: './pension-concurrente-ims-update.component.html'
})
export class PensionConcurrenteImsUpdateComponent implements OnInit {
    private _pensionConcurrente: IPensionConcurrenteIms;
    isSaving: boolean;

    constructor(private pensionConcurrenteService: PensionConcurrenteImsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pensionConcurrente }) => {
            this.pensionConcurrente = pensionConcurrente;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.pensionConcurrente.id !== undefined) {
            this.subscribeToSaveResponse(this.pensionConcurrenteService.update(this.pensionConcurrente));
        } else {
            this.subscribeToSaveResponse(this.pensionConcurrenteService.create(this.pensionConcurrente));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPensionConcurrenteIms>>) {
        result.subscribe(
            (res: HttpResponse<IPensionConcurrenteIms>) => this.onSaveSuccess(),
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
    get pensionConcurrente() {
        return this._pensionConcurrente;
    }

    set pensionConcurrente(pensionConcurrente: IPensionConcurrenteIms) {
        this._pensionConcurrente = pensionConcurrente;
    }
}
