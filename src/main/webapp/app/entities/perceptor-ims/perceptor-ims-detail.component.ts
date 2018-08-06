import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPerceptorIms } from 'app/shared/model/perceptor-ims.model';

@Component({
    selector: 'jhi-perceptor-ims-detail',
    templateUrl: './perceptor-ims-detail.component.html'
})
export class PerceptorImsDetailComponent implements OnInit {
    perceptor: IPerceptorIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perceptor }) => {
            this.perceptor = perceptor;
        });
    }

    previousState() {
        window.history.back();
    }
}
