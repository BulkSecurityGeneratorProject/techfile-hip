/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { DiagnosticoImsDeleteDialogComponent } from 'app/entities/diagnostico-ims/diagnostico-ims-delete-dialog.component';
import { DiagnosticoImsService } from 'app/entities/diagnostico-ims/diagnostico-ims.service';

describe('Component Tests', () => {
    describe('DiagnosticoIms Management Delete Component', () => {
        let comp: DiagnosticoImsDeleteDialogComponent;
        let fixture: ComponentFixture<DiagnosticoImsDeleteDialogComponent>;
        let service: DiagnosticoImsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [DiagnosticoImsDeleteDialogComponent]
            })
                .overrideTemplate(DiagnosticoImsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DiagnosticoImsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiagnosticoImsService);
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
