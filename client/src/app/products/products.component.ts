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
  // filterState = {
  //   price: {
  //     '$0-$25': false,
  //     '$25-$75': false,
  //     '$75-$100': false,
  //     '$100+': false
  //   },
  //   age: {
  //     '2-3': false,
  //     '4-5': false,
  //     '6-8': false,
  //     '9-12': false,
  //     '13-17': false,
  //     '18+': false
  //   },
  //   pieceCount: {
  //     '1-99': false,
  //     '100 - 249': false,
  //     '250 - 499': false,
  //     '500 - 999': false,
  //     '1000+': false
  //   },
  //   availability: {
  //     'Available now': false,
  //     'Coming soon': false,
  //     'Out of stock': false,
  //     'Upon order': false
  //   }
  // }
  

  constructor(private productService: ProductService,
    private productSortService: ProductSortService,
    public productFilterService: ProductFilterService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  ngDoCheck(): void {
    console.log('check');
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input[type='checkbox']");
    for(let i = 0; i < inputs.length; i++) {
        console.log(inputs[i])
    }
  }

  getProducts(): void {
    this.productService.getProducts()
          .subscribe(products => {
            this.products = products;
          });
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

  }

  resetFilters() {
    //reset filtered products to array from server
    this.filteredProducts = this.products;
    //uncheck boxes
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input[type='checkbox']");
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].checked = false;
    }
  }



  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }
  }

}
