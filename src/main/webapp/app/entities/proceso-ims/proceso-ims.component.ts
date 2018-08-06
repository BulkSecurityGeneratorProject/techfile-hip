import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProcesoIms } from 'app/shared/model/proceso-ims.model';
import { Principal } from 'app/core';
import { ProcesoImsService } from './proceso-ims.service';

@Component({
    selector: 'jhi-proceso-ims',
    templateUrl: './proceso-ims.component.html'
})
export class ProcesoImsComponent implements OnInit, OnDestroy {
    procesos: IProcesoIms[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private procesoService: ProcesoImsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.procesoService.query().subscribe(
            (res: HttpResponse<IProcesoIms[]>) => {
                this.procesos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProcesos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProcesoIms) {
        return item.id;
    }

    registerChangeInProcesos() {
        this.eventSubscriber = this.eventManager.subscribe('procesoListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
