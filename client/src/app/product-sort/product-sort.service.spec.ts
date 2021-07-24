import { TestBed } from '@angular/core/testing';

import { ProductSortService } from './product-sort.service';

describe('ProductSortService', () => {
  let service: ProductSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
