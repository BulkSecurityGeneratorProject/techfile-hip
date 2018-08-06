/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { DiscapacidadImsDetailComponent } from 'app/entities/discapacidad-ims/discapacidad-ims-detail.component';
import { DiscapacidadIms } from 'app/shared/model/discapacidad-ims.model';

describe('Component Tests', () => {
    describe('DiscapacidadIms Management Detail Component', () => {
        let comp: DiscapacidadImsDetailComponent;
        let fixture: ComponentFixture<DiscapacidadImsDetailComponent>;
        const route = ({ data: of({ discapacidad: new DiscapacidadIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [DiscapacidadImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DiscapacidadImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DiscapacidadImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.discapacidad).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
