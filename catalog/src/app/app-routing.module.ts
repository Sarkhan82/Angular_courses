import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { CustomersComponent } from './customers/customers.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LoginComponent } from './login/login.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path : "login", component : LoginComponent},
  // Route par défault
  {path : "", component : LoginComponent},
  // Comment déclarer les routes

  // création d'un route d'authentification avec un guard pour la protéger
  {path : "admin", component : AdminTemplateComponent, canActivate : [AuthenticationGuard],
  children : [
    {path : "products", component : ProductsComponent},
    {path : "customers", component : CustomersComponent},
    {path : "new-product", component : NewProductComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
