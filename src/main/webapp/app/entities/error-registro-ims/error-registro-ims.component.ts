import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IErrorRegistroIms } from 'app/shared/model/error-registro-ims.model';
import { Principal } from 'app/core';
import { ErrorRegistroImsService } from './error-registro-ims.service';

@Component({
    selector: 'jhi-error-registro-ims',
    templateUrl: './error-registro-ims.component.html'
})
export class ErrorRegistroImsComponent implements OnInit, OnDestroy {
    errorRegistros: IErrorRegistroIms[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private errorRegistroService: ErrorRegistroImsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.errorRegistroService.query().subscribe(
            (res: HttpResponse<IErrorRegistroIms[]>) => {
                this.errorRegistros = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInErrorRegistros();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IErrorRegistroIms) {
        return item.id;
    }

    registerChangeInErrorRegistros() {
        this.eventSubscriber = this.eventManager.subscribe('errorRegistroListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
