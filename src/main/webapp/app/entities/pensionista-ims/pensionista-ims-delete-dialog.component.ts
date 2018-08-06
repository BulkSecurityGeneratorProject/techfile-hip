import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPensionistaIms } from 'app/shared/model/pensionista-ims.model';
import { PensionistaImsService } from './pensionista-ims.service';

@Component({
    selector: 'jhi-pensionista-ims-delete-dialog',
    templateUrl: './pensionista-ims-delete-dialog.component.html'
})
export class PensionistaImsDeleteDialogComponent {
    pensionista: IPensionistaIms;

    constructor(
        private pensionistaService: PensionistaImsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pensionistaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'pensionistaListModification',
                content: 'Deleted an pensionista'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pensionista-ims-delete-popup',
    template: ''
})
export class PensionistaImsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pensionista }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PensionistaImsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.pensionista = pensionista;
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
