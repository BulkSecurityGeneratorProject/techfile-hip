/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { PensionistaImsDeleteDialogComponent } from 'app/entities/pensionista-ims/pensionista-ims-delete-dialog.component';
import { PensionistaImsService } from 'app/entities/pensionista-ims/pensionista-ims.service';

describe('Component Tests', () => {
    describe('PensionistaIms Management Delete Component', () => {
        let comp: PensionistaImsDeleteDialogComponent;
        let fixture: ComponentFixture<PensionistaImsDeleteDialogComponent>;
        let service: PensionistaImsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PensionistaImsDeleteDialogComponent]
            })
                .overrideTemplate(PensionistaImsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PensionistaImsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PensionistaImsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
