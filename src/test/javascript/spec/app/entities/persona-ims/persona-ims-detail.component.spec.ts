/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TechfileTestModule } from '../../../test.module';
import { PersonaImsDetailComponent } from 'app/entities/persona-ims/persona-ims-detail.component';
import { PersonaIms } from 'app/shared/model/persona-ims.model';

describe('Component Tests', () => {
    describe('PersonaIms Management Detail Component', () => {
        let comp: PersonaImsDetailComponent;
        let fixture: ComponentFixture<PersonaImsDetailComponent>;
        const route = ({ data: of({ persona: new PersonaIms(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [PersonaImsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PersonaImsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PersonaImsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.persona).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
