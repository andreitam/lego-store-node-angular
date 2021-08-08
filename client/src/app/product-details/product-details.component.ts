import { Component, OnInit } from '@angular/core';
import { Product } from '../types/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  getProduct(): void {

  }

}
