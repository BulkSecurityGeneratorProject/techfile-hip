import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProvinciaIms } from 'app/shared/model/provincia-ims.model';
import { ProvinciaImsService } from './provincia-ims.service';

@Component({
    selector: 'jhi-provincia-ims-delete-dialog',
    templateUrl: './provincia-ims-delete-dialog.component.html'
})
export class ProvinciaImsDeleteDialogComponent {
    provincia: IProvinciaIms;

    constructor(private provinciaService: ProvinciaImsService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.provinciaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'provinciaListModification',
                content: 'Deleted an provincia'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-provincia-ims-delete-popup',
    template: ''
})
export class ProvinciaImsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ provincia }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProvinciaImsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.provincia = provincia;
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
