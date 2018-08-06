/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { TipoErrorImsUpdateComponent } from 'app/entities/tipo-error-ims/tipo-error-ims-update.component';
import { TipoErrorImsService } from 'app/entities/tipo-error-ims/tipo-error-ims.service';
import { TipoErrorIms } from 'app/shared/model/tipo-error-ims.model';

describe('Component Tests', () => {
    describe('TipoErrorIms Management Update Component', () => {
        let comp: TipoErrorImsUpdateComponent;
        let fixture: ComponentFixture<TipoErrorImsUpdateComponent>;
        let service: TipoErrorImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [TipoErrorImsUpdateComponent]
            })
                .overrideTemplate(TipoErrorImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TipoErrorImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoErrorImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TipoErrorIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tipoError = entity;
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
                    const entity = new TipoErrorIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tipoError = entity;
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
