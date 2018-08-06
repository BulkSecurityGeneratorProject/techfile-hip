/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { ErrorRegistroImsDetailComponent } from 'app/entities/error-registro-ims/error-registro-ims-detail.component';
import { ErrorRegistroIms } from 'app/shared/model/error-registro-ims.model';

describe('Component Tests', () => {
    describe('ErrorRegistroIms Management Detail Component', () => {
        let comp: ErrorRegistroImsDetailComponent;
        let fixture: ComponentFixture<ErrorRegistroImsDetailComponent>;
        const route = ({ data: of({ errorRegistro: new ErrorRegistroIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [ErrorRegistroImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ErrorRegistroImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ErrorRegistroImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.errorRegistro).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
