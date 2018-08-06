import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUsuarioIms } from 'app/shared/model/usuario-ims.model';

type EntityResponseType = HttpResponse<IUsuarioIms>;
type EntityArrayResponseType = HttpResponse<IUsuarioIms[]>;

@Injectable({ providedIn: 'root' })
export class UsuarioImsService {
    private resourceUrl = SERVER_API_URL + 'api/usuarios';

    constructor(private http: HttpClient) {}

    create(usuario: IUsuarioIms): Observable<EntityResponseType> {
        return this.http.post<IUsuarioIms>(this.resourceUrl, usuario, { observe: 'response' });
    }

    update(usuario: IUsuarioIms): Observable<EntityResponseType> {
        return this.http.put<IUsuarioIms>(this.resourceUrl, usuario, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUsuarioIms>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUsuarioIms[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
