import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPerceptorIms } from 'app/shared/model/perceptor-ims.model';

type EntityResponseType = HttpResponse<IPerceptorIms>;
type EntityArrayResponseType = HttpResponse<IPerceptorIms[]>;

@Injectable({ providedIn: 'root' })
export class PerceptorImsService {
    private resourceUrl = SERVER_API_URL + 'api/perceptors';

    constructor(private http: HttpClient) {}

    create(perceptor: IPerceptorIms): Observable<EntityResponseType> {
        return this.http.post<IPerceptorIms>(this.resourceUrl, perceptor, { observe: 'response' });
    }

    update(perceptor: IPerceptorIms): Observable<EntityResponseType> {
        return this.http.put<IPerceptorIms>(this.resourceUrl, perceptor, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPerceptorIms>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPerceptorIms[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
