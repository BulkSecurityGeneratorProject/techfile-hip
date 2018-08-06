/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { RegimenProcedenciaImsDetailComponent } from 'app/entities/regimen-procedencia-ims/regimen-procedencia-ims-detail.component';
import { RegimenProcedenciaIms } from 'app/shared/model/regimen-procedencia-ims.model';

describe('Component Tests', () => {
    describe('RegimenProcedenciaIms Management Detail Component', () => {
        let comp: RegimenProcedenciaImsDetailComponent;
        let fixture: ComponentFixture<RegimenProcedenciaImsDetailComponent>;
        const route = ({ data: of({ regimenProcedencia: new RegimenProcedenciaIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [RegimenProcedenciaImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RegimenProcedenciaImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RegimenProcedenciaImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.regimenProcedencia).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
