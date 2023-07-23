import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './Components/admin/product/product.component';
import { HttpClientModule } from  '@angular/common/http';
import { ProductService } from './Components/Services/product.service';
import { CreateOrderComponent } from './Components/create-order/create-order.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './Components/admin/admin.component';
import { OrdersComponent } from './Components/admin/orders/orders.component';
import { AddProductsComponent } from './Components/add-products/add-products.component';
import { WeeklyOrderComponent } from './Components/admin/weekly-order/weekly-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const appRoutes: Routes = [
  { path: 'orders', component: OrdersComponent },
  { path: 'products', component: ProductComponent },
  { path: 'admin', component: AdminLoginComponent },
  { path: 'addProducts', component: AddProductsComponent },
  { path: 'weeklyOrder', component: WeeklyOrderComponent },
  { path: '**', component: CreateOrderComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CreateOrderComponent,
    OrdersComponent,
    AdminLoginComponent,
    AddProductsComponent,
    WeeklyOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
