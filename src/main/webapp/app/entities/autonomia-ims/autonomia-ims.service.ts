import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAutonomiaIms } from 'app/shared/model/autonomia-ims.model';

type EntityResponseType = HttpResponse<IAutonomiaIms>;
type EntityArrayResponseType = HttpResponse<IAutonomiaIms[]>;

@Injectable({ providedIn: 'root' })
export class AutonomiaImsService {
    private resourceUrl = SERVER_API_URL + 'api/autonomias';

    constructor(private http: HttpClient) {}

    create(autonomia: IAutonomiaIms): Observable<EntityResponseType> {
        return this.http.post<IAutonomiaIms>(this.resourceUrl, autonomia, { observe: 'response' });
    }

    update(autonomia: IAutonomiaIms): Observable<EntityResponseType> {
        return this.http.put<IAutonomiaIms>(this.resourceUrl, autonomia, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAutonomiaIms>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAutonomiaIms[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
