import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Pais } from '../../interfaces/pais.interface';
import { tap } from 'rxjs/operators';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorPaisComponent {
  termino: string = '';
  hayError: boolean = false;
  mostrarSugerencias: boolean = false;
  paises: Pais[] = [];
  paisesSugeridos: Pais[] = [];

  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
    this.mostrarSugerencias = false;
    this.paisesSugeridos = [];
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarPais(termino).subscribe(
      (paises) => {
        this.paises = paises;
      },
      (err) => {
        this.hayError = true;
        this.paises = [];
      }
    );
  }

  sugerencias(termino: string) {
    this.mostrarSugerencias = true;
    this.termino = termino;
    this.paisesSugeridos = [];
    console.log('debounce sugerencias en buscar por pais');
    this.hayError = false;

    this.paisService
      .buscarPais(termino)
      .pipe(tap(console.log))
      .subscribe((paises) => (this.paisesSugeridos = paises.splice(0, 5)));
  }
}
