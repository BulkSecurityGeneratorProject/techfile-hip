/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { EtiologiaImsDeleteDialogComponent } from 'app/entities/etiologia-ims/etiologia-ims-delete-dialog.component';
import { EtiologiaImsService } from 'app/entities/etiologia-ims/etiologia-ims.service';

describe('Component Tests', () => {
    describe('EtiologiaIms Management Delete Component', () => {
        let comp: EtiologiaImsDeleteDialogComponent;
        let fixture: ComponentFixture<EtiologiaImsDeleteDialogComponent>;
        let service: EtiologiaImsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [EtiologiaImsDeleteDialogComponent]
            })
                .overrideTemplate(EtiologiaImsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EtiologiaImsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtiologiaImsService);
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
