/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { CierreImsDetailComponent } from 'app/entities/cierre-ims/cierre-ims-detail.component';
import { CierreIms } from 'app/shared/model/cierre-ims.model';

describe('Component Tests', () => {
    describe('CierreIms Management Detail Component', () => {
        let comp: CierreImsDetailComponent;
        let fixture: ComponentFixture<CierreImsDetailComponent>;
        const route = ({ data: of({ cierre: new CierreIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [CierreImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CierreImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CierreImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cierre).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
