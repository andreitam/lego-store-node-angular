import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductSortComponent } from './product-sort/product-sort.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrandComponent } from './brand/brand.component';
import { ShopComponent } from './shop/shop.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MainComponent,
    ProductsComponent,
    ProductDetailsComponent,
    ProductSortComponent,
    ProductFilterComponent,
    BrandComponent,
    ShopComponent,
    ProductSortComponent,
    ProductFormComponent,
    ProductViewComponent,
    LoginRegisterComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
