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
      let filteredProducts: Product[] = [];
      const checked = this.checkIfChecked(rangeFilterCategories) || this.checkIfChecked(booleanFilterCategories);
      if(checked) {
        const productsFilteredByPrice = this.filterByRangeCategory(products, 'Price', rangeFilterCategories);
        const productsFilteredByAge =  this.filterByRangeCategory(products, 'Age', rangeFilterCategories);
        const productsFilteredByPieceCount =  this.filterByRangeCategory(products, 'Piece Count', rangeFilterCategories);
        const productsFilteredByAvailability =  this.filterByBooleanCategory(products, 'Availability', booleanFilterCategories);
        filteredProducts = this.intersection(productsFilteredByPrice, productsFilteredByAge,
                            productsFilteredByPieceCount, productsFilteredByAvailability);
      }
      else filteredProducts = products;

      return new Observable<Product[]>(subscriber => subscriber.next(filteredProducts));
  }

  filterByRangeCategory(products: Product[], categoryTitle: String, rangeFilterCategories: RangeFilterCategory[]): Product[] {
    let arrayProducts: Product[] = [];
    switch(categoryTitle) {
      case 'Price':
          rangeFilterCategories.filter(category => category.title === categoryTitle)[0]
                               .items.filter(item =>item.selected === true)
                               .forEach(item => {
                                  arrayProducts = arrayProducts.concat(
                                    products.filter(product =>
                                      product.price >= item.minValue && product.price <= item.maxValue
                                      )
                                    )
                                });
        break;
      case 'Age':
          rangeFilterCategories.filter(category => category.title === categoryTitle)[0]
                               .items.filter(item =>item.selected === true)
                               .forEach(item => {
                                  arrayProducts = arrayProducts.concat(
                                    products.filter(product =>
                                      product.age >= item.minValue && product.age <= item.maxValue
                                      )
                                    )
                                });
        break;
      case 'Piece Count':
          rangeFilterCategories.filter(category => category.title === categoryTitle)[0]
                               .items.filter(item =>item.selected === true)
                               .forEach(item => {
                                  arrayProducts = arrayProducts.concat(
                                    products.filter(product =>
                                      product.piece_count >= item.minValue && product.piece_count <= item.maxValue
                                      )
                                    )
                                });
        break;
    }
    return arrayProducts;
  }

  filterByBooleanCategory(products: Product[], categoryTitle: String, booleanFilterCategories: BooleanFilterCategory[]): Product[] {
    let arrayProducts: Product[] = [];
    booleanFilterCategories.filter(category => category.title === categoryTitle)[0]
                           .items.filter(item =>item.selected === true)
                           .forEach(item => {
                             arrayProducts = arrayProducts.concat(
                               products.filter(product => product.availability === item.label)
                               )
                            })
    return arrayProducts;
  }

  intersection(...args: any[]): Product[]{
    let intersectedProducts: Product[] = [];
    let argumentList = [];
    //check argument array is empty
    for (let arg of arguments) {
      if (arg.length !== 0) argumentList.push(arg);
    }
    console.log(argumentList);

    for(let i = 0; i < argumentList.length; i++) {
      let currentArgument = argumentList[i];
      for(let j = 0; j < currentArgument.length; j++) {
        let currentProduct = currentArgument[j];
        if (intersectedProducts.indexOf(currentProduct) === -1) {
          let exists = true;
          for(let k = 0; k < argumentList.length; k++) {
            if(argumentList[k].indexOf(currentProduct) === -1) {
              exists = false;
              break;
            }
          }
          if (exists === true) {
            intersectedProducts.push(currentProduct);
            console.log(currentProduct);
          }

        }
      }
    }

    return intersectedProducts;
  }

  checkIfChecked(categoryArray: RangeFilterCategory[] | BooleanFilterCategory[]): Boolean {
      for(let category of categoryArray) {
        if (category.items.some(item => item.selected === true)) {
          return true;
        }
      }
      return false;
  }

}




