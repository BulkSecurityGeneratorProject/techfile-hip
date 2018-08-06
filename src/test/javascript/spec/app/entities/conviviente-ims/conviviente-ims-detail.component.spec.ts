/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { ConvivienteImsDetailComponent } from 'app/entities/conviviente-ims/conviviente-ims-detail.component';
import { ConvivienteIms } from 'app/shared/model/conviviente-ims.model';

describe('Component Tests', () => {
    describe('ConvivienteIms Management Detail Component', () => {
        let comp: ConvivienteImsDetailComponent;
        let fixture: ComponentFixture<ConvivienteImsDetailComponent>;
        const route = ({ data: of({ conviviente: new ConvivienteIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [ConvivienteImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ConvivienteImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ConvivienteImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.conviviente).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
