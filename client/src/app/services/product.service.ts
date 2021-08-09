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

    /** GET theme by id. Will 404 if id not found */
  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url)
      .pipe(
        tap(_ => console.log(`fetched product id=${id}`))
      );
  }

  postProduct(formData: FormData): void {
    this.http.post(this.productsUrl, formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }

}

