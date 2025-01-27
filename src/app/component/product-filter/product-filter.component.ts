    import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
    import { IProduct } from '../../interfaces/iproduct';
    import { SProductoService } from '../../service/sproducto.service';
    import { FormsModule, NgForm } from '@angular/forms';
    
    @Component({
        selector: 'app-product-filter',
        standalone: true,
        imports: [FormsModule],
        templateUrl: './product-filter.component.html',
        styleUrls: ['./product-filter.component.css']
    })
    export class ProductFilterComponent implements OnInit {
    
        sProductoService = inject(SProductoService);
        arrProductos: IProduct[] = [];
        productos: IProduct[] = [];
    
        @Output() productosFiltrados = new EventEmitter<IProduct[]>();
    
        filtro: any = {
            name: '',
            category: '',
            price: 0,
            active: false
        };
    
        constructor() { }
    
        ngOnInit(): void { }
    
        getDataFilter(miForm: NgForm): void {
            console.log("Datos del formulario:", miForm.value);
    
            // Guardamos el filtro en la variable
            this.filtro = miForm.value;
    
            // Llamamos al servicio con los filtros
            const productosFiltrados = this.sProductoService.getFilteredProducts(this.filtro);
            console.log('Productos filtrados:', productosFiltrados);
    
            // Emitimos los productos filtrados
            this.productosFiltrados.emit(productosFiltrados);
        }
    }
    