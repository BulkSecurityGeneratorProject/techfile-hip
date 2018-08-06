import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProcesoIms } from 'app/shared/model/proceso-ims.model';

@Component({
    selector: 'jhi-proceso-ims-detail',
    templateUrl: './proceso-ims-detail.component.html'
})
export class ProcesoImsDetailComponent implements OnInit {
    proceso: IProcesoIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ proceso }) => {
            this.proceso = proceso;
        });
    }

    previousState() {
        window.history.back();
    }
}
