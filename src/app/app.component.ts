import { Component } from '@angular/core';
import { ProductCardComponent } from "./component/product-card/product-card.component";
import { ProductFormComponent } from './component/product-form/product-form.component';
import { ProductFilterComponent } from "./component/product-filter/product-filter.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductCardComponent, ProductFormComponent, ProductFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AppProducto';
}
