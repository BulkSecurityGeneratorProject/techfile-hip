/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { DiagnosticoImsDetailComponent } from 'app/entities/diagnostico-ims/diagnostico-ims-detail.component';
import { DiagnosticoIms } from 'app/shared/model/diagnostico-ims.model';

describe('Component Tests', () => {
    describe('DiagnosticoIms Management Detail Component', () => {
        let comp: DiagnosticoImsDetailComponent;
        let fixture: ComponentFixture<DiagnosticoImsDetailComponent>;
        const route = ({ data: of({ diagnostico: new DiagnosticoIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [DiagnosticoImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DiagnosticoImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DiagnosticoImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.diagnostico).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
