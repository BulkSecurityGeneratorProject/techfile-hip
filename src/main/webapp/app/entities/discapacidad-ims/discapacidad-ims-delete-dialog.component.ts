import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiscapacidadIms } from 'app/shared/model/discapacidad-ims.model';
import { DiscapacidadImsService } from './discapacidad-ims.service';

@Component({
    selector: 'jhi-discapacidad-ims-delete-dialog',
    templateUrl: './discapacidad-ims-delete-dialog.component.html'
})
export class DiscapacidadImsDeleteDialogComponent {
    discapacidad: IDiscapacidadIms;

    constructor(
        private discapacidadService: DiscapacidadImsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.discapacidadService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'discapacidadListModification',
                content: 'Deleted an discapacidad'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-discapacidad-ims-delete-popup',
    template: ''
})
export class DiscapacidadImsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ discapacidad }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DiscapacidadImsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.discapacidad = discapacidad;
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
