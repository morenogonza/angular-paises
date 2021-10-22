import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { PaisService } from '../../services/pais.service';
import { Pais } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [],
})
export class VerPaisComponent implements OnInit {
  pais!: Pais[];
  hayError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paiseService: PaisService
  ) {}

  ngOnInit(): void {
    console.log(this.hayError);
    // de esta manera se hace con switchMap que es un operador de RxJS, que sirve para utilizar un subscribe que depende de otro subscribe
    this.activatedRoute.params
      .pipe(
        // los pipes trabajan con el producto de los observables (en este caso el observable es el subscribe)
        switchMap(({ id }) => this.paiseService.buscarPaisPorCodigo(id)),
        tap(console.log) // -> solo sirve para hacer el console log
      )
      .subscribe((pais) => (this.pais = pais));

    // this.activatedRoute.params.subscribe(({ id }) => {
    //   this.PaiseService.buscarPaisPorCodigo(id).subscribe((pais) => {
    //     console.log(pais);
    //   });
    // });
  }
}
