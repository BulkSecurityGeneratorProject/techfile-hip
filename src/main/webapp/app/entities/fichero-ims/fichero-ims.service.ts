import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFicheroIms } from 'app/shared/model/fichero-ims.model';

type EntityResponseType = HttpResponse<IFicheroIms>;
type EntityArrayResponseType = HttpResponse<IFicheroIms[]>;

@Injectable({ providedIn: 'root' })
export class FicheroImsService {
    private resourceUrl = SERVER_API_URL + 'api/ficheroes';

    constructor(private http: HttpClient) {}

    create(fichero: IFicheroIms): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fichero);
        return this.http
            .post<IFicheroIms>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(fichero: IFicheroIms): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(fichero);
        return this.http
            .put<IFicheroIms>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFicheroIms>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFicheroIms[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(fichero: IFicheroIms): IFicheroIms {
        const copy: IFicheroIms = Object.assign({}, fichero, {
            fechaCreacionOrigen:
                fichero.fechaCreacionOrigen != null && fichero.fechaCreacionOrigen.isValid()
                    ? fichero.fechaCreacionOrigen.format(DATE_FORMAT)
                    : null,
            fechaAltaAplicacion:
                fichero.fechaAltaAplicacion != null && fichero.fechaAltaAplicacion.isValid()
                    ? fichero.fechaAltaAplicacion.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.fechaCreacionOrigen = res.body.fechaCreacionOrigen != null ? moment(res.body.fechaCreacionOrigen) : null;
        res.body.fechaAltaAplicacion = res.body.fechaAltaAplicacion != null ? moment(res.body.fechaAltaAplicacion) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((fichero: IFicheroIms) => {
            fichero.fechaCreacionOrigen = fichero.fechaCreacionOrigen != null ? moment(fichero.fechaCreacionOrigen) : null;
            fichero.fechaAltaAplicacion = fichero.fechaAltaAplicacion != null ? moment(fichero.fechaAltaAplicacion) : null;
        });
        return res;
    }
}
