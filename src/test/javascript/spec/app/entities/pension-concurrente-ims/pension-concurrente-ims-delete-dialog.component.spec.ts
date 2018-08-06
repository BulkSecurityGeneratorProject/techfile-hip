/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { PensionConcurrenteImsDeleteDialogComponent } from 'app/entities/pension-concurrente-ims/pension-concurrente-ims-delete-dialog.component';
import { PensionConcurrenteImsService } from 'app/entities/pension-concurrente-ims/pension-concurrente-ims.service';

describe('Component Tests', () => {
    describe('PensionConcurrenteIms Management Delete Component', () => {
        let comp: PensionConcurrenteImsDeleteDialogComponent;
        let fixture: ComponentFixture<PensionConcurrenteImsDeleteDialogComponent>;
        let service: PensionConcurrenteImsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PensionConcurrenteImsDeleteDialogComponent]
            })
                .overrideTemplate(PensionConcurrenteImsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PensionConcurrenteImsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PensionConcurrenteImsService);
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
