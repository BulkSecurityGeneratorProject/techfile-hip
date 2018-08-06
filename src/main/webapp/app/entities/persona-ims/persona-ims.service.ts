import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPersonaIms } from 'app/shared/model/persona-ims.model';

type EntityResponseType = HttpResponse<IPersonaIms>;
type EntityArrayResponseType = HttpResponse<IPersonaIms[]>;

@Injectable({ providedIn: 'root' })
export class PersonaImsService {
    private resourceUrl = SERVER_API_URL + 'api/personas';

    constructor(private http: HttpClient) {}

    create(persona: IPersonaIms): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(persona);
        return this.http
            .post<IPersonaIms>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(persona: IPersonaIms): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(persona);
        return this.http
            .put<IPersonaIms>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPersonaIms>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPersonaIms[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(persona: IPersonaIms): IPersonaIms {
        const copy: IPersonaIms = Object.assign({}, persona, {
            fechaNacimiento:
                persona.fechaNacimiento != null && persona.fechaNacimiento.isValid() ? persona.fechaNacimiento.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.fechaNacimiento = res.body.fechaNacimiento != null ? moment(res.body.fechaNacimiento) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((persona: IPersonaIms) => {
            persona.fechaNacimiento = persona.fechaNacimiento != null ? moment(persona.fechaNacimiento) : null;
        });
        return res;
    }
}
