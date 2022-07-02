import {Injectable, OnInit} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage-angular';
import {PeliculaDetalle} from '../interfaces/interfaces';

@Injectable({
    providedIn: 'root',
})
export class DataLocalService {
    //peliculas que tengo en el storage
    peliculas: PeliculaDetalle[] = [];

    constructor(private storage: Storage, private toastController: ToastController) {
        this.initStorage();
    }

    async initStorage() {
        await this.storage.create();
    }

    guardarPelicula(pelicula: PeliculaDetalle) {
        let existe = false;

        for (const peli of this.peliculas) {
            if (peli.id === pelicula.id) {
                existe = true;
                break;
            }
        }
        /*  Esto es lo mismo que usar el for of
        const indexPeli = this.peliculas.findIndex((peli) => peli.id === pelicula.id);
        if (indexPeli !== -1) {
            existe = true;
        }
        */

        let mensaje = '';

        if (existe) {
            this.peliculas = this.peliculas.filter((peli) => peli.id !== pelicula.id);
            mensaje = 'removido de favoritos';
        } else {
            this.peliculas.push(pelicula);
            mensaje = 'Agregado a favoritos';
        }

        this.presentToast(mensaje);
        this.storage.set('peliculas', this.peliculas);

        return !existe;
    }

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 1500,
        });
        toast.present();
    }

    async cargarFavoritos() {
        const peliculas = await this.storage.get('peliculas');
        this.peliculas = peliculas || [];
        return this.peliculas;
    }

    async existePelicula(id) {
        id = Number(id);
        await this.cargarFavoritos();
        const existe = this.peliculas.find((peli) => peli.id === id);
        return existe ? true : false;
    }
}
