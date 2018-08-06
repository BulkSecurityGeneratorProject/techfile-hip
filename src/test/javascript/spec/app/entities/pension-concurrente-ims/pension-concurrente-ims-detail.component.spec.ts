/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { PensionConcurrenteImsDetailComponent } from 'app/entities/pension-concurrente-ims/pension-concurrente-ims-detail.component';
import { PensionConcurrenteIms } from 'app/shared/model/pension-concurrente-ims.model';

describe('Component Tests', () => {
    describe('PensionConcurrenteIms Management Detail Component', () => {
        let comp: PensionConcurrenteImsDetailComponent;
        let fixture: ComponentFixture<PensionConcurrenteImsDetailComponent>;
        const route = ({ data: of({ pensionConcurrente: new PensionConcurrenteIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PensionConcurrenteImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PensionConcurrenteImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PensionConcurrenteImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.pensionConcurrente).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
