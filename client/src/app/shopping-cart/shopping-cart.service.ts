import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Product } from '../types/product';
import { CartItem } from './types/cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  items: CartItem[] | undefined = [];
  private _itemsSize = new BehaviorSubject(0);
  public itemsSize$ = this._itemsSize.asObservable();
  private _items = new BehaviorSubject<CartItem[]>([]);
  public items$ = this._items.asObservable();

  constructor() { }

  addToCart(product: Product, quantity: number) {
    const item: CartItem | undefined = {
      product_id: product.product_id,
      quantity: quantity,
      subtotal: parseFloat((quantity*product.price).toFixed(2)),
      picture_url1: product.picture_url1,
      picture_url2: product.picture_url2,
      name: product.name

    }
    //check if item already inserted in items
    let exists = this.items.some((el) => el.product_id === item.product_id);
    //if exists change quantity
    if (exists) {
      this.items = this.items.map((el) => (el.product_id === item.product_id) ? el = item : el);
    }
    //else insert in cart
    else {
      this.items.push(item);
    }
    console.log('current shopping cart', this.items);
    this.updateSize();
    this.updateItems();
  }

  removeFromCart(cartItem: CartItem) {
    this.items = this.items.filter((el) => el.product_id !== cartItem.product_id);
    console.log('current shopping cart', this.items);
    this.updateSize();
    this.updateItems();
  }

  getItems(): CartItem[]  {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  updateSize() {
    this._itemsSize.next(this.items.length);
  }

  updateItems() {
    this._items.next(this.items);
  }
}
