/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { ProcesoImsDetailComponent } from 'app/entities/proceso-ims/proceso-ims-detail.component';
import { ProcesoIms } from 'app/shared/model/proceso-ims.model';

describe('Component Tests', () => {
    describe('ProcesoIms Management Detail Component', () => {
        let comp: ProcesoImsDetailComponent;
        let fixture: ComponentFixture<ProcesoImsDetailComponent>;
        const route = ({ data: of({ proceso: new ProcesoIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [ProcesoImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProcesoImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProcesoImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.proceso).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
