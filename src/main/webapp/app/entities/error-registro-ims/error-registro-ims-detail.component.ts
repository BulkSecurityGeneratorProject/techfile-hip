import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IErrorRegistroIms } from 'app/shared/model/error-registro-ims.model';

@Component({
    selector: 'jhi-error-registro-ims-detail',
    templateUrl: './error-registro-ims-detail.component.html'
})
export class ErrorRegistroImsDetailComponent implements OnInit {
    errorRegistro: IErrorRegistroIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ errorRegistro }) => {
            this.errorRegistro = errorRegistro;
        });
    }

    previousState() {
        window.history.back();
    }
}
