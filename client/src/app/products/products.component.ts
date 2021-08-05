import { Component, OnInit } from '@angular/core';
import { Product } from '../types/product';
import { ProductService } from '../services/product.service';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  page: number = 1;
  pageSize: number = 12;
  sortedProducts: Product[] = [];


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }


  getProducts(): void {
    this.productService.getProducts()
          .subscribe(products => {
            this.products = products;
          });
  }

  getSortedProducts(products: Product[]): void {
    this.products = products;
  }

  getFilteredProducts(products: Product[]): void {
    this.products = products;
    console.log('from products filtered', this.products)
  }

}
