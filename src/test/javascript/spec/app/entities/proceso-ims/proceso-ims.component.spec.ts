/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TechfileTestModule } from '../../../test.module';
import { ProcesoImsComponent } from 'app/entities/proceso-ims/proceso-ims.component';
import { ProcesoImsService } from 'app/entities/proceso-ims/proceso-ims.service';
import { ProcesoIms } from 'app/shared/model/proceso-ims.model';

describe('Component Tests', () => {
    describe('ProcesoIms Management Component', () => {
        let comp: ProcesoImsComponent;
        let fixture: ComponentFixture<ProcesoImsComponent>;
        let service: ProcesoImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [ProcesoImsComponent],
                providers: []
            })
                .overrideTemplate(ProcesoImsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProcesoImsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProcesoImsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ProcesoIms(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.procesos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
