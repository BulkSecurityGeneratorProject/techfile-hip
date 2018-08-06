/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { CierreImsUpdateComponent } from 'app/entities/cierre-ims/cierre-ims-update.component';
import { CierreImsService } from 'app/entities/cierre-ims/cierre-ims.service';
import { CierreIms } from 'app/shared/model/cierre-ims.model';

describe('Component Tests', () => {
    describe('CierreIms Management Update Component', () => {
        let comp: CierreImsUpdateComponent;
        let fixture: ComponentFixture<CierreImsUpdateComponent>;
        let service: CierreImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [CierreImsUpdateComponent]
            })
                .overrideTemplate(CierreImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CierreImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CierreImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CierreIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cierre = entity;
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
                    const entity = new CierreIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cierre = entity;
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
