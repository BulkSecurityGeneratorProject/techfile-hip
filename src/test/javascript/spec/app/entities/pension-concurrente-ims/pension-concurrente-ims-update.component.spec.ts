/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { PensionConcurrenteImsUpdateComponent } from 'app/entities/pension-concurrente-ims/pension-concurrente-ims-update.component';
import { PensionConcurrenteImsService } from 'app/entities/pension-concurrente-ims/pension-concurrente-ims.service';
import { PensionConcurrenteIms } from 'app/shared/model/pension-concurrente-ims.model';

describe('Component Tests', () => {
    describe('PensionConcurrenteIms Management Update Component', () => {
        let comp: PensionConcurrenteImsUpdateComponent;
        let fixture: ComponentFixture<PensionConcurrenteImsUpdateComponent>;
        let service: PensionConcurrenteImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PensionConcurrenteImsUpdateComponent]
            })
                .overrideTemplate(PensionConcurrenteImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PensionConcurrenteImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PensionConcurrenteImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PensionConcurrenteIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pensionConcurrente = entity;
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
                    const entity = new PensionConcurrenteIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pensionConcurrente = entity;
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
