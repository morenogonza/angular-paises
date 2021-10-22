import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Pais } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
      button {
        margin: 5px;
      }
      .small-flag {
        width: 30px;
      }
    `,
  ],
})
export class PorRegionComponent {
  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];

  regionActiva = '';
  paises: Pais[] = [];

  constructor(private paisService: PaisService) {}

  classPorRegion(region: string): string {
    return region === this.regionActiva
      ? 'btn btn-primary'
      : 'btn btn-outline-primary';
  }

  activarRegion(region: string) {
    if (region === this.regionActiva) return;

    this.regionActiva = region;
    this.paisService
      .buscarPorRegion(region)
      .subscribe((paises) => (this.paises = paises));
  }
}
