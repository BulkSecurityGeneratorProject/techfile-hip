/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { AutonomiaImsDeleteDialogComponent } from 'app/entities/autonomia-ims/autonomia-ims-delete-dialog.component';
import { AutonomiaImsService } from 'app/entities/autonomia-ims/autonomia-ims.service';

describe('Component Tests', () => {
    describe('AutonomiaIms Management Delete Component', () => {
        let comp: AutonomiaImsDeleteDialogComponent;
        let fixture: ComponentFixture<AutonomiaImsDeleteDialogComponent>;
        let service: AutonomiaImsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [AutonomiaImsDeleteDialogComponent]
            })
                .overrideTemplate(AutonomiaImsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AutonomiaImsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AutonomiaImsService);
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
