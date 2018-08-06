import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFicheroByteIms } from 'app/shared/model/fichero-byte-ims.model';

type EntityResponseType = HttpResponse<IFicheroByteIms>;
type EntityArrayResponseType = HttpResponse<IFicheroByteIms[]>;

@Injectable({ providedIn: 'root' })
export class FicheroByteImsService {
    private resourceUrl = SERVER_API_URL + 'api/fichero-bytes';

    constructor(private http: HttpClient) {}

    create(ficheroByte: IFicheroByteIms): Observable<EntityResponseType> {
        return this.http.post<IFicheroByteIms>(this.resourceUrl, ficheroByte, { observe: 'response' });
    }

    update(ficheroByte: IFicheroByteIms): Observable<EntityResponseType> {
        return this.http.put<IFicheroByteIms>(this.resourceUrl, ficheroByte, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFicheroByteIms>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFicheroByteIms[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
