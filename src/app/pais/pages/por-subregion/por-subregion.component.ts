import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interfaces';

@Component({
  selector: 'app-por-subregion',
  templateUrl: './por-subregion.component.html',
  styleUrls: ['./por-subregion.component.css']
})
export class PorSubregionComponent {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  subregiones: string[] = [];
  subregionesEuropa: string[] = ['Eastern Europe', 'Northern Europe', 'Southern Europe', 'Western Europe'];
  subregionesAfrica: string[] = ['Northern Africa', 'Eastern Africa', 'Middle Africa', 'Southern Africa', 'Western Africa'];
  subregionesAmerica: string[] = ['North America', 'South America', 'Central America', 'Caribbean'];
  subregionesAsia: string[] = ['Central Asia', 'Eastern Asia', 'South-eastern Asia', 'Southern Asia', 'Western Asia'];
  subregionesOceania: string[] = ['Australia and New Zealand', 'Melanesia ', 'Micronesia', 'Polynesia'];
  regionActiva: string = '';

  subregionActiva: string = '';
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  activarRegion(region: string) {
    if (region == this.regionActiva) {
      return;
    }

    this.regionActiva = region;

    switch (this.regionActiva) {
      case 'africa':
        this.subregiones = this.subregionesAfrica;
        this.activarSubregion(this.subregiones[0]);
        break;
      case 'europe':
        this.subregiones = this.subregionesEuropa;
        this.activarSubregion(this.subregiones[0]);
        break;
      case 'americas':
        this.subregiones = this.subregionesAmerica;
        this.activarSubregion(this.subregiones[0]);
        break;
      case 'asia':
        this.subregiones = this.subregionesAsia;
        this.activarSubregion(this.subregiones[0]);
        break;
      case 'oceania':
        this.subregiones = this.subregionesOceania;
        this.activarSubregion(this.subregiones[0]);
        break;
    }
  }

  activarSubregion(subregion: string) {
    if (subregion == this.subregionActiva) { return; }
    this.subregionActiva = subregion;
    this.buscarSubregion(this.subregionActiva);
  }

  buscarSubregion(termino: string) {
    //console.log(this.termino);
    this.termino = termino;
    this.hayError = false;
    this.paisService.buscarSubregion(this.termino).subscribe({
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
