import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoRelacionIms } from 'app/shared/model/tipo-relacion-ims.model';
import { TipoRelacionImsService } from './tipo-relacion-ims.service';

@Component({
    selector: 'jhi-tipo-relacion-ims-delete-dialog',
    templateUrl: './tipo-relacion-ims-delete-dialog.component.html'
})
export class TipoRelacionImsDeleteDialogComponent {
    tipoRelacion: ITipoRelacionIms;

    constructor(
        private tipoRelacionService: TipoRelacionImsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoRelacionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tipoRelacionListModification',
                content: 'Deleted an tipoRelacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-relacion-ims-delete-popup',
    template: ''
})
export class TipoRelacionImsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoRelacion }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TipoRelacionImsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.tipoRelacion = tipoRelacion;
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
