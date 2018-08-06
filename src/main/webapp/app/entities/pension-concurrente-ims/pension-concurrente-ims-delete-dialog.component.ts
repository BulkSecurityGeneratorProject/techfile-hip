import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPensionConcurrenteIms } from 'app/shared/model/pension-concurrente-ims.model';
import { PensionConcurrenteImsService } from './pension-concurrente-ims.service';

@Component({
    selector: 'jhi-pension-concurrente-ims-delete-dialog',
    templateUrl: './pension-concurrente-ims-delete-dialog.component.html'
})
export class PensionConcurrenteImsDeleteDialogComponent {
    pensionConcurrente: IPensionConcurrenteIms;

    constructor(
        private pensionConcurrenteService: PensionConcurrenteImsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pensionConcurrenteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'pensionConcurrenteListModification',
                content: 'Deleted an pensionConcurrente'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pension-concurrente-ims-delete-popup',
    template: ''
})
export class PensionConcurrenteImsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pensionConcurrente }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PensionConcurrenteImsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.pensionConcurrente = pensionConcurrente;
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
