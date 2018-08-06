/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TechfileTestModule } from '../../../test.module';
import { PersonaImsDeleteDialogComponent } from 'app/entities/persona-ims/persona-ims-delete-dialog.component';
import { PersonaImsService } from 'app/entities/persona-ims/persona-ims.service';

describe('Component Tests', () => {
    describe('PersonaIms Management Delete Component', () => {
        let comp: PersonaImsDeleteDialogComponent;
        let fixture: ComponentFixture<PersonaImsDeleteDialogComponent>;
        let service: PersonaImsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PersonaImsDeleteDialogComponent]
            })
                .overrideTemplate(PersonaImsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PersonaImsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonaImsService);
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
