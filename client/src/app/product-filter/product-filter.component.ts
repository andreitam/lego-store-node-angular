import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../types/product';
import { ProductFilterService } from './product-filter.service';
import { Availability } from '../types/availability';
import { BooleanFilterCategory } from './types/boolean-filter-category';
import { FilterCategory } from './types/filter-category';
import { RangeFilterCategory } from './types/range-filter-category';
import { Unit } from './types/unit';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  @Input() products: Product[] = [];

  @Output() newFilteredProducts = new EventEmitter<Product[]>();

  rangeCategories: RangeFilterCategory[] = [];

  booleanCategories: BooleanFilterCategory[] = [];

  constructor(private productFilterService: ProductFilterService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getRangeFilterCategories();
    this.getBooleanFilterCategories();
  }

  getRangeFilterCategories(): void {
    this.productFilterService.getRangeFilterCategories()
        .subscribe(rangeCategories => this.rangeCategories = rangeCategories);
  }

  getBooleanFilterCategories(): void {
    this.productFilterService.getBooleanFilterCategories()
        .subscribe(booleanCategories => this.booleanCategories = booleanCategories);
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }
  }

  filterProducts(): void {
    let tempProducts: Product[] = [];
    this.productService.getProducts()
          .subscribe((products: Product[]) => {
            tempProducts = products
            this.productFilterService.getFilteredProducts(tempProducts, this.rangeCategories, this.booleanCategories)
                            .subscribe((products: Product[] | undefined) => {
                              console.log('received from service', products);
                              this.newFilteredProducts.emit(products);
                            });
          });

    console.log('finished filtering')
  }

  resetProducts(): void {
    for (let rangeCategory of this.rangeCategories) {
      for (let item of rangeCategory.items) {
        item.selected = false;
      }
    }

    for (let booleanCategory of this.booleanCategories) {
      for (let item of booleanCategory.items) {
        item.selected = false;
      }
    }

    this.productService.getProducts()
          .subscribe(products => {
            this.newFilteredProducts.emit(products);
          })
  }

}
