/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RespuestaMDB, PeliculaDetalle, RespuestaCredits} from '../interfaces/interfaces';
import {environment} from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
    providedIn: 'root',
})
export class MoviesService {
    private popularesPage: number = 0;

    constructor(private http: HttpClient) {}

    private ejecutarQuery<T>(query: string) {
        query = URL + query;
        query += `&api_key=${apiKey}&language=es&include_image_language=es`;

        return this.http.get<T>(query);
    }

    getPopulares() {
        this.popularesPage++;

        const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;

        return this.ejecutarQuery<RespuestaMDB>(query);
    }

    buscarPeliculas(texto: string) {
        return this.ejecutarQuery<RespuestaMDB>(`/search/movie?query=${texto}`);
    }

    getFeature() {
        const hoy = new Date();
        const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
        const mes = hoy.getMonth() + 1;
        let mesString = mes.toString();
        if (mes < 10) {
            mesString = '0' + mes.toString();
        }
        const inicio = `${hoy.getFullYear()}-${mesString}-01`;
        const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

        return this.ejecutarQuery<RespuestaMDB>(
            `/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`
        );
    }

    getPeliculaDetalle(id: string) {
        return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
    }
    getActoresPelicula(id: string) {
        return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
    }
}
