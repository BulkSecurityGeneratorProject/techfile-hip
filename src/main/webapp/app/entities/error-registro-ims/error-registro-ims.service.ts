import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IErrorRegistroIms } from 'app/shared/model/error-registro-ims.model';

type EntityResponseType = HttpResponse<IErrorRegistroIms>;
type EntityArrayResponseType = HttpResponse<IErrorRegistroIms[]>;

@Injectable({ providedIn: 'root' })
export class ErrorRegistroImsService {
    private resourceUrl = SERVER_API_URL + 'api/error-registros';

    constructor(private http: HttpClient) {}

    create(errorRegistro: IErrorRegistroIms): Observable<EntityResponseType> {
        return this.http.post<IErrorRegistroIms>(this.resourceUrl, errorRegistro, { observe: 'response' });
    }

    update(errorRegistro: IErrorRegistroIms): Observable<EntityResponseType> {
        return this.http.put<IErrorRegistroIms>(this.resourceUrl, errorRegistro, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IErrorRegistroIms>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IErrorRegistroIms[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
