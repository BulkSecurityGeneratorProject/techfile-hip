/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { FicheroImsUpdateComponent } from 'app/entities/fichero-ims/fichero-ims-update.component';
import { FicheroImsService } from 'app/entities/fichero-ims/fichero-ims.service';
import { FicheroIms } from 'app/shared/model/fichero-ims.model';

describe('Component Tests', () => {
    describe('FicheroIms Management Update Component', () => {
        let comp: FicheroImsUpdateComponent;
        let fixture: ComponentFixture<FicheroImsUpdateComponent>;
        let service: FicheroImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [FicheroImsUpdateComponent]
            })
                .overrideTemplate(FicheroImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FicheroImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheroImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FicheroIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fichero = entity;
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
                    const entity = new FicheroIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.fichero = entity;
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
