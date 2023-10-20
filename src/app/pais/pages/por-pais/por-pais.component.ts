import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interfaces';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css']
})
export class PorPaisComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  paisesSugeridos: Country[] = [];
  mostrarSugerencias:boolean=false;

  constructor(private paisService: PaisService) { }

  sugerencias(termino: string) {
    this.termino = termino;
    this.hayError = false;
    this.mostrarSugerencias=true;
    this.paisService.buscarPais(this.termino).subscribe({
      next: (paises) => {
        this.paisesSugeridos = paises.splice(0,5);   
      },
      error: (e) => {
        this.paisesSugeridos =[];
      }
    });
  }

  buscar(termino: string) {
    //console.log(this.termino);
    this.termino = termino;
    this.hayError = false;
    this.mostrarSugerencias=false;
    this.paisService.buscarPais(this.termino).subscribe({
      next: (paises) => {
        this.paises = paises;
        console.log(paises);
        console.log(paises[0].capital);
      },
      error: (e) => {
        console.log(e);
        this.hayError = true;
      }
    });
  }

}


