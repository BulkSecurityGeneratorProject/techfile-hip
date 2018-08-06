import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoErrorIms } from 'app/shared/model/tipo-error-ims.model';

@Component({
    selector: 'jhi-tipo-error-ims-detail',
    templateUrl: './tipo-error-ims-detail.component.html'
})
export class TipoErrorImsDetailComponent implements OnInit {
    tipoError: ITipoErrorIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoError }) => {
            this.tipoError = tipoError;
        });
    }

    previousState() {
        window.history.back();
    }
}
