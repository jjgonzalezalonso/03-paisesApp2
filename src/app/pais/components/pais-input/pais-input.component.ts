import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequiredValidator } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.css']
})
export class PaisInputComponent implements OnInit {

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Input() placeholder: string = '';
  // Creo un observable para detectar cuando se deja de modificar el input
  debouncer: Subject<string> = new Subject();

  termino: string = '';
  buscar() {
    this.onEnter.emit(this.termino);
  }

  teclaPresionada(event: any) {
    // pasamos el termino (input) al observable debouncer que está siempre ejecutandose
    this.debouncer.next(this.termino);
  }

  ngOnInit(): void {
    // debouncer está siempre ejecutandose en memoria
    this.debouncer
      .pipe(debounceTime(300)) //espera 300 milisegundos, valor es el termino(input)
      .subscribe(valor => {
        //console.log('debouncer:', valor); // escribe el valor de termino
        this.onDebounce.emit(valor); // lo enviamos al PADRE
      })
  }
}
