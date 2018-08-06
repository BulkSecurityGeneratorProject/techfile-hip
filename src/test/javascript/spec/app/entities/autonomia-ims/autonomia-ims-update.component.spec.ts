/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { AutonomiaImsUpdateComponent } from 'app/entities/autonomia-ims/autonomia-ims-update.component';
import { AutonomiaImsService } from 'app/entities/autonomia-ims/autonomia-ims.service';
import { AutonomiaIms } from 'app/shared/model/autonomia-ims.model';

describe('Component Tests', () => {
    describe('AutonomiaIms Management Update Component', () => {
        let comp: AutonomiaImsUpdateComponent;
        let fixture: ComponentFixture<AutonomiaImsUpdateComponent>;
        let service: AutonomiaImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [AutonomiaImsUpdateComponent]
            })
                .overrideTemplate(AutonomiaImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AutonomiaImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AutonomiaImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AutonomiaIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.autonomia = entity;
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
                    const entity = new AutonomiaIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.autonomia = entity;
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
