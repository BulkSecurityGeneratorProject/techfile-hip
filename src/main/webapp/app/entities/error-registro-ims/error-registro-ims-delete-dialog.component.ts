import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IErrorRegistroIms } from 'app/shared/model/error-registro-ims.model';
import { ErrorRegistroImsService } from './error-registro-ims.service';

@Component({
    selector: 'jhi-error-registro-ims-delete-dialog',
    templateUrl: './error-registro-ims-delete-dialog.component.html'
})
export class ErrorRegistroImsDeleteDialogComponent {
    errorRegistro: IErrorRegistroIms;

    constructor(
        private errorRegistroService: ErrorRegistroImsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.errorRegistroService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'errorRegistroListModification',
                content: 'Deleted an errorRegistro'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-error-registro-ims-delete-popup',
    template: ''
})
export class ErrorRegistroImsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ errorRegistro }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ErrorRegistroImsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.errorRegistro = errorRegistro;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
