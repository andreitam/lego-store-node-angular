import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ThemesService } from '../services/themes.service';
import { Product } from '../types/product';
import { Theme } from '../types/theme';
import { ProductViewService } from './product-view.service';
import { CriteriaCategory } from './types/criteria-category';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  product: Product |  undefined;
  images: string[] | undefined;
  criteriaCategories: CriteriaCategory[] = [];
  theme: Theme | undefined;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private productViewService: ProductViewService,
    private themesService: ThemesService) {
      this.activatedRoute.url.subscribe(url =>{
        console.log(url);
        this.getProductAndFillView();
        });
    }


  ngOnInit(): void {
      this.getCriteriaCategories();
      this.getProductAndFillView();
  }

  getProductAndFillView(): void {
    //check if route is parameterised with /:id
    const productId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    //get product from server
    this.productService.getProduct(productId)
          .subscribe(product => {
              console.log(product);
              this.product = product;
              //destruct product
              const {picture_url1, picture_url2, picture_url3, age, piece_count, theme_id} : any = this.product;
              //fill images array
              this.images = [picture_url1, picture_url2, picture_url3];
              //fill criteria array
              this.criteriaCategories[0].criteria = age;
              this.criteriaCategories[1].criteria = piece_count;
              //get theme object
              this.themesService.getTheme(theme_id)
                    .subscribe(theme => {
                      this.theme = theme;
                      this.criteriaCategories[2].criteria = theme.name;
                    });
              console.log(this.criteriaCategories);
    });
  }

  getCriteriaCategories(): void {
    this.productViewService.getCriteriaCategories()
        .subscribe(criteriaCategories => this.criteriaCategories = criteriaCategories);
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.product.product_id)
          .subscribe(data => console.log(data));
  }

}

