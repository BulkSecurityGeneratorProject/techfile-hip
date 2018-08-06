import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDiscapacidadIms } from 'app/shared/model/discapacidad-ims.model';
import { DiscapacidadImsService } from './discapacidad-ims.service';

@Component({
    selector: 'jhi-discapacidad-ims-update',
    templateUrl: './discapacidad-ims-update.component.html'
})
export class DiscapacidadImsUpdateComponent implements OnInit {
    private _discapacidad: IDiscapacidadIms;
    isSaving: boolean;

    constructor(private discapacidadService: DiscapacidadImsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ discapacidad }) => {
            this.discapacidad = discapacidad;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.discapacidad.id !== undefined) {
            this.subscribeToSaveResponse(this.discapacidadService.update(this.discapacidad));
        } else {
            this.subscribeToSaveResponse(this.discapacidadService.create(this.discapacidad));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDiscapacidadIms>>) {
        result.subscribe((res: HttpResponse<IDiscapacidadIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get discapacidad() {
        return this._discapacidad;
    }

    set discapacidad(discapacidad: IDiscapacidadIms) {
        this._discapacidad = discapacidad;
    }
}
