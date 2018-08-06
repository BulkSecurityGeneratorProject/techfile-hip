/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { PensionistaImsDetailComponent } from 'app/entities/pensionista-ims/pensionista-ims-detail.component';
import { PensionistaIms } from 'app/shared/model/pensionista-ims.model';

describe('Component Tests', () => {
    describe('PensionistaIms Management Detail Component', () => {
        let comp: PensionistaImsDetailComponent;
        let fixture: ComponentFixture<PensionistaImsDetailComponent>;
        const route = ({ data: of({ pensionista: new PensionistaIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PensionistaImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PensionistaImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PensionistaImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.pensionista).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
