import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ThemesService } from '../services/themes.service';
import { Availability } from '../types/availability';
import { Theme } from '../types/theme';
import { ProductFormService } from './product-form.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  isSubmitted = false;
  themes: Theme[] = [];
  availabilities: Availability[] = [];

  productForm = this.fb.group({
    product_id: [''],
    name: ['', Validators.required],
    price: ['', Validators.required],
    discount: [''],
    rating: [''],
    age: ['', Validators.required],
    piece_count: [''],
    availability: ['', Validators.required],
    description: [''],
    theme_id: ['', Validators.required],
    image1: [null, Validators.required],
    image2: [null, Validators.required],
    image3: [null, Validators.required]
  });

  get f() { return this.productForm.controls; }

  constructor(private fb: FormBuilder,
    private productFormService: ProductFormService,
    private themesService: ThemesService,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.availabilities = this.productFormService.getAvailabilities();
    this.getThemes();
  }

  getThemes() {
    this.themesService.getThemes()
          .subscribe((themes: Theme[]) => {this.themes = themes; console.log(this.themes)});
  }

  onSubmit() {
    this.isSubmitted = true;
    console.warn(this.productForm.value);
    //prepare form
    var formData: any = new FormData();
    formData.append("name", this.productForm.get('name')?.value);
    formData.append("price", this.productForm.get('price')?.value);
    formData.append("discount", this.productForm.get('discount')?.value);
    formData.append("rating", this.productForm.get('rating')?.value);
    formData.append("age", this.productForm.get('age')?.value);
    formData.append("piece_count", this.productForm.get('piece_count')?.value);
    formData.append("availability", this.productForm.get('availability')?.value);
    formData.append("description", this.productForm.get('description')?.value);
    formData.append("theme_id", this.productForm.get('theme_id')?.value);
    formData.append("image1", this.productForm.get('image1')?.value);
    formData.append("image2", this.productForm.get('image2')?.value);
    formData.append("image3", this.productForm.get('image3')?.value);
    console.log(formData.toString);
    //post to Server
    this.productService.postProduct(formData);
    //clear form data
    this.productForm.reset();
  }

  //toi be made dynamic
  uploadFile(event: any, pos: number) {
    const file = (event.target as HTMLInputElement | any).files[0];
    switch (pos) {
      case 1:
        this.productForm.patchValue({
          image1: file
        });
        break;
      case 2:
        this.productForm.patchValue({
          image2: file
        });
        break;
      case 3:
        this.productForm.patchValue({
          image3: file
        });
        break;

    }
  }
}
