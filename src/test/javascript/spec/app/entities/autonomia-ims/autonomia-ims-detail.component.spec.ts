/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { AutonomiaImsDetailComponent } from 'app/entities/autonomia-ims/autonomia-ims-detail.component';
import { AutonomiaIms } from 'app/shared/model/autonomia-ims.model';

describe('Component Tests', () => {
    describe('AutonomiaIms Management Detail Component', () => {
        let comp: AutonomiaImsDetailComponent;
        let fixture: ComponentFixture<AutonomiaImsDetailComponent>;
        const route = ({ data: of({ autonomia: new AutonomiaIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [AutonomiaImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AutonomiaImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AutonomiaImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.autonomia).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
