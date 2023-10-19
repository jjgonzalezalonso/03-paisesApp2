import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Country } from '../interfaces/pais.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  
  private apiUrl:string='https://restcountries.com/v3.1';

  constructor(private http:HttpClient){}

  buscarPais(termino:string){
    const url=`${this.apiUrl}/name/${termino}`;
    return this.http.get<Country[]>(url);
  }

  buscarCapital(termino:string){
    const url=`${this.apiUrl}/capital/${termino}`;
    return this.http.get<Country[]>(url);
  }

  getPaisPorAlpha(id:string){
    const url=`${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country[]>(url);
  }
}
