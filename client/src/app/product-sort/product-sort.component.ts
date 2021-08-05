import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  unsortedProducts: Product[] | any =[];

  sorted: Boolean = false;

  constructor(private productSortService: ProductSortService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getSortCategories();
  }

  getSortCategories(): void {
    this.productSortService.getSortCategories()
        .subscribe(sortCategories => this.sortCategories = sortCategories);
  }

  sortByCategory(sortCategory: SortCategory): void {
    if(this.sorted === false) {   
      //if sorting was not made store the list with products  
      [...this.unsortedProducts] = this.products;
      if (sortCategory.default !== true) {
        this.productSortService.getSortedProducts(sortCategory, this.products)
        .subscribe((products: Product[] | undefined) => this.newSortedProducts.emit(products));
        this.sorted = true; 
      }
      else {
        this.newSortedProducts.emit(this.products);
      }
    }
    else if (this.sorted === true) {
      if (sortCategory.default !== true) {
        this.productSortService.getSortedProducts(sortCategory, this.products)
        .subscribe((products: Product[] | undefined) => this.newSortedProducts.emit(products));
      }
      else {
        //if sorting was already made return the unsorted list and reset bit
        this.newSortedProducts.emit(this.unsortedProducts);
        this.sorted = false;
      }
    }

  }

}
