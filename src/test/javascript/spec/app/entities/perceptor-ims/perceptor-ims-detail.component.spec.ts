/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { PerceptorImsDetailComponent } from 'app/entities/perceptor-ims/perceptor-ims-detail.component';
import { PerceptorIms } from 'app/shared/model/perceptor-ims.model';

describe('Component Tests', () => {
    describe('PerceptorIms Management Detail Component', () => {
        let comp: PerceptorImsDetailComponent;
        let fixture: ComponentFixture<PerceptorImsDetailComponent>;
        const route = ({ data: of({ perceptor: new PerceptorIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PerceptorImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PerceptorImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PerceptorImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.perceptor).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
