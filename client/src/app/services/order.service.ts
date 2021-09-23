import { Injectable } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { CartItem } from '../shopping-cart/types/cart-item';
import { Order } from '../order/types/order';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl = 'http://localhost:5000/orders';

  constructor(private http: HttpClient) {}

  /** POST: create the order on the server */
  postOrder(order: Order) {
    return this.http.post(this.orderUrl, order).toPromise();
  }


}
