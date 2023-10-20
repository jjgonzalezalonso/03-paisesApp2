import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interfaces';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css']
})
export class PorRegionComponent {
  regiones: string []=['africa', 'americas','asia','europe','oceania'];
  regionActiva: string='';
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) { }

  activarRegion(region: string){
    if(region==this.regionActiva){return;}
    this.regionActiva= region;
    this.buscarRegion(this.regionActiva);
  }

  buscarRegion(termino: string) {
    //console.log(this.termino);
    this.termino = termino;
    this.hayError = false;
    this.paisService.buscarRegion(this.termino).subscribe({
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
