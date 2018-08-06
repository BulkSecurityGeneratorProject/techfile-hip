/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { RegimenProcedenciaImsUpdateComponent } from 'app/entities/regimen-procedencia-ims/regimen-procedencia-ims-update.component';
import { RegimenProcedenciaImsService } from 'app/entities/regimen-procedencia-ims/regimen-procedencia-ims.service';
import { RegimenProcedenciaIms } from 'app/shared/model/regimen-procedencia-ims.model';

describe('Component Tests', () => {
    describe('RegimenProcedenciaIms Management Update Component', () => {
        let comp: RegimenProcedenciaImsUpdateComponent;
        let fixture: ComponentFixture<RegimenProcedenciaImsUpdateComponent>;
        let service: RegimenProcedenciaImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [RegimenProcedenciaImsUpdateComponent]
            })
                .overrideTemplate(RegimenProcedenciaImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RegimenProcedenciaImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegimenProcedenciaImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RegimenProcedenciaIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.regimenProcedencia = entity;
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
                    const entity = new RegimenProcedenciaIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.regimenProcedencia = entity;
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
