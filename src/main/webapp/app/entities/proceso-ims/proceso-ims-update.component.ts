import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IProcesoIms } from 'app/shared/model/proceso-ims.model';
import { ProcesoImsService } from './proceso-ims.service';
import { IFicheroIms } from 'app/shared/model/fichero-ims.model';
import { FicheroImsService } from 'app/entities/fichero-ims';

@Component({
    selector: 'jhi-proceso-ims-update',
    templateUrl: './proceso-ims-update.component.html'
})
export class ProcesoImsUpdateComponent implements OnInit {
    private _proceso: IProcesoIms;
    isSaving: boolean;

    ficheroes: IFicheroIms[];
    fechaDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private procesoService: ProcesoImsService,
        private ficheroService: FicheroImsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ proceso }) => {
            this.proceso = proceso;
        });
        this.ficheroService.query().subscribe(
            (res: HttpResponse<IFicheroIms[]>) => {
                this.ficheroes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.proceso.id !== undefined) {
            this.subscribeToSaveResponse(this.procesoService.update(this.proceso));
        } else {
            this.subscribeToSaveResponse(this.procesoService.create(this.proceso));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProcesoIms>>) {
        result.subscribe((res: HttpResponse<IProcesoIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFicheroById(index: number, item: IFicheroIms) {
        return item.id;
    }
    get proceso() {
        return this._proceso;
    }

    set proceso(proceso: IProcesoIms) {
        this._proceso = proceso;
    }
}
