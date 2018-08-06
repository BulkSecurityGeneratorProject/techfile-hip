/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { ProvinciaImsDetailComponent } from 'app/entities/provincia-ims/provincia-ims-detail.component';
import { ProvinciaIms } from 'app/shared/model/provincia-ims.model';

describe('Component Tests', () => {
    describe('ProvinciaIms Management Detail Component', () => {
        let comp: ProvinciaImsDetailComponent;
        let fixture: ComponentFixture<ProvinciaImsDetailComponent>;
        const route = ({ data: of({ provincia: new ProvinciaIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [ProvinciaImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProvinciaImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProvinciaImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.provincia).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
