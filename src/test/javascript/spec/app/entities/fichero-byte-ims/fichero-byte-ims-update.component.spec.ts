/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { FicheroByteImsUpdateComponent } from 'app/entities/fichero-byte-ims/fichero-byte-ims-update.component';
import { FicheroByteImsService } from 'app/entities/fichero-byte-ims/fichero-byte-ims.service';
import { FicheroByteIms } from 'app/shared/model/fichero-byte-ims.model';

describe('Component Tests', () => {
    describe('FicheroByteIms Management Update Component', () => {
        let comp: FicheroByteImsUpdateComponent;
        let fixture: ComponentFixture<FicheroByteImsUpdateComponent>;
        let service: FicheroByteImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [FicheroByteImsUpdateComponent]
            })
                .overrideTemplate(FicheroByteImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FicheroByteImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FicheroByteImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FicheroByteIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ficheroByte = entity;
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
                    const entity = new FicheroByteIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ficheroByte = entity;
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
