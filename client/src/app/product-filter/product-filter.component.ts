import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../types/product';
import { ProductFilterService } from './product-filter.service';
import { Availability } from '../types/availability';
import { BooleanFilterCategory } from './types/boolean-filter-category';
import { FilterCategory } from './types/filter-category';
import { RangeFilterCategory } from './types/range-filter-category';
import { Unit } from './types/unit';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  @Input() products: Product[] = [];

  @Output() newFilteredProducts = new EventEmitter<Product[]>();

  filterRangesArray: RangeFilterCategory[] | undefined = [
    { title: 'Price',
      type: 'range',
      items: [
        {minValue: 0, maxValue: 25, unit: Unit.CurrencyDollar, selected: false},
        {minValue: 25, maxValue: 75, unit: Unit.CurrencyDollar, selected: false},
        {minValue: 75, maxValue: 100, unit: Unit.CurrencyDollar, selected: false},
        {minValue: 100, maxValue: Infinity, unit: Unit.CurrencyDollar, selected: false}
      ],
    },
    { title: 'Age',
      type: 'range',
      items: [
        {minValue: 2, maxValue: 3, unit: Unit.Age, selected: false},
        {minValue: 4, maxValue: 5, unit: Unit.Age, selected: false},
        {minValue: 6, maxValue: 8, unit: Unit.Age, selected: false},
        {minValue: 9, maxValue: 12, unit: Unit.Age, selected: false},
        {minValue: 13, maxValue: 17, unit: Unit.Age, selected: false},
        {minValue: 8, maxValue: Infinity, unit: Unit.Age, selected: false}
      ]
    },
    { title: 'Piece Count',
      type: 'range',
      items: [
        {minValue: 1, maxValue: 99, unit: Unit.Pieces, selected: false},
        {minValue: 100, maxValue: 249, unit: Unit.Pieces, selected: false},
        {minValue: 250, maxValue: 499, unit: Unit.Pieces, selected: false},
        {minValue: 500, maxValue: 999, unit: Unit.Pieces, selected: false},
        {minValue: 1000, maxValue: Infinity, unit: Unit.Pieces, selected: false}
      ]
    }];

  filterBooleanArray: BooleanFilterCategory[] | undefined = [
    { title : 'Availability',
      type: 'boolean',
      items: [
        { label: Availability.Availablenow, selected: false},
        { label: Availability.Coomingsoon, selected: false},
        { label: Availability.Outofstock, selected: false},
        { label: Availability.Uponorder, selected: false},
      ]
    }];

  productsFilterPrice: Product[] = [];
  productsFilterAge: Product[] = [];
  productsFilterPiece: Product[] = [];
  productsFilterAvailability: Product[] = [];

  selectedFilterRangeArray: RangeFilterCategory[] = [];


  constructor(private productsFilterService: ProductFilterService) { }

  ngOnInit(): void {
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }
  }

  filterRange(rangeFilterCategory: RangeFilterCategory) {
    let minVal: number = 0;
    let maxVal: number = 0;
    rangeFilterCategory.items.filter(item => item.selected === true)
                              .forEach(item => { console.log(item.selected);
                                (item.minValue < minVal) ? minVal = item.minValue : minVal = minVal;
                                (item.maxValue > maxVal) ? maxVal = item.maxValue : maxVal = maxVal;
                              })

    console.log(minVal, ' ', maxVal);
    // this.productsFilterPrice = this.products.filter(product => product.price >= minVal && product.price < maxVal);
    // console.log(this.productsFilterPrice);

  }

  filterBoolean(booleanFilterCategory: BooleanFilterCategory) {
    console.log(booleanFilterCategory);
  }

}
