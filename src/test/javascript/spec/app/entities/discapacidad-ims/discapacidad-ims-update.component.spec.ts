/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { DiscapacidadImsUpdateComponent } from 'app/entities/discapacidad-ims/discapacidad-ims-update.component';
import { DiscapacidadImsService } from 'app/entities/discapacidad-ims/discapacidad-ims.service';
import { DiscapacidadIms } from 'app/shared/model/discapacidad-ims.model';

describe('Component Tests', () => {
    describe('DiscapacidadIms Management Update Component', () => {
        let comp: DiscapacidadImsUpdateComponent;
        let fixture: ComponentFixture<DiscapacidadImsUpdateComponent>;
        let service: DiscapacidadImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [DiscapacidadImsUpdateComponent]
            })
                .overrideTemplate(DiscapacidadImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DiscapacidadImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiscapacidadImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DiscapacidadIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.discapacidad = entity;
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
                    const entity = new DiscapacidadIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.discapacidad = entity;
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
