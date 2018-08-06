/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { TipoRelacionImsDetailComponent } from 'app/entities/tipo-relacion-ims/tipo-relacion-ims-detail.component';
import { TipoRelacionIms } from 'app/shared/model/tipo-relacion-ims.model';

describe('Component Tests', () => {
    describe('TipoRelacionIms Management Detail Component', () => {
        let comp: TipoRelacionImsDetailComponent;
        let fixture: ComponentFixture<TipoRelacionImsDetailComponent>;
        const route = ({ data: of({ tipoRelacion: new TipoRelacionIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [TipoRelacionImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TipoRelacionImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TipoRelacionImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tipoRelacion).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
