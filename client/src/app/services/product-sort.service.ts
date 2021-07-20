import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from '../types/product';
import { Sort } from '../types/sort';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductSortService {
  sortCriteria$ = new Subject<Sort>();

  sortedProducts$: Product[] = [];

  subscription = this.sortCriteria$.subscribe(x => {
    if (x===0) this.productService.getProducts().subscribe(products => this.sortedProducts$ = products);
    if (x===1) this.sortedProducts$.sort((a: Product, b: Product) => (a.price < b.price) ? -1 : 1);
    if (x===2) this.sortedProducts$.sort((a: Product, b: Product) => (a.price < b.price) ? 1 : -1);
    if (x===3) this.sortedProducts$.sort((a: Product, b: Product) => (a.rating < b.rating) ? 1 : -1);
  })

  constructor(private productService: ProductService) { }

   getSortedProducts(number: Sort, products: Product[]) {
    //get products from product component view
    this.sortedProducts$ = products;
    //sort according to selected criteria
    this.sortCriteria$.next(number);
    //return subject to be subscribed to
    return new BehaviorSubject<Product[]>(this.sortedProducts$);
   }

}
