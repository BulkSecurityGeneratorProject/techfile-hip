import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAutonomiaIms } from 'app/shared/model/autonomia-ims.model';
import { AutonomiaImsService } from './autonomia-ims.service';

@Component({
    selector: 'jhi-autonomia-ims-delete-dialog',
    templateUrl: './autonomia-ims-delete-dialog.component.html'
})
export class AutonomiaImsDeleteDialogComponent {
    autonomia: IAutonomiaIms;

    constructor(private autonomiaService: AutonomiaImsService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.autonomiaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'autonomiaListModification',
                content: 'Deleted an autonomia'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-autonomia-ims-delete-popup',
    template: ''
})
export class AutonomiaImsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ autonomia }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AutonomiaImsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.autonomia = autonomia;
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
