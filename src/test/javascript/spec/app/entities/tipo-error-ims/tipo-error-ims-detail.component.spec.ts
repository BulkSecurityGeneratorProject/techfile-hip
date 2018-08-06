/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { TipoErrorImsDetailComponent } from 'app/entities/tipo-error-ims/tipo-error-ims-detail.component';
import { TipoErrorIms } from 'app/shared/model/tipo-error-ims.model';

describe('Component Tests', () => {
    describe('TipoErrorIms Management Detail Component', () => {
        let comp: TipoErrorImsDetailComponent;
        let fixture: ComponentFixture<TipoErrorImsDetailComponent>;
        const route = ({ data: of({ tipoError: new TipoErrorIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [TipoErrorImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TipoErrorImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TipoErrorImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tipoError).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
