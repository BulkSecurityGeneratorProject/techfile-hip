import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiscapacidadIms } from 'app/shared/model/discapacidad-ims.model';

@Component({
    selector: 'jhi-discapacidad-ims-detail',
    templateUrl: './discapacidad-ims-detail.component.html'
})
export class DiscapacidadImsDetailComponent implements OnInit {
    discapacidad: IDiscapacidadIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ discapacidad }) => {
            this.discapacidad = discapacidad;
        });
    }

    previousState() {
        window.history.back();
    }
}
