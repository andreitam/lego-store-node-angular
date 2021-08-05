import { Injectable } from '@angular/core';
import { Product } from '../types/product';
import { Observable, of} from 'rxjs';
import { RangeFilterCategory } from './types/range-filter-category';
import { RANGE_FILTER_TYPES } from './types/range-filter-types';
import { BooleanFilterCategory } from './types/boolean-filter-category';
import { BOOLEAN_FILTER_TYPES } from './types/boolean-filter-types';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {

  productsFilteredByPrice$: Product[] | any = [];
  productsFilteredByAge$: Product[] = [];
  productsFilteredByPieceCount$: Product[] = [];
  productsFilteredByAvailability$: Product[] = [];
  filteredProducts$: Product[] | any = [];
  
  getRangeFilterCategories(): Observable<RangeFilterCategory[]> {
    const rangeFilterCategories = of(RANGE_FILTER_TYPES);
    return rangeFilterCategories;
  }

  getBooleanFilterCategories(): Observable<BooleanFilterCategory[]> {
    const booleanFilterCategories = of(BOOLEAN_FILTER_TYPES);
    return booleanFilterCategories;
  }

  getFilteredProducts(products: Product[], rangeFilterCategories: RangeFilterCategory[], 
                      booleanFilterCategories: BooleanFilterCategory[]): Observable<Product[]> {
      console.log('ranges', rangeFilterCategories);
      console.log('booleans', booleanFilterCategories);
      //filter by price
      this.productsFilteredByPrice$ = this.filterByRangeCategory(products, 'Price', rangeFilterCategories);
      console.log(this.productsFilteredByPrice$); 
      this.productsFilteredByAge$ =  this.filterByRangeCategory(products, 'Age', rangeFilterCategories); 
      console.log(this.productsFilteredByAge$);
      this.productsFilteredByAge$ =  this.filterByRangeCategory(products, 'Piece Count', rangeFilterCategories); 
      console.log(this.productsFilteredByPieceCount$);   
      this.productsFilteredByAge$ =  this.filterByBooleanCategory(products, 'Availability', booleanFilterCategories); 
      console.log(this.productsFilteredByAvailability$);                      

      this.filteredProducts$ = this.productsFilteredByPrice$
      return new Observable<Product[]>(subscriber => subscriber.next(this.filteredProducts$));
  }

  filterByRangeCategory(products: Product[], categoryTitle: String, rangeFilterCategories: RangeFilterCategory[]): Product[] {
    let arrayProducts: Product[] = [];
    console.log(
      rangeFilterCategories.filter(category => category.title === categoryTitle)[0]
                           .items.filter(item =>item.selected === true)
                           .forEach(item => { 
                             arrayProducts = arrayProducts.concat(
                               products.filter(product => product.price >= item.minValue && product.price <= item.maxValue)
                               )
                            })
                                      
  );                  
    return (arrayProducts.length !== 0) ? arrayProducts : products;                 
  }

  filterByBooleanCategory(products: Product[], categoryTitle: String, booleanFilterCategories: BooleanFilterCategory[]): Product[] {
    let arrayProducts: Product[] = [];
    console.log(
      booleanFilterCategories.filter(category => category.title === categoryTitle)[0]
                           .items.filter(item =>item.selected === true)
                           .forEach(item => { 
                             arrayProducts = arrayProducts.concat(
                               products.filter(product => product.availability === item.label)
                               )
                            })
                                      
  );                  
    return (arrayProducts.length !== 0) ? arrayProducts : products;                 
  }


 
  


}




