import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPerceptorIms } from 'app/shared/model/perceptor-ims.model';
import { PerceptorImsService } from './perceptor-ims.service';

@Component({
    selector: 'jhi-perceptor-ims-delete-dialog',
    templateUrl: './perceptor-ims-delete-dialog.component.html'
})
export class PerceptorImsDeleteDialogComponent {
    perceptor: IPerceptorIms;

    constructor(private perceptorService: PerceptorImsService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.perceptorService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'perceptorListModification',
                content: 'Deleted an perceptor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-perceptor-ims-delete-popup',
    template: ''
})
export class PerceptorImsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ perceptor }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PerceptorImsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.perceptor = perceptor;
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
