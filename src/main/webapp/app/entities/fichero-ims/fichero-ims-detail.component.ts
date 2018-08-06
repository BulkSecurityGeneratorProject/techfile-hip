import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFicheroIms } from 'app/shared/model/fichero-ims.model';

@Component({
    selector: 'jhi-fichero-ims-detail',
    templateUrl: './fichero-ims-detail.component.html'
})
export class FicheroImsDetailComponent implements OnInit {
    fichero: IFicheroIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fichero }) => {
            this.fichero = fichero;
        });
    }

    previousState() {
        window.history.back();
    }
}
