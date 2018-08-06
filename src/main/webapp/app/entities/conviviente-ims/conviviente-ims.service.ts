import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IConvivienteIms } from 'app/shared/model/conviviente-ims.model';

type EntityResponseType = HttpResponse<IConvivienteIms>;
type EntityArrayResponseType = HttpResponse<IConvivienteIms[]>;

@Injectable({ providedIn: 'root' })
export class ConvivienteImsService {
    private resourceUrl = SERVER_API_URL + 'api/convivientes';

    constructor(private http: HttpClient) {}

    create(conviviente: IConvivienteIms): Observable<EntityResponseType> {
        return this.http.post<IConvivienteIms>(this.resourceUrl, conviviente, { observe: 'response' });
    }

    update(conviviente: IConvivienteIms): Observable<EntityResponseType> {
        return this.http.put<IConvivienteIms>(this.resourceUrl, conviviente, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IConvivienteIms>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IConvivienteIms[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
