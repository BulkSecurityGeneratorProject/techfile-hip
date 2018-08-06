/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TechfileTestModule } from '../../../test.module';
import { ErrorRegistroImsComponent } from 'app/entities/error-registro-ims/error-registro-ims.component';
import { ErrorRegistroImsService } from 'app/entities/error-registro-ims/error-registro-ims.service';
import { ErrorRegistroIms } from 'app/shared/model/error-registro-ims.model';

describe('Component Tests', () => {
    describe('ErrorRegistroIms Management Component', () => {
        let comp: ErrorRegistroImsComponent;
        let fixture: ComponentFixture<ErrorRegistroImsComponent>;
        let service: ErrorRegistroImsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TechfileTestModule],
                declarations: [ErrorRegistroImsComponent],
                providers: []
            })
                .overrideTemplate(ErrorRegistroImsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ErrorRegistroImsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ErrorRegistroImsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ErrorRegistroIms(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.errorRegistros[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
