/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { ConvivienteImsUpdateComponent } from 'app/entities/conviviente-ims/conviviente-ims-update.component';
import { ConvivienteImsService } from 'app/entities/conviviente-ims/conviviente-ims.service';
import { ConvivienteIms } from 'app/shared/model/conviviente-ims.model';

describe('Component Tests', () => {
    describe('ConvivienteIms Management Update Component', () => {
        let comp: ConvivienteImsUpdateComponent;
        let fixture: ComponentFixture<ConvivienteImsUpdateComponent>;
        let service: ConvivienteImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [ConvivienteImsUpdateComponent]
            })
                .overrideTemplate(ConvivienteImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ConvivienteImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConvivienteImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ConvivienteIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.conviviente = entity;
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
                    const entity = new ConvivienteIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.conviviente = entity;
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
