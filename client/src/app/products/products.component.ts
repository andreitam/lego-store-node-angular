import { Component, OnInit } from '@angular/core';
import { Product } from '../types/product';
import { ProductService } from '../services/product.service';
import { ProductSortService } from '../services/product-sort.service';
import { Sort } from '../types/sort';
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

  constructor(private productService: ProductService,
    private productSortService: ProductSortService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
          .subscribe(products => this.products = products);
  }

  getSortedProducts(number: Sort, products: Product[]): void {
    this.productSortService.getSortedProducts(number, products)
          .subscribe(products => this.products = products);
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }
  }

}
