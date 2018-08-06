import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEtiologiaIms } from 'app/shared/model/etiologia-ims.model';
import { EtiologiaImsService } from './etiologia-ims.service';

@Component({
    selector: 'jhi-etiologia-ims-update',
    templateUrl: './etiologia-ims-update.component.html'
})
export class EtiologiaImsUpdateComponent implements OnInit {
    private _etiologia: IEtiologiaIms;
    isSaving: boolean;

    constructor(private etiologiaService: EtiologiaImsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ etiologia }) => {
            this.etiologia = etiologia;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.etiologia.id !== undefined) {
            this.subscribeToSaveResponse(this.etiologiaService.update(this.etiologia));
        } else {
            this.subscribeToSaveResponse(this.etiologiaService.create(this.etiologia));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEtiologiaIms>>) {
        result.subscribe((res: HttpResponse<IEtiologiaIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get etiologia() {
        return this._etiologia;
    }

    set etiologia(etiologia: IEtiologiaIms) {
        this._etiologia = etiologia;
    }
}
