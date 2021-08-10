import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form.component';
import { MainComponent } from './main/main.component';
import { ProductViewComponent } from './product-view/product-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'main/:id', component: MainComponent},
  { path: 'theme', component: MainComponent},
  { path: 'add', component: ProductFormComponent},
  { path: 'edit/:id', component: ProductFormComponent},
  { path: 'products/:id', component: ProductViewComponent}
  //guards for login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
