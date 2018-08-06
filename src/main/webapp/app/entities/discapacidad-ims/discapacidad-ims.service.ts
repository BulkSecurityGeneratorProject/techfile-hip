import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDiscapacidadIms } from 'app/shared/model/discapacidad-ims.model';

type EntityResponseType = HttpResponse<IDiscapacidadIms>;
type EntityArrayResponseType = HttpResponse<IDiscapacidadIms[]>;

@Injectable({ providedIn: 'root' })
export class DiscapacidadImsService {
    private resourceUrl = SERVER_API_URL + 'api/discapacidads';

    constructor(private http: HttpClient) {}

    create(discapacidad: IDiscapacidadIms): Observable<EntityResponseType> {
        return this.http.post<IDiscapacidadIms>(this.resourceUrl, discapacidad, { observe: 'response' });
    }

    update(discapacidad: IDiscapacidadIms): Observable<EntityResponseType> {
        return this.http.put<IDiscapacidadIms>(this.resourceUrl, discapacidad, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDiscapacidadIms>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDiscapacidadIms[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
