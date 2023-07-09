import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { OrderItem, Product, ProductService } from '../Services/product.service';
import { OrderService } from '../Services/order.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {

  order!: any;
  allProducts: OrderItem[] = []
  selectedProductIndices: number[] = [];

  constructor(private orderService: OrderService, private authService: AuthService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.order = this.authService.getOrder();
  
    this.productService.getAllProducts().subscribe(products => {
      this.allProducts = products.map(product => ({
        product: product,
        orderAmount: 0
      }));
    });
  }
  

  addProductToOrder(product: OrderItem, index: number) {
    this.orderService.addProductToOrder(product, this.order).subscribe()

    this.selectedProductIndices.push(index);
  }

  isRowSelected(index: number): boolean {
    return this.selectedProductIndices.includes(index);
  }

  submitForm() {
    throw new Error('Method not implemented.');
  }
}
