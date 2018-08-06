/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { EtiologiaImsUpdateComponent } from 'app/entities/etiologia-ims/etiologia-ims-update.component';
import { EtiologiaImsService } from 'app/entities/etiologia-ims/etiologia-ims.service';
import { EtiologiaIms } from 'app/shared/model/etiologia-ims.model';

describe('Component Tests', () => {
    describe('EtiologiaIms Management Update Component', () => {
        let comp: EtiologiaImsUpdateComponent;
        let fixture: ComponentFixture<EtiologiaImsUpdateComponent>;
        let service: EtiologiaImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [EtiologiaImsUpdateComponent]
            })
                .overrideTemplate(EtiologiaImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EtiologiaImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtiologiaImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new EtiologiaIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.etiologia = entity;
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
                    const entity = new EtiologiaIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.etiologia = entity;
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
