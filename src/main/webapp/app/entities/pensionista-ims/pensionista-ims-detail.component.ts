import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPensionistaIms } from 'app/shared/model/pensionista-ims.model';

@Component({
    selector: 'jhi-pensionista-ims-detail',
    templateUrl: './pensionista-ims-detail.component.html'
})
export class PensionistaImsDetailComponent implements OnInit {
    pensionista: IPensionistaIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pensionista }) => {
            this.pensionista = pensionista;
        });
    }

    previousState() {
        window.history.back();
    }
}
