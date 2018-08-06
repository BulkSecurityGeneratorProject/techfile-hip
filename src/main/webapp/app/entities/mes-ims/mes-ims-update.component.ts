import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IMesIms } from 'app/shared/model/mes-ims.model';
import { MesImsService } from './mes-ims.service';

@Component({
    selector: 'jhi-mes-ims-update',
    templateUrl: './mes-ims-update.component.html'
})
export class MesImsUpdateComponent implements OnInit {
    private _mes: IMesIms;
    isSaving: boolean;

    constructor(private mesService: MesImsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ mes }) => {
            this.mes = mes;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.mes.id !== undefined) {
            this.subscribeToSaveResponse(this.mesService.update(this.mes));
        } else {
            this.subscribeToSaveResponse(this.mesService.create(this.mes));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMesIms>>) {
        result.subscribe((res: HttpResponse<IMesIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get mes() {
        return this._mes;
    }

    set mes(mes: IMesIms) {
        this._mes = mes;
    }
}
