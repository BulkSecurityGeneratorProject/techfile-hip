import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICierreIms } from 'app/shared/model/cierre-ims.model';

type EntityResponseType = HttpResponse<ICierreIms>;
type EntityArrayResponseType = HttpResponse<ICierreIms[]>;

@Injectable({ providedIn: 'root' })
export class CierreImsService {
    private resourceUrl = SERVER_API_URL + 'api/cierres';

    constructor(private http: HttpClient) {}

    create(cierre: ICierreIms): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(cierre);
        return this.http
            .post<ICierreIms>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(cierre: ICierreIms): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(cierre);
        return this.http
            .put<ICierreIms>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICierreIms>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICierreIms[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(cierre: ICierreIms): ICierreIms {
        const copy: ICierreIms = Object.assign({}, cierre, {
            fechaCierre: cierre.fechaCierre != null && cierre.fechaCierre.isValid() ? cierre.fechaCierre.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.fechaCierre = res.body.fechaCierre != null ? moment(res.body.fechaCierre) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((cierre: ICierreIms) => {
            cierre.fechaCierre = cierre.fechaCierre != null ? moment(cierre.fechaCierre) : null;
        });
        return res;
    }
}
