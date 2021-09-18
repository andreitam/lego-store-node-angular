import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { CartItem } from './types/cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  items: CartItem[] = [];
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.items = this.shoppingCartService.getItems();
  }

  removeFromCart(cartItem: CartItem): void {
    this.shoppingCartService.removeFromCart(cartItem);
    this.items = this.shoppingCartService.getItems();
  }

}
