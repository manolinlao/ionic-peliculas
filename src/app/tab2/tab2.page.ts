/* eslint-disable @typescript-eslint/no-inferrable-types */
import {Component} from '@angular/core';
import {Pelicula} from '../interfaces/interfaces';
import {MoviesService} from '../services/movies.service';
import {ModalController} from '@ionic/angular';
import {DetalleComponent} from '../components/detalle/detalle.component';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
    textoBuscar: string = '';
    ideas: string[] = ['Spiderman', 'Avengers', 'El señor de los anillos', 'El Exorcista'];

    peliculas: Pelicula[] = [];
    buscando: boolean = false;

    constructor(private moviesService: MoviesService, private modalCtrl: ModalController) {}

    buscar(event) {
        const valor: string = event.detail.value;

        if (valor.length === 0) {
            this.buscando = false;
            this.peliculas = [];
            return;
        }

        this.buscando = true;
        this.moviesService.buscarPeliculas(valor).subscribe((resp) => {
            this.peliculas = resp.results;
            this.buscando = false;
        });
    }

    async detalle(id: number) {
        const modal = await this.modalCtrl.create({
            component: DetalleComponent,
            componentProps: {
                id,
            },
        });
        modal.present();
    }
}
