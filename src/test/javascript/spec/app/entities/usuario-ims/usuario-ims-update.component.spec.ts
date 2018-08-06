/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { UsuarioImsUpdateComponent } from 'app/entities/usuario-ims/usuario-ims-update.component';
import { UsuarioImsService } from 'app/entities/usuario-ims/usuario-ims.service';
import { UsuarioIms } from 'app/shared/model/usuario-ims.model';

describe('Component Tests', () => {
    describe('UsuarioIms Management Update Component', () => {
        let comp: UsuarioImsUpdateComponent;
        let fixture: ComponentFixture<UsuarioImsUpdateComponent>;
        let service: UsuarioImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [UsuarioImsUpdateComponent]
            })
                .overrideTemplate(UsuarioImsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UsuarioImsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarioImsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UsuarioIms(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.usuario = entity;
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
                    const entity = new UsuarioIms();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.usuario = entity;
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
