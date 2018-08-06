import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICierreIms } from 'app/shared/model/cierre-ims.model';
import { CierreImsService } from './cierre-ims.service';

@Component({
    selector: 'jhi-cierre-ims-delete-dialog',
    templateUrl: './cierre-ims-delete-dialog.component.html'
})
export class CierreImsDeleteDialogComponent {
    cierre: ICierreIms;

    constructor(private cierreService: CierreImsService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cierreService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'cierreListModification',
                content: 'Deleted an cierre'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cierre-ims-delete-popup',
    template: ''
})
export class CierreImsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cierre }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CierreImsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.cierre = cierre;
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
