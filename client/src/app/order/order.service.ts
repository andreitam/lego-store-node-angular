import { Injectable } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { CartItem } from '../shopping-cart/types/cart-item';
import { Order } from './types/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  order: Order;
  items: CartItem[] = [];

  constructor(private shoppingCartService: ShoppingCartService) {
    //subscribe to shopping cart size
    this.shoppingCartService.items$.subscribe(
      (next) => this.items = next
    );
  }

}
