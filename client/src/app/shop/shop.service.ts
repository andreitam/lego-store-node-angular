import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ThemesService } from '../services/themes.service';
import { Theme } from '../types/theme';
import { ShopCategory } from './types/shop-category';
import { SHOP_CATEGORY_TYPES } from './types/shop-category-types';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private themesService: ThemesService) { }

  getShopCategories(): Observable<ShopCategory[]> {
    const shopCategories = SHOP_CATEGORY_TYPES;
    //getThemes
    this.themesService.getThemes()
          .subscribe((themes: Theme[]) => {
                for (let theme of themes) {
                  shopCategories[0].items.push({label: theme.name, id: theme.theme_id, selected: false});
                 }
                });
    return of(shopCategories);
  }
}
