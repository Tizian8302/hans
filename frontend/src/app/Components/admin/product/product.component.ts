import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../../../../../shared/types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  newProduct: Product = {
    id: '',
    name: '',
    price: 0.0,
    manufacturer: '',
    quantityType: '',
    type: ''
  };

  selectedProductIndices: number[] = []

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
  
  addProduct(): void {
    if (this.newProduct.name && this.newProduct.type && this.newProduct.price && this.newProduct.manufacturer && this.newProduct.quantityType) {
      this.productService.addProduct(this.newProduct).subscribe((products) => {this.products = products})
      this.clearNewProduct();
    }
  }
  
  updateProduct(product: Product, index: number): void {
    this.productService.updateProduct(product).subscribe((products) => {this.products = products})

    this.selectedProductIndices.push(index)
    setTimeout(() => {
      const highlightIndex = this.selectedProductIndices.indexOf(index);
      if (highlightIndex !== -1) {
        this.selectedProductIndices.splice(highlightIndex, 1);
      }
    }, 3000);
  }

  deleteProductByObject(product: Product) {
    if (product && product.id) {
      this.productService.deleteProduct(product.id).subscribe(
        (products) => {
          this.products = products
        }
      );
    }
  }
  
  deleteProduct(index: number): void {
    const product = this.products[index];
    this.deleteProductByObject(product)
  }

  isRowSelected(index: number): boolean {
    return this.selectedProductIndices.includes(index);
  }

  clearNewProduct(): void {
    this.newProduct = {
      id: '',
      name: '',
      price: 0.0,
      manufacturer: '',
      quantityType: '',
      type: ''
    };
  }
}
