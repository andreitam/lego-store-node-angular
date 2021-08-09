import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CriteriaCategory } from './types/criteria-category';
import { CRITERIA_SHOPPING_TYPES } from './types/criteria-category-types';

@Injectable({
  providedIn: 'root'
})
export class ProductViewService {

  constructor() { }

  getCriteriaCategories(): Observable<CriteriaCategory[]> {
    const rangeFilterCategories = of(CRITERIA_SHOPPING_TYPES);
    return rangeFilterCategories;
  }
}
