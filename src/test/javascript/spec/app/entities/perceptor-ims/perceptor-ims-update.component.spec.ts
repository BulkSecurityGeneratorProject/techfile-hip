/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { PerceptorImsUpdateComponent } from 'app/entities/perceptor-ims/perceptor-ims-update.component';
import { PerceptorImsService } from 'app/entities/perceptor-ims/perceptor-ims.service';
import { PerceptorIms } from 'app/shared/model/perceptor-ims.model';

describe('Component Tests', () => {
    describe('PerceptorIms Management Update Component', () => {
        let comp: PerceptorImsUpdateComponent;
        let fixture: ComponentFixture<PerceptorImsUpdateComponent>;
        let service: PerceptorImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PerceptorImsUpdateComponent]
            })
                .overrideTemplate(PerceptorImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PerceptorImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PerceptorImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PerceptorIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.perceptor = entity;
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
                    const entity = new PerceptorIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.perceptor = entity;
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
