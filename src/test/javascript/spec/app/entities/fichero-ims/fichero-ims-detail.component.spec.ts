/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { FicheroImsDetailComponent } from 'app/entities/fichero-ims/fichero-ims-detail.component';
import { FicheroIms } from 'app/shared/model/fichero-ims.model';

describe('Component Tests', () => {
    describe('FicheroIms Management Detail Component', () => {
        let comp: FicheroImsDetailComponent;
        let fixture: ComponentFixture<FicheroImsDetailComponent>;
        const route = ({ data: of({ fichero: new FicheroIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [FicheroImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FicheroImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FicheroImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.fichero).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
