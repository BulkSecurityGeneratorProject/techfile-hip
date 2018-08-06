import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProcesoIms } from 'app/shared/model/proceso-ims.model';
import { ProcesoImsService } from './proceso-ims.service';

@Component({
    selector: 'jhi-proceso-ims-delete-dialog',
    templateUrl: './proceso-ims-delete-dialog.component.html'
})
export class ProcesoImsDeleteDialogComponent {
    proceso: IProcesoIms;

    constructor(private procesoService: ProcesoImsService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.procesoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'procesoListModification',
                content: 'Deleted an proceso'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-proceso-ims-delete-popup',
    template: ''
})
export class ProcesoImsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ proceso }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProcesoImsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.proceso = proceso;
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
