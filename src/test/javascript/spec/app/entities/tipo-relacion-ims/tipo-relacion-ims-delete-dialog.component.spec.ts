/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { TipoRelacionImsDeleteDialogComponent } from 'app/entities/tipo-relacion-ims/tipo-relacion-ims-delete-dialog.component';
import { TipoRelacionImsService } from 'app/entities/tipo-relacion-ims/tipo-relacion-ims.service';

describe('Component Tests', () => {
    describe('TipoRelacionIms Management Delete Component', () => {
        let comp: TipoRelacionImsDeleteDialogComponent;
        let fixture: ComponentFixture<TipoRelacionImsDeleteDialogComponent>;
        let service: TipoRelacionImsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [TipoRelacionImsDeleteDialogComponent]
            })
                .overrideTemplate(TipoRelacionImsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TipoRelacionImsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoRelacionImsService);
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
