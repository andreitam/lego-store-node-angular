import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../types/product';
import { Sort } from './types/sort';
import { ProductSortService } from './product-sort.service';

@Component({
  selector: 'app-product-sort',
  templateUrl: './product-sort.component.html',
  styleUrls: ['./product-sort.component.scss']
})
export class ProductSortComponent implements OnInit {
  @Input() products: Product[] = [];

  @Output() newSortedProducts = new EventEmitter<Product[]>();

  sortTypeArray: Sort[] = [Sort.Default, Sort.Ascending, Sort.Descending, Sort.Rating];

  constructor(private productSortService: ProductSortService) { }

  ngOnInit(): void {
  }

  sort(sort: Sort, products: Product[]): void {
    this.productSortService.getSortedProducts(sort, products)
          .subscribe(products => this.newSortedProducts.emit(products));
  }

}
