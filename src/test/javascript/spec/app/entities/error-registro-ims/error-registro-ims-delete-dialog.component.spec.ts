/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { ErrorRegistroImsDeleteDialogComponent } from 'app/entities/error-registro-ims/error-registro-ims-delete-dialog.component';
import { ErrorRegistroImsService } from 'app/entities/error-registro-ims/error-registro-ims.service';

describe('Component Tests', () => {
    describe('ErrorRegistroIms Management Delete Component', () => {
        let comp: ErrorRegistroImsDeleteDialogComponent;
        let fixture: ComponentFixture<ErrorRegistroImsDeleteDialogComponent>;
        let service: ErrorRegistroImsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [ErrorRegistroImsDeleteDialogComponent]
            })
                .overrideTemplate(ErrorRegistroImsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ErrorRegistroImsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ErrorRegistroImsService);
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
