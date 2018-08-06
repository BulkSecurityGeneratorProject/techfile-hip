/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { MesImsUpdateComponent } from 'app/entities/mes-ims/mes-ims-update.component';
import { MesImsService } from 'app/entities/mes-ims/mes-ims.service';
import { MesIms } from 'app/shared/model/mes-ims.model';

describe('Component Tests', () => {
    describe('MesIms Management Update Component', () => {
        let comp: MesImsUpdateComponent;
        let fixture: ComponentFixture<MesImsUpdateComponent>;
        let service: MesImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [MesImsUpdateComponent]
            })
                .overrideTemplate(MesImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MesImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MesImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MesIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mes = entity;
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
                    const entity = new MesIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mes = entity;
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
