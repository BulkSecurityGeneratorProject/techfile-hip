import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAutonomiaIms } from 'app/shared/model/autonomia-ims.model';

@Component({
    selector: 'jhi-autonomia-ims-detail',
    templateUrl: './autonomia-ims-detail.component.html'
})
export class AutonomiaImsDetailComponent implements OnInit {
    autonomia: IAutonomiaIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ autonomia }) => {
            this.autonomia = autonomia;
        });
    }

    previousState() {
        window.history.back();
    }
}
