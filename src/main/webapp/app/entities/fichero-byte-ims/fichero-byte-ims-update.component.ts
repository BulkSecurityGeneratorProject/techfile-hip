import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { IFicheroByteIms } from 'app/shared/model/fichero-byte-ims.model';
import { FicheroByteImsService } from './fichero-byte-ims.service';

@Component({
    selector: 'jhi-fichero-byte-ims-update',
    templateUrl: './fichero-byte-ims-update.component.html'
})
export class FicheroByteImsUpdateComponent implements OnInit {
    private _ficheroByte: IFicheroByteIms;
    isSaving: boolean;

    constructor(
        private dataUtils: JhiDataUtils,
        private ficheroByteService: FicheroByteImsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ficheroByte }) => {
            this.ficheroByte = ficheroByte;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.ficheroByte.id !== undefined) {
            this.subscribeToSaveResponse(this.ficheroByteService.update(this.ficheroByte));
        } else {
            this.subscribeToSaveResponse(this.ficheroByteService.create(this.ficheroByte));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFicheroByteIms>>) {
        result.subscribe((res: HttpResponse<IFicheroByteIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get ficheroByte() {
        return this._ficheroByte;
    }

    set ficheroByte(ficheroByte: IFicheroByteIms) {
        this._ficheroByte = ficheroByte;
    }
}
