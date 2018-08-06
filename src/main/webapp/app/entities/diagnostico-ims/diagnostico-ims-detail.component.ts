import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiagnosticoIms } from 'app/shared/model/diagnostico-ims.model';

@Component({
    selector: 'jhi-diagnostico-ims-detail',
    templateUrl: './diagnostico-ims-detail.component.html'
})
export class DiagnosticoImsDetailComponent implements OnInit {
    diagnostico: IDiagnosticoIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ diagnostico }) => {
            this.diagnostico = diagnostico;
        });
    }

    previousState() {
        window.history.back();
    }
}
