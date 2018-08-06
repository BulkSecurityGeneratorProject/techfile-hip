/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { UsuarioImsDetailComponent } from 'app/entities/usuario-ims/usuario-ims-detail.component';
import { UsuarioIms } from 'app/shared/model/usuario-ims.model';

describe('Component Tests', () => {
    describe('UsuarioIms Management Detail Component', () => {
        let comp: UsuarioImsDetailComponent;
        let fixture: ComponentFixture<UsuarioImsDetailComponent>;
        const route = ({ data: of({ usuario: new UsuarioIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [UsuarioImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UsuarioImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UsuarioImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.usuario).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
