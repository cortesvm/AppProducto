import { SProductoService } from './../../service/sproducto.service';
import { Component, inject, Input } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() miProducto!: IProduct;


  sProductoService = inject(SProductoService);
  arrProductos: IProduct[];


  constructor() {
    this.arrProductos = [];
  }


  async ngOnInit() {
    this.arrProductos = await this.sProductoService.getAllProducts();
  }

  deleteProducto(producto: IProduct) {
    this.sProductoService.deteleByname(producto.name);
  }

}

