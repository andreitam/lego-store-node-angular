import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../types/product';
import { ProductSortService } from './product-sort.service';
import { SortCategory } from './types/sort-category';

@Component({
  selector: 'app-product-sort',
  templateUrl: './product-sort.component.html',
  styleUrls: ['./product-sort.component.scss']
})
export class ProductSortComponent implements OnInit {
  @Input() products: Product[] = [];

  @Output() newSortedProducts = new EventEmitter<Product[]>();

  sortCategories: SortCategory[] = [];

  constructor(private productSortService: ProductSortService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getSortCategories();
  }

  getSortCategories(): void {
    this.productSortService.getSortCategories()
        .subscribe(sortCategories => this.sortCategories = sortCategories);
  }

  sortByCategory(sortCategory: SortCategory): void {
    console.log(sortCategory);
    //if default is selected make ajax call
    if (sortCategory.default === true) {
      this.productService.getProducts()
          .subscribe((products: Product[] | undefined) => {this.newSortedProducts.emit(products);});
    }
    else {
      this.productSortService.getSortedProducts(sortCategory, this.products)
           .subscribe((products: Product[] | undefined) => {this.newSortedProducts.emit(products);});
    }

  }



}
