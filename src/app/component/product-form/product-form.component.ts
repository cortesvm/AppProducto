import { IProduct } from './../../interfaces/iproduct';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { SProductoService } from '../../service/sproducto.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-product-form',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './product-form.component.html',
    styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

    arrProductos: IProduct[] = []

    nuevoproducto: IProduct = {
        name: "",
        description: "",
        _id: '',
        price: 0,
        category: "",
        image: "vacio",
        active: false,
    }

    modelForm: FormGroup;
    isNewObject: boolean = true;
    passValidator!: ValidatorFn;

    sProductoService = inject(SProductoService);

    constructor() {
        this.modelForm = new FormGroup({
            _id: new FormControl(null, [Validators.required, Validators.minLength(1)]),
            name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
            description: new FormControl(null, [Validators.required, Validators.minLength(5)]),
            category: new FormControl(null, []),
            price: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(120)]),
            image: new FormControl(null, []),
            active: new FormControl(null, []),
        }, [])

        this.arrProductos = [];
    }

    cargarDatos(): string {
        let html: string = "<hr><br>";
        this.arrProductos.forEach(IProduct => {
            html += `<p>ID:${IProduct._id} ${IProduct.name}</p> <p>descripcion: ${IProduct.description}</p> 
        <p>price: ${IProduct.price}</p> <p>Categoria: ${IProduct.category}</p> <p>image: ${IProduct.image}</p> 
        <p>active: ${IProduct.active}</p> <hr><br>`
        });
        return html;
    }

    getDataForm() {
        let producto: IProduct = this.modelForm.value as IProduct;
        this.sProductoService.insert(producto);
        this.modelForm.reset();
    }

    checkControl(formControlName: string, validador: string): boolean | undefined {
        return this.modelForm.get(formControlName)?.hasError(validador) && this.modelForm.get(formControlName)?.touched
    }
}


