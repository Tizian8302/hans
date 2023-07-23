import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ProductService } from '../Services/product.service';
import { OrderService } from '../Services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderItem } from '../../../../../shared/types';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {

  order!: any;
  allProducts: OrderItem[] = []
  selectedProductIndices: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private productService: ProductService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    
    let foundOrder
    this.route.queryParamMap.subscribe((params) => {
      this.orderService.getOrders().subscribe((orders) => {
        foundOrder = orders.find(order => order.id == params.get('id'))
        if(foundOrder) this.order = foundOrder
      });
    })

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

  showSuccessMessage() {
    this._snackBar.open('Ihre Bestellung wurde erfolgreich gespeichert. Sie können diese Seite nun schliessen', 'X', {
      duration: 5000
    })
  }
}
