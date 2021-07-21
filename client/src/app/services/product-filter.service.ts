import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {
  priceSelect = ['$0 - $25', '$50 - $75', '$50 - $75', '$100+'];
  ratingSelect = [];
  ageSelect = [];
  pieceCountSelect = [];
  availability = [];

  constructor(private productService: ProductService) { }
}
