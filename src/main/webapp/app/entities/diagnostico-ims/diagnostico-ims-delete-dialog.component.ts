import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiagnosticoIms } from 'app/shared/model/diagnostico-ims.model';
import { DiagnosticoImsService } from './diagnostico-ims.service';

@Component({
    selector: 'jhi-diagnostico-ims-delete-dialog',
    templateUrl: './diagnostico-ims-delete-dialog.component.html'
})
export class DiagnosticoImsDeleteDialogComponent {
    diagnostico: IDiagnosticoIms;

    constructor(
        private diagnosticoService: DiagnosticoImsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.diagnosticoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'diagnosticoListModification',
                content: 'Deleted an diagnostico'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-diagnostico-ims-delete-popup',
    template: ''
})
export class DiagnosticoImsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ diagnostico }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DiagnosticoImsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.diagnostico = diagnostico;
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
