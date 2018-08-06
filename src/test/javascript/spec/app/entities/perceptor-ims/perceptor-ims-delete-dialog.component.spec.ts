/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { PerceptorImsDeleteDialogComponent } from 'app/entities/perceptor-ims/perceptor-ims-delete-dialog.component';
import { PerceptorImsService } from 'app/entities/perceptor-ims/perceptor-ims.service';

describe('Component Tests', () => {
    describe('PerceptorIms Management Delete Component', () => {
        let comp: PerceptorImsDeleteDialogComponent;
        let fixture: ComponentFixture<PerceptorImsDeleteDialogComponent>;
        let service: PerceptorImsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PerceptorImsDeleteDialogComponent]
            })
                .overrideTemplate(PerceptorImsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PerceptorImsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerceptorImsService);
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
