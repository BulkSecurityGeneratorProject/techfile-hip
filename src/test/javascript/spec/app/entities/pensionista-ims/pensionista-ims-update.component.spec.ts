/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { PensionistaImsUpdateComponent } from 'app/entities/pensionista-ims/pensionista-ims-update.component';
import { PensionistaImsService } from 'app/entities/pensionista-ims/pensionista-ims.service';
import { PensionistaIms } from 'app/shared/model/pensionista-ims.model';

describe('Component Tests', () => {
    describe('PensionistaIms Management Update Component', () => {
        let comp: PensionistaImsUpdateComponent;
        let fixture: ComponentFixture<PensionistaImsUpdateComponent>;
        let service: PensionistaImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PensionistaImsUpdateComponent]
            })
                .overrideTemplate(PensionistaImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PensionistaImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PensionistaImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PensionistaIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pensionista = entity;
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
                    const entity = new PensionistaIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.pensionista = entity;
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
