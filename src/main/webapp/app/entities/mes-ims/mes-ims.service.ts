import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMesIms } from 'app/shared/model/mes-ims.model';

type EntityResponseType = HttpResponse<IMesIms>;
type EntityArrayResponseType = HttpResponse<IMesIms[]>;

@Injectable({ providedIn: 'root' })
export class MesImsService {
    private resourceUrl = SERVER_API_URL + 'api/mes';

    constructor(private http: HttpClient) {}

    create(mes: IMesIms): Observable<EntityResponseType> {
        return this.http.post<IMesIms>(this.resourceUrl, mes, { observe: 'response' });
    }

    update(mes: IMesIms): Observable<EntityResponseType> {
        return this.http.put<IMesIms>(this.resourceUrl, mes, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMesIms>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMesIms[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
