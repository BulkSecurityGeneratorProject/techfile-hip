import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRegimenProcedenciaIms } from 'app/shared/model/regimen-procedencia-ims.model';
import { RegimenProcedenciaImsService } from './regimen-procedencia-ims.service';

@Component({
    selector: 'jhi-regimen-procedencia-ims-delete-dialog',
    templateUrl: './regimen-procedencia-ims-delete-dialog.component.html'
})
export class RegimenProcedenciaImsDeleteDialogComponent {
    regimenProcedencia: IRegimenProcedenciaIms;

    constructor(
        private regimenProcedenciaService: RegimenProcedenciaImsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.regimenProcedenciaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'regimenProcedenciaListModification',
                content: 'Deleted an regimenProcedencia'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-regimen-procedencia-ims-delete-popup',
    template: ''
})
export class RegimenProcedenciaImsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ regimenProcedencia }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RegimenProcedenciaImsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.regimenProcedencia = regimenProcedencia;
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
