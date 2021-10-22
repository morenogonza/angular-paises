import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private urlApi: string = 'https://restcountries.com/v3.1';

  get params() {
    return new HttpParams().set('fields', 'name,flags,capital,population,cca2');
  }

  constructor(private http: HttpClient) {}

  buscarPais(termino: string): Observable<Pais[]> {
    const url = `${this.urlApi}/name/${termino}`;
    return this.http.get<Pais[]>(url, { params: this.params });
  }

  buscarCapital(termino: string): Observable<Pais[]> {
    const url = `${this.urlApi}/capital/${termino}`;
    return this.http.get<Pais[]>(url, { params: this.params });
  }

  buscarPaisPorCodigo(id: string): Observable<Pais[]> {
    const url = `${this.urlApi}/alpha/${id}`;
    return this.http.get<Pais[]>(url);
  }

  buscarPorRegion(region: string): Observable<Pais[]> {
    const url = `${this.urlApi}/region/${region}`;
    return this.http.get<Pais[]>(url, { params: this.params });
  }
}
