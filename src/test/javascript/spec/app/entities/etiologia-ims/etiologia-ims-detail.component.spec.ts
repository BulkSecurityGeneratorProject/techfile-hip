/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { EtiologiaImsDetailComponent } from 'app/entities/etiologia-ims/etiologia-ims-detail.component';
import { EtiologiaIms } from 'app/shared/model/etiologia-ims.model';

describe('Component Tests', () => {
    describe('EtiologiaIms Management Detail Component', () => {
        let comp: EtiologiaImsDetailComponent;
        let fixture: ComponentFixture<EtiologiaImsDetailComponent>;
        const route = ({ data: of({ etiologia: new EtiologiaIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [EtiologiaImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EtiologiaImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EtiologiaImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.etiologia).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
