import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICierreIms } from 'app/shared/model/cierre-ims.model';
import { CierreImsService } from './cierre-ims.service';
import { IMesIms } from 'app/shared/model/mes-ims.model';
import { MesImsService } from 'app/entities/mes-ims';

@Component({
    selector: 'jhi-cierre-ims-update',
    templateUrl: './cierre-ims-update.component.html'
})
export class CierreImsUpdateComponent implements OnInit {
    private _cierre: ICierreIms;
    isSaving: boolean;

    mescerrados: IMesIms[];

    mesabiertos: IMesIms[];
    fechaCierreDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private cierreService: CierreImsService,
        private mesService: MesImsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cierre }) => {
            this.cierre = cierre;
        });
        this.mesService.query({ filter: 'cierre-is-null' }).subscribe(
            (res: HttpResponse<IMesIms[]>) => {
                if (!this.cierre.mesCerrado || !this.cierre.mesCerrado.id) {
                    this.mescerrados = res.body;
                } else {
                    this.mesService.find(this.cierre.mesCerrado.id).subscribe(
                        (subRes: HttpResponse<IMesIms>) => {
                            this.mescerrados = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.mesService.query({ filter: 'cierre-is-null' }).subscribe(
            (res: HttpResponse<IMesIms[]>) => {
                if (!this.cierre.mesAbierto || !this.cierre.mesAbierto.id) {
                    this.mesabiertos = res.body;
                } else {
                    this.mesService.find(this.cierre.mesAbierto.id).subscribe(
                        (subRes: HttpResponse<IMesIms>) => {
                            this.mesabiertos = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cierre.id !== undefined) {
            this.subscribeToSaveResponse(this.cierreService.update(this.cierre));
        } else {
            this.subscribeToSaveResponse(this.cierreService.create(this.cierre));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICierreIms>>) {
        result.subscribe((res: HttpResponse<ICierreIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMesById(index: number, item: IMesIms) {
        return item.id;
    }
    get cierre() {
        return this._cierre;
    }

    set cierre(cierre: ICierreIms) {
        this._cierre = cierre;
    }
}
