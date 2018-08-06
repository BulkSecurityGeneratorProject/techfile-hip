import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IFicheroByteIms } from 'app/shared/model/fichero-byte-ims.model';

@Component({
    selector: 'jhi-fichero-byte-ims-detail',
    templateUrl: './fichero-byte-ims-detail.component.html'
})
export class FicheroByteImsDetailComponent implements OnInit {
    ficheroByte: IFicheroByteIms;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
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
    previousState() {
        window.history.back();
    }
}
