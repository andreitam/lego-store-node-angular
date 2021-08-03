import { Injectable } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../types/product';
import { BehaviorSubject, Subject } from 'rxjs';
import { Availability } from '../types/availability';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {
  filterCriteria$ = new Subject<String>();

  filteredProducts$: Product[] = [];

  subscription = this.filterCriteria$.subscribe(x => {
    if (x==='$0 - $25')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.price < 25)
    if (x==='$25 - $75')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.price >= 25 && product.price < 75);
    if (x==='$75 - $100')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.price >= 75 && product.price < 100);
    if (x==='$100+')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.price >= 100);
    if (x==='2 - 3')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.age >= 2 && product.age < 3);
    if (x==='4 - 5')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.age >= 4 && product.age < 5);
    if (x==='6 - 8')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.age >= 6 && product.age < 8);
    if (x==='9 - 12')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.age >= 9 && product.age < 12);
    if (x==='13 -17')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.age >= 13 && product.age < 17);
    if (x==='18+')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.age >= 18);
    if (x==='1 - 99')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.piece_count < 100);
    if (x==='100 - 249')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.piece_count >= 100 && product.piece_count < 249);
    if (x==='250 - 499')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.piece_count >= 250 && product.piece_count < 500);
    if (x==='500 - 999')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.piece_count >= 500 && product.piece_count < 999);
    if (x==='1000+')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.piece_count >= 1000);
    if (x===Availability.Availablenow)
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.availability === "Available now");
    if (x===Availability.Coomingsoon)
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.availability === "Coming soon");
    if (x===Availability.Outofstock)
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.availability === "Out of stock");
    if (x===Availability.Uponorder)
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.availability === "Upon order");
    // else
    //   this.productService.getProducts().subscribe(products => this.filteredProducts$ = products);
  })

  constructor(private productService: ProductService) { }

  getFilteredProducts(filter: string, products: Product[]) {
    //get products from product component view
    this.filteredProducts$ = products;
    //filter according to selected criteria
    this.filterCriteria$.next(filter);
    //return subject to be subscribed to
    return new BehaviorSubject<Product[]>(this.filteredProducts$);
   }
}
