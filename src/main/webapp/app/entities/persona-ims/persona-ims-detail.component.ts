import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPersonaIms } from 'app/shared/model/persona-ims.model';

@Component({
    selector: 'jhi-persona-ims-detail',
    templateUrl: './persona-ims-detail.component.html'
})
export class PersonaImsDetailComponent implements OnInit {
    persona: IPersonaIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ persona }) => {
            this.persona = persona;
        });
    }

    previousState() {
        window.history.back();
    }
}
