import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPersonaIms } from 'app/shared/model/persona-ims.model';
import { PersonaImsService } from './persona-ims.service';

@Component({
    selector: 'jhi-persona-ims-update',
    templateUrl: './persona-ims-update.component.html'
})
export class PersonaImsUpdateComponent implements OnInit {
    private _persona: IPersonaIms;
    isSaving: boolean;
    fechaNacimientoDp: any;

    constructor(private personaService: PersonaImsService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ persona }) => {
            this.persona = persona;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.persona.id !== undefined) {
            this.subscribeToSaveResponse(this.personaService.update(this.persona));
        } else {
            this.subscribeToSaveResponse(this.personaService.create(this.persona));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPersonaIms>>) {
        result.subscribe((res: HttpResponse<IPersonaIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get persona() {
        return this._persona;
    }

    set persona(persona: IPersonaIms) {
        this._persona = persona;
    }
}
