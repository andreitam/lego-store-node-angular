import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { ThemesService } from '../services/themes.service';
import { Availability } from '../types/availability';
import { Product } from '../types/product';
import { Theme } from '../types/theme';
import { ImageService } from './image.service';
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
  product: Product;
  isEditMode: boolean = false;
  imageDisplay: string[] = [];

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
    private productService: ProductService,
    private route: ActivatedRoute,
    private imageService: ImageService) { }

  ngOnInit(): void {
    this.availabilities = this.productFormService.getAvailabilities();
    this.getThemes();
    //check if route is parameterised with /:id
    const productId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    if (Boolean(productId) !== false) {
      console.log('edit mode')
      this.isEditMode = true;
      this.getProduct(productId);
    }
    else {
      console.log('add mode');
    }
  }

  getThemes() {
    this.themesService.getThemes()
          .subscribe((themes: Theme[]) => this.themes = themes);
  }

  onSubmit() {
    this.isSubmitted = true;
    console.warn(this.productForm.value);
    //prepare form with FormData object because of image uploading
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
    //check if add or edit mode and POST/PUT to Server
    if (this.isEditMode) {
      this.productService.putProduct(formData, this.product.product_id);
      console.log('put request');
    }
    else this.productService.postProduct(formData);
    //clear form data
    this.productForm.reset();
    this.imageDisplay = [];
  }

  getProduct(productId): void {
    //get product from server
    this.productService.getProduct(productId)
          .subscribe(product => {
              console.log(product);
              this.product = product;
              this.updateForm(this.product);
    });
  }

  //to be made dynamic
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

  updateForm(product: Product) {
    //update all except image files
    this.productForm.patchValue({
      product_id: product.product_id,
      name: product.name,
      price: product.price,
      discount: product.discount,
      rating: product.rating,
      age: product.age,
      piece_count: product.piece_count,
      availability: product.availability,
      description: product.description,
      theme_id: product.theme_id
    });
    //get blobs from server and recreate file for image1
    this.imageService.getDataArrayBuffer(product.picture_url1)
          .subscribe(
              imgData => {
              console.log('this data',imgData);
              //reconstruct name
              const imageName = product.picture_url1.substring(product.picture_url1.lastIndexOf('/')+1);
              console.log(imageName);
              //reconstruct file
              const myFile = new File([imgData], imageName, {
                type: "image/jpg",
              });
              console.log(myFile);
              //update form
              this.productForm.patchValue({
                image1: myFile,
              });
             console.log(this.productForm.value);
          }
    );
    //get blobs from server as DataUrl for displaying in view image1
    this.imageService.getDataAsDastaUrl(product.picture_url1)
          .subscribe( imgData => this.imageDisplay.push(imgData))
    //get blobs from server and recreate file for image2
    this.imageService.getDataArrayBuffer(product.picture_url2)
          .subscribe(
              imgData => {
              console.log('this data',imgData);
              //reconstruct name
              const imageName = product.picture_url2.substring(product.picture_url2.lastIndexOf('/')+1);
              console.log(imageName);
              //reconstruct file
              const myFile = new File([imgData], imageName, {
                type: "image/jpg",
              });
              console.log(myFile);
              //update form
              this.productForm.patchValue({
                image2: myFile,
              });
        console.log(this.productForm.value);
    });
    //get blobs from server as DataUrl for displaying in view image2
    this.imageService.getDataAsDastaUrl(product.picture_url2)
          .subscribe( imgData => this.imageDisplay.push(imgData))
    //get blobs from server and recreate file for image3
    this.imageService.getDataArrayBuffer(product.picture_url3)
          .subscribe(
              imgData => {
              console.log('this data',imgData);
              //reconstruct name
              const imageName = product.picture_url3.substring(product.picture_url3.lastIndexOf('/')+1);
              console.log(imageName);
              //reconstruct file
              const myFile = new File([imgData], imageName, {
                type: "image/jpg",
              });
              console.log(myFile);
              //update form
              this.productForm.patchValue({
                image3: myFile,
              });
              console.log(this.productForm.value);
    });
    //get blobs from server as DataUrl for displaying in view image3
    this.imageService.getDataAsDastaUrl(product.picture_url3)
          .subscribe( imgData => this.imageDisplay.push(imgData))
  }


}
