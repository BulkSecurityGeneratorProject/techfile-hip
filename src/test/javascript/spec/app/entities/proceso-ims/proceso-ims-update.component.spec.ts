/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { ProcesoImsUpdateComponent } from 'app/entities/proceso-ims/proceso-ims-update.component';
import { ProcesoImsService } from 'app/entities/proceso-ims/proceso-ims.service';
import { ProcesoIms } from 'app/shared/model/proceso-ims.model';

describe('Component Tests', () => {
    describe('ProcesoIms Management Update Component', () => {
        let comp: ProcesoImsUpdateComponent;
        let fixture: ComponentFixture<ProcesoImsUpdateComponent>;
        let service: ProcesoImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [ProcesoImsUpdateComponent]
            })
                .overrideTemplate(ProcesoImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProcesoImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProcesoImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProcesoIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.proceso = entity;
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
                    const entity = new ProcesoIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.proceso = entity;
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
