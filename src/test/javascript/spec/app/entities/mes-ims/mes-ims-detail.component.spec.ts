/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { MesImsDetailComponent } from 'app/entities/mes-ims/mes-ims-detail.component';
import { MesIms } from 'app/shared/model/mes-ims.model';

describe('Component Tests', () => {
    describe('MesIms Management Detail Component', () => {
        let comp: MesImsDetailComponent;
        let fixture: ComponentFixture<MesImsDetailComponent>;
        const route = ({ data: of({ mes: new MesIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [MesImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MesImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MesImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.mes).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
