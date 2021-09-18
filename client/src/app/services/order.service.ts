import { Injectable } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { CartItem } from '../shopping-cart/types/cart-item';
import { Order } from '../order/types/order';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private productsUrl = 'http://localhost:5000/orders';

  constructor(private http: HttpClient) {}

  /** POST: create the order on the server */
  postProduct(order: Order): void {
    this.http.post(this.productsUrl, order).subscribe(
      (response) => console.log('succesfull post', response),
      (error) => console.log(error)
    )
  }


}
