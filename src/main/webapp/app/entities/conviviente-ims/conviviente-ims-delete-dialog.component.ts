import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConvivienteIms } from 'app/shared/model/conviviente-ims.model';
import { ConvivienteImsService } from './conviviente-ims.service';

@Component({
    selector: 'jhi-conviviente-ims-delete-dialog',
    templateUrl: './conviviente-ims-delete-dialog.component.html'
})
export class ConvivienteImsDeleteDialogComponent {
    conviviente: IConvivienteIms;

    constructor(
        private convivienteService: ConvivienteImsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.convivienteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'convivienteListModification',
                content: 'Deleted an conviviente'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-conviviente-ims-delete-popup',
    template: ''
})
export class ConvivienteImsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ conviviente }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ConvivienteImsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.conviviente = conviviente;
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
