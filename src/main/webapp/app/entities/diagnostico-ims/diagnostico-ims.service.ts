import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDiagnosticoIms } from 'app/shared/model/diagnostico-ims.model';

type EntityResponseType = HttpResponse<IDiagnosticoIms>;
type EntityArrayResponseType = HttpResponse<IDiagnosticoIms[]>;

@Injectable({ providedIn: 'root' })
export class DiagnosticoImsService {
    private resourceUrl = SERVER_API_URL + 'api/diagnosticos';

    constructor(private http: HttpClient) {}

    create(diagnostico: IDiagnosticoIms): Observable<EntityResponseType> {
        return this.http.post<IDiagnosticoIms>(this.resourceUrl, diagnostico, { observe: 'response' });
    }

    update(diagnostico: IDiagnosticoIms): Observable<EntityResponseType> {
        return this.http.put<IDiagnosticoIms>(this.resourceUrl, diagnostico, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDiagnosticoIms>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDiagnosticoIms[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
