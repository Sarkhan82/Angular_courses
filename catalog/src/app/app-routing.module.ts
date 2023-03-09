import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path : "login", component : LoginComponent},
  // Route par défault
  {path : "", component : LoginComponent},
  // Comment déclarer les routes
  {path : "products", component : ProductsComponent},
  {path : "customers", component : CustomersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
