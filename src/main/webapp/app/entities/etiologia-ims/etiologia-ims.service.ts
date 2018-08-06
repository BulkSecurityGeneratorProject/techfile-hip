import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEtiologiaIms } from 'app/shared/model/etiologia-ims.model';

type EntityResponseType = HttpResponse<IEtiologiaIms>;
type EntityArrayResponseType = HttpResponse<IEtiologiaIms[]>;

@Injectable({ providedIn: 'root' })
export class EtiologiaImsService {
    private resourceUrl = SERVER_API_URL + 'api/etiologias';

    constructor(private http: HttpClient) {}

    create(etiologia: IEtiologiaIms): Observable<EntityResponseType> {
        return this.http.post<IEtiologiaIms>(this.resourceUrl, etiologia, { observe: 'response' });
    }

    update(etiologia: IEtiologiaIms): Observable<EntityResponseType> {
        return this.http.put<IEtiologiaIms>(this.resourceUrl, etiologia, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEtiologiaIms>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEtiologiaIms[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
