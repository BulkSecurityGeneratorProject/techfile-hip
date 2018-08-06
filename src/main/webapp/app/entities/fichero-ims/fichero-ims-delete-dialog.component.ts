import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFicheroIms } from 'app/shared/model/fichero-ims.model';
import { FicheroImsService } from './fichero-ims.service';

@Component({
    selector: 'jhi-fichero-ims-delete-dialog',
    templateUrl: './fichero-ims-delete-dialog.component.html'
})
export class FicheroImsDeleteDialogComponent {
    fichero: IFicheroIms;

    constructor(private ficheroService: FicheroImsService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ficheroService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ficheroListModification',
                content: 'Deleted an fichero'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fichero-ims-delete-popup',
    template: ''
})
export class FicheroImsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fichero }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FicheroImsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.fichero = fichero;
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
