import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProvinciaIms } from 'app/shared/model/provincia-ims.model';

@Component({
    selector: 'jhi-provincia-ims-detail',
    templateUrl: './provincia-ims-detail.component.html'
})
export class ProvinciaImsDetailComponent implements OnInit {
    provincia: IProvinciaIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ provincia }) => {
            this.provincia = provincia;
        });
    }

    previousState() {
        window.history.back();
    }
}
