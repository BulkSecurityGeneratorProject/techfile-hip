import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConvivienteIms } from 'app/shared/model/conviviente-ims.model';

@Component({
    selector: 'jhi-conviviente-ims-detail',
    templateUrl: './conviviente-ims-detail.component.html'
})
export class ConvivienteImsDetailComponent implements OnInit {
    conviviente: IConvivienteIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ conviviente }) => {
            this.conviviente = conviviente;
        });
    }

    previousState() {
        window.history.back();
    }
}
