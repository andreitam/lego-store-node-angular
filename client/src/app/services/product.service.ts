import { Injectable } from '@angular/core';
import { Product } from '../types/product';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'http://localhost:5000/products';

  constructor(private http: HttpClient) { }

    /** GET products from the server */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(_ => console.log('fetched products')),
      );
  }

  /** POST: create the product on the server */
  postProduct(formData: FormData): void {
    this.http.post(this.productsUrl, formData).subscribe(
      (response) => console.log('succesfull post', response),
      (error) => console.log(error)
    )
  }

  /** GET hero by id. Return `undefined` when id not found */
  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product[]>(url)
      .pipe(
        map(products => products[0]), // returns a {0|1} element array
        tap(_ => console.log(`fetched product id=${id}`))
      );
  }

  /** DELETE: delete the product from the server */
  deleteProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;

    return this.http.delete<Product>(url)
    .pipe(
      tap(_ => console.log(`deleted product id=${id}`))
    );
  }

  /** PUT: update the product on the server */
  putProduct(formData: FormData, id: number): void {
    const url = `${this.productsUrl}/${id}`;
    this.http.put(url, formData)
     .pipe(
       tap(_ => console.log(`updated product`))
     ).subscribe(data => {console.log('put',data)})
  }


}


