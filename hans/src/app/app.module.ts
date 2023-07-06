import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './Components/product/product.component';
import { HttpClientModule } from  '@angular/common/http';
import { ProductService } from './Components/Services/product.service';
import { CreateOrderComponent } from './Components/create-order/create-order.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './Components/admin/admin.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { AddProductsComponent } from './Components/add-products/add-products.component';

const appRoutes: Routes = [
  { path: 'orders', component: OrdersComponent },
  { path: 'products', component: ProductComponent },
  { path: 'admin', component: AdminLoginComponent},
  { path: 'addProducts', component: AddProductsComponent},
  { path: '**', component: CreateOrderComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CreateOrderComponent,
    OrdersComponent,
    AdminLoginComponent,
    AddProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
