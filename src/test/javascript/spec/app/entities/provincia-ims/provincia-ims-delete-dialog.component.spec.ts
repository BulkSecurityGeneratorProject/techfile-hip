/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { ProvinciaImsDeleteDialogComponent } from 'app/entities/provincia-ims/provincia-ims-delete-dialog.component';
import { ProvinciaImsService } from 'app/entities/provincia-ims/provincia-ims.service';

describe('Component Tests', () => {
    describe('ProvinciaIms Management Delete Component', () => {
        let comp: ProvinciaImsDeleteDialogComponent;
        let fixture: ComponentFixture<ProvinciaImsDeleteDialogComponent>;
        let service: ProvinciaImsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [ProvinciaImsDeleteDialogComponent]
            })
                .overrideTemplate(ProvinciaImsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProvinciaImsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProvinciaImsService);
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
