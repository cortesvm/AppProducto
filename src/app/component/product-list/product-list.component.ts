import { Component, inject, Input } from '@angular/core';

import { ProductCardComponent } from "../product-card/product-card.component";
import { SProductoService } from '../../service/sproducto.service';
import { IProduct } from '../../interfaces/iproduct';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  @Input() productos: any; // poner IProduct en vez de any

  //Inyectar el servicio
  private sproductoService = inject(SProductoService);

  constructor() {
    this.productos = [];
  }

  ngOnInit(): void {
    this.productos = this.sproductoService.getAllProducts();
  }

  onFilterApplied(filteredProducts: IProduct[]): void {
    console.log('Actualizando filtrado')
    this.productos = filteredProducts;
  }
}
