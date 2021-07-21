import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from '../types/product';
import { Sort } from '../types/sort';
import { Availability } from '../types/availability';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {
  priceSelect = [
    '$0 - $25',
    '$25 - $75',
    '$75 - $100',
    '$100+'];
  ageSelect = [
    '2+',
    '4+',
    '6+',
    '9+',
    '13+',
    '18+'];
  pieceCountSelect = [
    '1-99',
    '100-249',
    '250-499',
    '500-999',
    '1000+'];
  availability = [
    Availability.Availablenow,
    Availability.Coomingsoon,
    Availability.Outofstock,
    Availability.Uponorder];

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
    if (x==='2+')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.age >= 2);
    if (x==='4+')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.age >= 4);
    if (x==='6+')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.age >= 6);
    if (x==='9+')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.age >= 9);
    if (x==='13+')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.age >= 13);
    if (x==='18+')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.age >= 18);
    if (x==='1-99')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.piece_count < 100);
    if (x==='100-249')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.piece_count >= 100 && product.price < 249);
    if (x==='250-499')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.piece_count >= 250 && product.price < 500);
    if (x==='500-999')
      this.filteredProducts$ = this.filteredProducts$.filter(product => product.piece_count >= 500 && product.price < 999);
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
    else
      this.productService.getProducts().subscribe(products => this.filteredProducts$ = products);
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
