import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEtiologiaIms } from 'app/shared/model/etiologia-ims.model';

@Component({
    selector: 'jhi-etiologia-ims-detail',
    templateUrl: './etiologia-ims-detail.component.html'
})
export class EtiologiaImsDetailComponent implements OnInit {
    etiologia: IEtiologiaIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ etiologia }) => {
            this.etiologia = etiologia;
        });
    }

    previousState() {
        window.history.back();
    }
}
