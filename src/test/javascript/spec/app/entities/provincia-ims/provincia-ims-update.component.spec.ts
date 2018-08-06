/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { ProvinciaImsUpdateComponent } from 'app/entities/provincia-ims/provincia-ims-update.component';
import { ProvinciaImsService } from 'app/entities/provincia-ims/provincia-ims.service';
import { ProvinciaIms } from 'app/shared/model/provincia-ims.model';

describe('Component Tests', () => {
    describe('ProvinciaIms Management Update Component', () => {
        let comp: ProvinciaImsUpdateComponent;
        let fixture: ComponentFixture<ProvinciaImsUpdateComponent>;
        let service: ProvinciaImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [ProvinciaImsUpdateComponent]
            })
                .overrideTemplate(ProvinciaImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProvinciaImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProvinciaImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProvinciaIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.provincia = entity;
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
                    const entity = new ProvinciaIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.provincia = entity;
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
