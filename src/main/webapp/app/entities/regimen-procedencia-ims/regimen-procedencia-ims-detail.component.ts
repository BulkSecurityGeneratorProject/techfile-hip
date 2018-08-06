import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRegimenProcedenciaIms } from 'app/shared/model/regimen-procedencia-ims.model';

@Component({
    selector: 'jhi-regimen-procedencia-ims-detail',
    templateUrl: './regimen-procedencia-ims-detail.component.html'
})
export class RegimenProcedenciaImsDetailComponent implements OnInit {
    regimenProcedencia: IRegimenProcedenciaIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ regimenProcedencia }) => {
            this.regimenProcedencia = regimenProcedencia;
        });
    }

    previousState() {
        window.history.back();
    }
}
