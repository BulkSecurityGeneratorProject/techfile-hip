import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDiagnosticoIms } from 'app/shared/model/diagnostico-ims.model';
import { DiagnosticoImsService } from './diagnostico-ims.service';

@Component({
    selector: 'jhi-diagnostico-ims-update',
    templateUrl: './diagnostico-ims-update.component.html'
})
export class DiagnosticoImsUpdateComponent implements OnInit {
    private _diagnostico: IDiagnosticoIms;
    isSaving: boolean;

    constructor(private diagnosticoService: DiagnosticoImsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ diagnostico }) => {
            this.diagnostico = diagnostico;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.diagnostico.id !== undefined) {
            this.subscribeToSaveResponse(this.diagnosticoService.update(this.diagnostico));
        } else {
            this.subscribeToSaveResponse(this.diagnosticoService.create(this.diagnostico));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDiagnosticoIms>>) {
        result.subscribe((res: HttpResponse<IDiagnosticoIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get diagnostico() {
        return this._diagnostico;
    }

    set diagnostico(diagnostico: IDiagnosticoIms) {
        this._diagnostico = diagnostico;
    }
}
