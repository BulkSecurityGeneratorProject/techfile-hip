import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPensionistaIms } from 'app/shared/model/pensionista-ims.model';
import { PensionistaImsService } from './pensionista-ims.service';
import { IPersonaIms } from 'app/shared/model/persona-ims.model';
import { PersonaImsService } from 'app/entities/persona-ims';
import { IPerceptorIms } from 'app/shared/model/perceptor-ims.model';
import { PerceptorImsService } from 'app/entities/perceptor-ims';
import { IRegimenProcedenciaIms } from 'app/shared/model/regimen-procedencia-ims.model';
import { RegimenProcedenciaImsService } from 'app/entities/regimen-procedencia-ims';
import { IPensionConcurrenteIms } from 'app/shared/model/pension-concurrente-ims.model';
import { PensionConcurrenteImsService } from 'app/entities/pension-concurrente-ims';
import { ITipoRelacionIms } from 'app/shared/model/tipo-relacion-ims.model';
import { TipoRelacionImsService } from 'app/entities/tipo-relacion-ims';
import { IFicheroIms } from 'app/shared/model/fichero-ims.model';
import { FicheroImsService } from 'app/entities/fichero-ims';
import { IDiscapacidadIms } from 'app/shared/model/discapacidad-ims.model';
import { DiscapacidadImsService } from 'app/entities/discapacidad-ims';
import { IDiagnosticoIms } from 'app/shared/model/diagnostico-ims.model';
import { DiagnosticoImsService } from 'app/entities/diagnostico-ims';
import { IEtiologiaIms } from 'app/shared/model/etiologia-ims.model';
import { EtiologiaImsService } from 'app/entities/etiologia-ims';

@Component({
    selector: 'jhi-pensionista-ims-update',
    templateUrl: './pensionista-ims-update.component.html'
})
export class PensionistaImsUpdateComponent implements OnInit {
    private _pensionista: IPensionistaIms;
    isSaving: boolean;

    personas: IPersonaIms[];

    perceptors: IPerceptorIms[];

    regimenprocedencias: IRegimenProcedenciaIms[];

    pensionconcurrentes: IPensionConcurrenteIms[];

    tiporelacions: ITipoRelacionIms[];

    ficheroes: IFicheroIms[];

    discapacidads: IDiscapacidadIms[];

    diagnosticos: IDiagnosticoIms[];

    etiologias: IEtiologiaIms[];
    fechaSolicitudPensionDp: any;
    fechaResolucionPensionDp: any;
    fechaAltaNominaDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private pensionistaService: PensionistaImsService,
        private personaService: PersonaImsService,
        private perceptorService: PerceptorImsService,
        private regimenProcedenciaService: RegimenProcedenciaImsService,
        private pensionConcurrenteService: PensionConcurrenteImsService,
        private tipoRelacionService: TipoRelacionImsService,
        private ficheroService: FicheroImsService,
        private discapacidadService: DiscapacidadImsService,
        private diagnosticoService: DiagnosticoImsService,
        private etiologiaService: EtiologiaImsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pensionista }) => {
            this.pensionista = pensionista;
        });
        this.personaService.query({ filter: 'pensionista-is-null' }).subscribe(
            (res: HttpResponse<IPersonaIms[]>) => {
                if (!this.pensionista.persona || !this.pensionista.persona.id) {
                    this.personas = res.body;
                } else {
                    this.personaService.find(this.pensionista.persona.id).subscribe(
                        (subRes: HttpResponse<IPersonaIms>) => {
                            this.personas = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.perceptorService.query({ filter: 'pensionista-is-null' }).subscribe(
            (res: HttpResponse<IPerceptorIms[]>) => {
                if (!this.pensionista.perceptor || !this.pensionista.perceptor.id) {
                    this.perceptors = res.body;
                } else {
                    this.perceptorService.find(this.pensionista.perceptor.id).subscribe(
                        (subRes: HttpResponse<IPerceptorIms>) => {
                            this.perceptors = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.regimenProcedenciaService.query().subscribe(
            (res: HttpResponse<IRegimenProcedenciaIms[]>) => {
                this.regimenprocedencias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.pensionConcurrenteService.query().subscribe(
            (res: HttpResponse<IPensionConcurrenteIms[]>) => {
                this.pensionconcurrentes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.tipoRelacionService.query().subscribe(
            (res: HttpResponse<ITipoRelacionIms[]>) => {
                this.tiporelacions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.ficheroService.query().subscribe(
            (res: HttpResponse<IFicheroIms[]>) => {
                this.ficheroes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.discapacidadService.query().subscribe(
            (res: HttpResponse<IDiscapacidadIms[]>) => {
                this.discapacidads = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.diagnosticoService.query().subscribe(
            (res: HttpResponse<IDiagnosticoIms[]>) => {
                this.diagnosticos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.etiologiaService.query().subscribe(
            (res: HttpResponse<IEtiologiaIms[]>) => {
                this.etiologias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.pensionista.id !== undefined) {
            this.subscribeToSaveResponse(this.pensionistaService.update(this.pensionista));
        } else {
            this.subscribeToSaveResponse(this.pensionistaService.create(this.pensionista));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPensionistaIms>>) {
        result.subscribe((res: HttpResponse<IPensionistaIms>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPerceptorById(index: number, item: IPerceptorIms) {
        return item.id;
    }

    trackRegimenProcedenciaById(index: number, item: IRegimenProcedenciaIms) {
        return item.id;
    }

    trackPensionConcurrenteById(index: number, item: IPensionConcurrenteIms) {
        return item.id;
    }

    trackTipoRelacionById(index: number, item: ITipoRelacionIms) {
        return item.id;
    }

    trackFicheroById(index: number, item: IFicheroIms) {
        return item.id;
    }

    trackDiscapacidadById(index: number, item: IDiscapacidadIms) {
        return item.id;
    }

    trackDiagnosticoById(index: number, item: IDiagnosticoIms) {
        return item.id;
    }

    trackEtiologiaById(index: number, item: IEtiologiaIms) {
        return item.id;
    }
    get pensionista() {
        return this._pensionista;
    }

    set pensionista(pensionista: IPensionistaIms) {
        this._pensionista = pensionista;
    }
}
