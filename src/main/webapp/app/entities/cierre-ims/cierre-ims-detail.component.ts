import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICierreIms } from 'app/shared/model/cierre-ims.model';

@Component({
    selector: 'jhi-cierre-ims-detail',
    templateUrl: './cierre-ims-detail.component.html'
})
export class CierreImsDetailComponent implements OnInit {
    cierre: ICierreIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cierre }) => {
            this.cierre = cierre;
        });
    }

    previousState() {
        window.history.back();
    }
}
