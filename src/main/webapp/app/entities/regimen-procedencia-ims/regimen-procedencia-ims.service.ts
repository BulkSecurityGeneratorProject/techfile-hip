import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRegimenProcedenciaIms } from 'app/shared/model/regimen-procedencia-ims.model';

type EntityResponseType = HttpResponse<IRegimenProcedenciaIms>;
type EntityArrayResponseType = HttpResponse<IRegimenProcedenciaIms[]>;

@Injectable({ providedIn: 'root' })
export class RegimenProcedenciaImsService {
    private resourceUrl = SERVER_API_URL + 'api/regimen-procedencias';

    constructor(private http: HttpClient) {}

    create(regimenProcedencia: IRegimenProcedenciaIms): Observable<EntityResponseType> {
        return this.http.post<IRegimenProcedenciaIms>(this.resourceUrl, regimenProcedencia, { observe: 'response' });
    }

    update(regimenProcedencia: IRegimenProcedenciaIms): Observable<EntityResponseType> {
        return this.http.put<IRegimenProcedenciaIms>(this.resourceUrl, regimenProcedencia, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRegimenProcedenciaIms>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRegimenProcedenciaIms[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
