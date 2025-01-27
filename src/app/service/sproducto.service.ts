import { IProduct } from './../interfaces/iproduct';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SProductoService {

  private apiUrl = 'https://jsonblob.com/api/1328619160766439424';
  arrProductos: IProduct[];
  id: number;
  // arrDescripcion: any;

  constructor() {
    this.arrProductos = [];
    this.id = 0;


    fetch("https://jsonblob.com/api/1328619160766439424")
      .then(response => response.json())
      .then(productos => {
        productos.forEach((element: any) => {
          this.arrProductos.push(element as IProduct);
        });
      });

  }


  async getAllProducts(): Promise<IProduct[]> {
    if (this.arrProductos.length < 1) {
      this.arrProductos = await this.cargaProducts()
    }
    return this.arrProductos;
  }

  // return  lastValueFrom(this.httpClient.get<IProduct[]>(this.apiUrl));
  cargaProducts(): Promise<IProduct[]> {
    return fetch(this.apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`); // Corrección de comillas
        }
        return response.json();
      })
      .then((data) => {  // Corrección en la sintaxis de la función arrow
        this.arrProductos = Array.isArray(data) ? data : data.productos;
        return this.arrProductos;
      })
      .catch((error) => {  // Corrección del parámetro error en catch
        console.error('Error al obtener los datos:', error);
        throw error;
      });
  }

  insert(producto: IProduct): string {
    producto._id = this.id.toString();
    let longitud = this.arrProductos.push(producto);
    this.id++;
    if (longitud) {
      return 'El producto ha sido insertado correctamente'
    }
    else {
      return 'No ha sido posible insertar el producto'
    }
  }


  deteleByname(name: String): IProduct[] {
    let i = this.arrProductos.findIndex(producto => producto.name == name);

    if (i != -1 && i >= 0 && i < this.arrProductos.length) {
      this.arrProductos.splice(i, 1);
    }

    return this.arrProductos;
  }
  
  getFilteredProducts(filtros: any): IProduct[] {
    let productosFiltrados = this.arrProductos;

    // Filtro por nombre
    if (filtros.name?.trim()) {
      productosFiltrados = productosFiltrados.filter(producto => 
        producto.name.toLowerCase().includes(filtros.name.toLowerCase())
      );
    }
    console.log('name')
    console.log(productosFiltrados)

    // Filtro por categoría
    if (filtros.category) {
      productosFiltrados = productosFiltrados.filter(producto => 
        producto.category.toLowerCase() === filtros.category.toLowerCase()
      );
    }
    console.log('category')
    console.log(productosFiltrados)

    // Filtro por precio
    if (filtros.price) {
      productosFiltrados = productosFiltrados.filter(producto => 
        producto.price <= filtros.price
      );
    }
    console.log('price')
    console.log(productosFiltrados)

    // Filtro por estado activo
    // if (filtros.active !== undefined) {
    //   productosFiltrados = productosFiltrados.filter(producto => 
    //     producto.active === filtros.active
    //   );
    // }
    // console.log('activo')
    // console.log(productosFiltrados)

    console.log('Final filtro')
    return productosFiltrados;
  }
}


