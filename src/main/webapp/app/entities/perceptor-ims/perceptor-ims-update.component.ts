import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPerceptorIms } from 'app/shared/model/perceptor-ims.model';
import { PerceptorImsService } from './perceptor-ims.service';
import { IPersonaIms } from 'app/shared/model/persona-ims.model';
import { PersonaImsService } from 'app/entities/persona-ims';
import { IPensionistaIms } from 'app/shared/model/pensionista-ims.model';
import { PensionistaImsService } from 'app/entities/pensionista-ims';

@Component({
    selector: 'jhi-perceptor-ims-update',
    templateUrl: './perceptor-ims-update.component.html'
})
export class PerceptorImsUpdateComponent implements OnInit {
    private _perceptor: IPerceptorIms;
    isSaving: boolean;

    personas: IPersonaIms[];

    pensionistas: IPensionistaIms[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private perceptorService: PerceptorImsService,
        private personaService: PersonaImsService,
        private pensionistaService: PensionistaImsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ perceptor }) => {
            this.perceptor = perceptor;
        });
        this.personaService.query({ filter: 'perceptor-is-null' }).subscribe(
            (res: HttpResponse<IPersonaIms[]>) => {
                if (!this.perceptor.persona || !this.perceptor.persona.id) {
                    this.personas = res.body;
                } else {
                    this.personaService.find(this.perceptor.persona.id).subscribe(
                        (subRes: HttpResponse<IPersonaIms>) => {
                            this.personas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.pensionistaService.query().subscribe(
            (res: HttpResponse<IPensionistaIms[]>) => {
                this.pensionistas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.perceptor.id !== undefined) {
            this.subscribeToSaveResponse(this.perceptorService.update(this.perceptor));
        } else {
            this.subscribeToSaveResponse(this.perceptorService.create(this.perceptor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPerceptorIms>>) {
        result.subscribe((res: HttpResponse<IPerceptorIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackPersonaById(index: number, item: IPersonaIms) {
        return item.id;
    }

    trackPensionistaById(index: number, item: IPensionistaIms) {
        return item.id;
    }
    get perceptor() {
        return this._perceptor;
    }

    set perceptor(perceptor: IPerceptorIms) {
        this._perceptor = perceptor;
    }
}
