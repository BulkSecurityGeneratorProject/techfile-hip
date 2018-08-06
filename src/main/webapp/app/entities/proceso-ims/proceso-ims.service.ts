import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProcesoIms } from 'app/shared/model/proceso-ims.model';

type EntityResponseType = HttpResponse<IProcesoIms>;
type EntityArrayResponseType = HttpResponse<IProcesoIms[]>;

@Injectable({ providedIn: 'root' })
export class ProcesoImsService {
    private resourceUrl = SERVER_API_URL + 'api/procesos';

    constructor(private http: HttpClient) {}

    create(proceso: IProcesoIms): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(proceso);
        return this.http
            .post<IProcesoIms>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(proceso: IProcesoIms): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(proceso);
        return this.http
            .put<IProcesoIms>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IProcesoIms>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IProcesoIms[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(proceso: IProcesoIms): IProcesoIms {
        const copy: IProcesoIms = Object.assign({}, proceso, {
            fecha: proceso.fecha != null && proceso.fecha.isValid() ? proceso.fecha.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.fecha = res.body.fecha != null ? moment(res.body.fecha) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((proceso: IProcesoIms) => {
            proceso.fecha = proceso.fecha != null ? moment(proceso.fecha) : null;
        });
        return res;
    }
}
