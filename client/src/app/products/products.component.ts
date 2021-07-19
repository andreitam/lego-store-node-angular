import { Component, OnInit } from '@angular/core';
import { Product } from '../types/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  page: number = 1;
  pageSize: number =12;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
        .subscribe(products => this.products = products);
  }

  sortAscending(): void {
    this.products.sort( (a: Product, b: Product) => (a.price < b.price) ? -1 : 1);
  }

  sortDescending(): void {
    this.products.sort((a: Product, b: Product) => (a.price < b.price) ? 1 : -1);
  }

  sortByRating(): void {
    this.products.sort((a: Product, b: Product) => (a.rating < b.rating) ? 1 : -1);
  }

}
