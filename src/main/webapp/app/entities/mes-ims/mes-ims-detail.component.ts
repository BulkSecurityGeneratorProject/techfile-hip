import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMesIms } from 'app/shared/model/mes-ims.model';

@Component({
    selector: 'jhi-mes-ims-detail',
    templateUrl: './mes-ims-detail.component.html'
})
export class MesImsDetailComponent implements OnInit {
    mes: IMesIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ mes }) => {
            this.mes = mes;
        });
    }

    previousState() {
        window.history.back();
    }
}
