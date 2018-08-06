import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProvinciaIms } from 'app/shared/model/provincia-ims.model';

type EntityResponseType = HttpResponse<IProvinciaIms>;
type EntityArrayResponseType = HttpResponse<IProvinciaIms[]>;

@Injectable({ providedIn: 'root' })
export class ProvinciaImsService {
    private resourceUrl = SERVER_API_URL + 'api/provincias';

    constructor(private http: HttpClient) {}

    create(provincia: IProvinciaIms): Observable<EntityResponseType> {
        return this.http.post<IProvinciaIms>(this.resourceUrl, provincia, { observe: 'response' });
    }

    update(provincia: IProvinciaIms): Observable<EntityResponseType> {
        return this.http.put<IProvinciaIms>(this.resourceUrl, provincia, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProvinciaIms>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProvinciaIms[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
