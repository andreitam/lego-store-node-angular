import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { CartItem } from '../shopping-cart/types/cart-item';
import { OrderService } from '../services/order.service';
import { Order } from './types/order';
import { OrderStatus } from './types/order-status';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order: Order;
  items: CartItem[] = [];

  constructor(private shoppingCartService: ShoppingCartService,
    private tokenStorageService: TokenStorageService,
    private orderService: OrderService,
    private modalService: NgbModal
    ) {
        //subscribe to shopping cart size
        this.shoppingCartService.items$.subscribe(
          (next) => {
            this.items = next;
            //create order
            this.order = {
              items: this.items,
              status: OrderStatus.InProgress,
              date_time: new Date(),
              total: parseFloat((this.items
                        .map((el) => el.subtotal)
                        .reduce((a,c) => a+c)).toFixed(2)),
              customer_id: this.tokenStorageService.getUser()
            };
            console.log('this is my', this.order)
          }
        );
  }

  ngOnInit(): void {

  }

  checkout(content): void {
    const user = this.tokenStorageService.getUser();
    if (!Boolean(user.customer_id)) {
      this.modalService.open(content);
    }
  }


}
