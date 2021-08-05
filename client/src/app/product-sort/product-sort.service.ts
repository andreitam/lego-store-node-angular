import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { Product } from '../types/product';
import { SortCategory } from './types/sort-category';
import { SORTTYPES } from './types/sort-types';


@Injectable({
  providedIn: 'root'
})
export class ProductSortService {
  sortedProducts$: Product[] | any = [];

  getSortCategories(): Observable<SortCategory[]> {
    const sortCategories = of(SORTTYPES);
    return sortCategories;
  }

  getSortedProducts(sortCategory: SortCategory, products: Product[]): Observable<Product[]> {
    this.sortedProducts$ = products;

    if (sortCategory.property === 'price') {
      if (sortCategory.ascending === true) {
        this.sortedProducts$.sort((a: Product, b: Product) => (a.price < b.price) ? -1 : 1);
      }
      else {
        this.sortedProducts$.sort((a: Product, b: Product) => (a.price < b.price) ? 1 : -1);
      }
    }

    else if (sortCategory.property === 'rating') {
      if (sortCategory.ascending === true) {
        this.sortedProducts$.sort((a: Product, b: Product) => (a.rating < b.rating) ? -1 : 1);
      }
      else {
        this.sortedProducts$.sort((a: Product, b: Product) => (a.rating < b.rating) ? 1 : -1);
      }
    }

    return new Observable<Product[]>(subscriber => subscriber.next(this.sortedProducts$));
  }

}
