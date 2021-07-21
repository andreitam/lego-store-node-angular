import { Component, OnInit } from '@angular/core';
import { Product } from '../types/product';
import { ProductService } from '../services/product.service';
import { ProductSortService } from '../services/product-sort.service';
import { Sort } from '../types/sort';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { ProductFilterService } from '../services/product-filter.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  page: number = 1;
  pageSize: number = 12;
  filteredProducts: Product[] = [];

  constructor(private productService: ProductService,
    private productSortService: ProductSortService,
    public productFilterService: ProductFilterService) { }

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

  getFilteredProducts(filter: string, products: Product[]): void {
    // this.productFilterService.getFilteredProducts(filter, products)
    //       .subscribe(products => this.products = products);
  }

  updateFilters(filter: string) {
    console.log(filter);
      // Get all the checkboxes
      const checkBox = document.getElementById(filter) as HTMLInputElement;
      console.log(checkBox);
      // If the checkbox is checked, display the output text
      if (checkBox.checked == true){
          this.productFilterService.getFilteredProducts(filter, this.products)
           .subscribe(products => {
            this.filteredProducts = this.filteredProducts.concat(products)
          });
      } else {
        this.productFilterService.getFilteredProducts(filter, this.products)
           .subscribe(products => {
            this.filteredProducts = this.filteredProducts.filter(el => !products.includes(el))
          });
      }
      console.log(this.filteredProducts)
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }
  }

}
