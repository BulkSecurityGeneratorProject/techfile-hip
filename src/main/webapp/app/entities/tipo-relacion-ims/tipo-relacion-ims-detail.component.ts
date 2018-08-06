import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoRelacionIms } from 'app/shared/model/tipo-relacion-ims.model';

@Component({
    selector: 'jhi-tipo-relacion-ims-detail',
    templateUrl: './tipo-relacion-ims-detail.component.html'
})
export class TipoRelacionImsDetailComponent implements OnInit {
    tipoRelacion: ITipoRelacionIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoRelacion }) => {
            this.tipoRelacion = tipoRelacion;
        });
    }

    previousState() {
        window.history.back();
    }
}
