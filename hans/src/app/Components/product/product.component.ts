import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public products: Product[] = []
  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.service.getAllProducts().subscribe(
      products => this.products = products
    );
  }

}
