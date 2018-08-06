/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { PersonaImsUpdateComponent } from 'app/entities/persona-ims/persona-ims-update.component';
import { PersonaImsService } from 'app/entities/persona-ims/persona-ims.service';
import { PersonaIms } from 'app/shared/model/persona-ims.model';

describe('Component Tests', () => {
    describe('PersonaIms Management Update Component', () => {
        let comp: PersonaImsUpdateComponent;
        let fixture: ComponentFixture<PersonaImsUpdateComponent>;
        let service: PersonaImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PersonaImsUpdateComponent]
            })
                .overrideTemplate(PersonaImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PersonaImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonaImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PersonaIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.persona = entity;
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
                    const entity = new PersonaIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.persona = entity;
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
