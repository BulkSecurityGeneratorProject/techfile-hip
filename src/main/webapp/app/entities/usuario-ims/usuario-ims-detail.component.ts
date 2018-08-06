import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUsuarioIms } from 'app/shared/model/usuario-ims.model';

@Component({
    selector: 'jhi-usuario-ims-detail',
    templateUrl: './usuario-ims-detail.component.html'
})
export class UsuarioImsDetailComponent implements OnInit {
    usuario: IUsuarioIms;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ usuario }) => {
            this.usuario = usuario;
        });
    }

    previousState() {
        window.history.back();
    }
}
