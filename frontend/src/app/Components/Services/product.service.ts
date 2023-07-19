import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../../../shared/types';;

const port = 3000
const url = `http://localhost:${port}/api`

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  addProduct(newProduct: Product): Observable<Product[]>  {
    return this.http.post<Product[]>(`${url}/products`, newProduct);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${url}/products/${id}`)
  }

  updateProduct(updatedProduct: Product): Observable<Product[]> {
    return this.http.put<Product[]>(`${url}/products/${updatedProduct.id}`, updatedProduct)
  }

  deleteProduct(id: string): Observable<Product[]> {
    return this.http.delete<Product[]>(`${url}/product/${id}`)
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${url}/products/`)
  }
}
