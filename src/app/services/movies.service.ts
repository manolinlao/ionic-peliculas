/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RespuestaMDB} from '../interfaces/interfaces';
import {environment} from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
    providedIn: 'root',
})
export class MoviesService {
    constructor(private http: HttpClient) {}

    private ejecutarQuery<T>(query: string) {
        query = URL + query;
        query += `&api_key=${apiKey}&language=es&include_image_language=es`;

        return this.http.get<T>(query);
    }

    getPopulares() {
        const query = '/discover/movie?sort_by=popularity.desc';

        return this.ejecutarQuery<RespuestaMDB>(query);
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
}
