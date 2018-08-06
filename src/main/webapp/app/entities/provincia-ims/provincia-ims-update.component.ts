import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IProvinciaIms } from 'app/shared/model/provincia-ims.model';
import { ProvinciaImsService } from './provincia-ims.service';
import { IAutonomiaIms } from 'app/shared/model/autonomia-ims.model';
import { AutonomiaImsService } from 'app/entities/autonomia-ims';

@Component({
    selector: 'jhi-provincia-ims-update',
    templateUrl: './provincia-ims-update.component.html'
})
export class ProvinciaImsUpdateComponent implements OnInit {
    private _provincia: IProvinciaIms;
    isSaving: boolean;

    autonomias: IAutonomiaIms[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private provinciaService: ProvinciaImsService,
        private autonomiaService: AutonomiaImsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ provincia }) => {
            this.provincia = provincia;
        });
        this.autonomiaService.query().subscribe(
            (res: HttpResponse<IAutonomiaIms[]>) => {
                this.autonomias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.provincia.id !== undefined) {
            this.subscribeToSaveResponse(this.provinciaService.update(this.provincia));
        } else {
            this.subscribeToSaveResponse(this.provinciaService.create(this.provincia));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProvinciaIms>>) {
        result.subscribe((res: HttpResponse<IProvinciaIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAutonomiaById(index: number, item: IAutonomiaIms) {
        return item.id;
    }
    get provincia() {
        return this._provincia;
    }

    set provincia(provincia: IProvinciaIms) {
        this._provincia = provincia;
    }
}
