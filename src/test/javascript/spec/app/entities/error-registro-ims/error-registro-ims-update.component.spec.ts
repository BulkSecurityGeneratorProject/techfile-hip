/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { ErrorRegistroImsUpdateComponent } from 'app/entities/error-registro-ims/error-registro-ims-update.component';
import { ErrorRegistroImsService } from 'app/entities/error-registro-ims/error-registro-ims.service';
import { ErrorRegistroIms } from 'app/shared/model/error-registro-ims.model';

describe('Component Tests', () => {
    describe('ErrorRegistroIms Management Update Component', () => {
        let comp: ErrorRegistroImsUpdateComponent;
        let fixture: ComponentFixture<ErrorRegistroImsUpdateComponent>;
        let service: ErrorRegistroImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [ErrorRegistroImsUpdateComponent]
            })
                .overrideTemplate(ErrorRegistroImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ErrorRegistroImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ErrorRegistroImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ErrorRegistroIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.errorRegistro = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ErrorRegistroIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.errorRegistro = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
