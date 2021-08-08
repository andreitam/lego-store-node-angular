import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductFilterService } from '../product-filter/product-filter.service';
import { BooleanFilterCategory } from '../product-filter/types/boolean-filter-category';
import { RangeFilterCategory } from '../product-filter/types/range-filter-category';
import { ThemesService } from '../services/themes.service';
import { Product } from '../types/product';
import { Theme } from '../types/theme';
import { ShopService } from './shop.service';
import { ShopCategory } from './types/shop-category';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  //only theme category
  shopCategories: ShopCategory[] = [];

  constructor(private shopService: ShopService,
    private themeService: ThemesService) {}

  ngOnInit(): void {
    this.getShopCategories();
  }

  getShopCategories(): void {
    this.shopService.getShopCategories()
           .subscribe(shopCategories => this.shopCategories = shopCategories)
  }


  selectCategory(): void {

  }

}
