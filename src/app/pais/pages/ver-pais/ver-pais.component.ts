import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/pais.interfaces';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css']
})
export class VerPaisComponent implements OnInit {
  constructor(private paisService: PaisService, private activateRoute: ActivatedRoute) { }
  pais!:Country;

  ngOnInit(): void {
    // this.activateRoute.params
    //   .subscribe(param => {
    //     //console.log(param['id']);
    //     this.paisService.getPaisPorAlpha(param['id']).subscribe(pais => console.log(pais))
    //   })

    this.activateRoute.params
      .pipe(switchMap((param) => this.paisService.getPaisPorAlpha(param['id'])))
      .subscribe(pais => this.pais=pais[0]);
  }

}
