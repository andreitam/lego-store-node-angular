import { Component, OnInit } from '@angular/core';
import { Product } from '../types/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router, RoutesRecognized } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  page: number = 1;
  pageSize: number = 12;


  constructor(private productService: ProductService,
    private route: ActivatedRoute, private router: Router, private activatedRoute : ActivatedRoute) {
      this.activatedRoute.url.subscribe(url =>{
        console.log(url);
        this.getProducts();
        });
     }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    //check if route is parameterised with /:id
    const themeId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.productService.getProducts()
          .subscribe(products => {
            (Boolean(themeId) !== false)
            ? this.products = products.filter(product => product.theme_id === themeId)
            : this.products = products;
            console.log(this.products);
          });
  }

  getSortedProducts(products: Product[]): void {
    this.products = products;
  }

  getFilteredProducts(products: Product[]): void {
    this.products = products;
  }

}
