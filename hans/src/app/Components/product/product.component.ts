import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { Product } from '../Services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  newProduct: Product = {
    id: '1',
    name: '',
    price: 0.0,
    manufacturer: '',
    quantityType: '',
    type: ''
  };

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  deleteProduct(index: number): void {
    const product = this.products[index];
    if (product && product.id) {
      this.productService.deleteProduct(product.id).subscribe(
        (products) => {
          this.products = products
        }
      );
    }
  }
  

  addProduct(): void {
    if (this.newProduct.name && this.newProduct.price && this.newProduct.manufacturer && this.newProduct.quantityType) {
      this.productService.addProduct(this.newProduct).subscribe((products) => {this.products = products})
      this.clearNewProduct();
    }
  }

  updateProduct(product: Product): void {

  }

  clearNewProduct(): void {
    this.newProduct = {
      id: '1',
      name: '',
      price: 0.0,
      manufacturer: '',
      quantityType: '',
      type: ''
    };
  }
}
