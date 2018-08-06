/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { FicheroByteImsDetailComponent } from 'app/entities/fichero-byte-ims/fichero-byte-ims-detail.component';
import { FicheroByteIms } from 'app/shared/model/fichero-byte-ims.model';

describe('Component Tests', () => {
    describe('FicheroByteIms Management Detail Component', () => {
        let comp: FicheroByteImsDetailComponent;
        let fixture: ComponentFixture<FicheroByteImsDetailComponent>;
        const route = ({ data: of({ ficheroByte: new FicheroByteIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [FicheroByteImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FicheroByteImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FicheroByteImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ficheroByte).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
