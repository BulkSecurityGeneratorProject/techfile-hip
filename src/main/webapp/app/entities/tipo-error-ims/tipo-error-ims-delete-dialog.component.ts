import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoErrorIms } from 'app/shared/model/tipo-error-ims.model';
import { TipoErrorImsService } from './tipo-error-ims.service';

@Component({
    selector: 'jhi-tipo-error-ims-delete-dialog',
    templateUrl: './tipo-error-ims-delete-dialog.component.html'
})
export class TipoErrorImsDeleteDialogComponent {
    tipoError: ITipoErrorIms;

    constructor(private tipoErrorService: TipoErrorImsService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoErrorService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tipoErrorListModification',
                content: 'Deleted an tipoError'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-error-ims-delete-popup',
    template: ''
})
export class TipoErrorImsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoError }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TipoErrorImsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.tipoError = tipoError;
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
