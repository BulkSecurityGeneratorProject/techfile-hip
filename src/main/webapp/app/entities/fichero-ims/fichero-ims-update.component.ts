import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFicheroIms } from 'app/shared/model/fichero-ims.model';
import { FicheroImsService } from './fichero-ims.service';
import { IFicheroByteIms } from 'app/shared/model/fichero-byte-ims.model';
import { FicheroByteImsService } from 'app/entities/fichero-byte-ims';
import { IAutonomiaIms } from 'app/shared/model/autonomia-ims.model';
import { AutonomiaImsService } from 'app/entities/autonomia-ims';
import { IProvinciaIms } from 'app/shared/model/provincia-ims.model';
import { ProvinciaImsService } from 'app/entities/provincia-ims';
import { IMesIms } from 'app/shared/model/mes-ims.model';
import { MesImsService } from 'app/entities/mes-ims';

@Component({
    selector: 'jhi-fichero-ims-update',
    templateUrl: './fichero-ims-update.component.html'
})
export class FicheroImsUpdateComponent implements OnInit {
    private _fichero: IFicheroIms;
    isSaving: boolean;

    ficherobytes: IFicheroByteIms[];

    autonomias: IAutonomiaIms[];

    provincias: IProvinciaIms[];

    mes: IMesIms[];
    fechaCreacionOrigenDp: any;
    fechaAltaAplicacionDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private ficheroService: FicheroImsService,
        private ficheroByteService: FicheroByteImsService,
        private autonomiaService: AutonomiaImsService,
        private provinciaService: ProvinciaImsService,
        private mesService: MesImsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fichero }) => {
            this.fichero = fichero;
        });
        this.ficheroByteService.query({ filter: 'fichero-is-null' }).subscribe(
            (res: HttpResponse<IFicheroByteIms[]>) => {
                if (!this.fichero.ficheroByte || !this.fichero.ficheroByte.id) {
                    this.ficherobytes = res.body;
                } else {
                    this.ficheroByteService.find(this.fichero.ficheroByte.id).subscribe(
                        (subRes: HttpResponse<IFicheroByteIms>) => {
                            this.ficherobytes = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.autonomiaService.query().subscribe(
            (res: HttpResponse<IAutonomiaIms[]>) => {
                this.autonomias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.provinciaService.query().subscribe(
            (res: HttpResponse<IProvinciaIms[]>) => {
                this.provincias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.mesService.query().subscribe(
            (res: HttpResponse<IMesIms[]>) => {
                this.mes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.fichero.id !== undefined) {
            this.subscribeToSaveResponse(this.ficheroService.update(this.fichero));
        } else {
            this.subscribeToSaveResponse(this.ficheroService.create(this.fichero));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFicheroIms>>) {
        result.subscribe((res: HttpResponse<IFicheroIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFicheroByteById(index: number, item: IFicheroByteIms) {
        return item.id;
    }

    trackAutonomiaById(index: number, item: IAutonomiaIms) {
        return item.id;
    }

    trackProvinciaById(index: number, item: IProvinciaIms) {
        return item.id;
    }

    trackMesById(index: number, item: IMesIms) {
        return item.id;
    }
    get fichero() {
        return this._fichero;
    }

    set fichero(fichero: IFicheroIms) {
        this._fichero = fichero;
    }
}
