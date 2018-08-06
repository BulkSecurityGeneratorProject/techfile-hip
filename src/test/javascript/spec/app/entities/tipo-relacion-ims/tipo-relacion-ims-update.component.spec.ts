/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { TipoRelacionImsUpdateComponent } from 'app/entities/tipo-relacion-ims/tipo-relacion-ims-update.component';
import { TipoRelacionImsService } from 'app/entities/tipo-relacion-ims/tipo-relacion-ims.service';
import { TipoRelacionIms } from 'app/shared/model/tipo-relacion-ims.model';

describe('Component Tests', () => {
    describe('TipoRelacionIms Management Update Component', () => {
        let comp: TipoRelacionImsUpdateComponent;
        let fixture: ComponentFixture<TipoRelacionImsUpdateComponent>;
        let service: TipoRelacionImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [TipoRelacionImsUpdateComponent]
            })
                .overrideTemplate(TipoRelacionImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TipoRelacionImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoRelacionImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TipoRelacionIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tipoRelacion = entity;
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
                    const entity = new TipoRelacionIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tipoRelacion = entity;
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
