import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPensionConcurrenteIms } from 'app/shared/model/pension-concurrente-ims.model';

@Component({
    selector: 'jhi-pension-concurrente-ims-detail',
    templateUrl: './pension-concurrente-ims-detail.component.html'
})
export class PensionConcurrenteImsDetailComponent implements OnInit {
    pensionConcurrente: IPensionConcurrenteIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pensionConcurrente }) => {
            this.pensionConcurrente = pensionConcurrente;
        });
    }

    previousState() {
        window.history.back();
    }
}
