import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { CartItem } from '../shopping-cart/types/cart-item';
import { OrderService } from '../services/order.service';
import { Order } from './types/order';
import { OrderStatus } from './types/order-status';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from '../types/customer';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order: Order;
  items: CartItem[] = [];
  customer: Customer;
  orderNumber;
  isSignedIn: boolean = false;

  constructor(private shoppingCartService: ShoppingCartService,
    private tokenStorageService: TokenStorageService,
    private orderService: OrderService,
    private modalService: NgbModal
    ) {
        //subscribe to shopping cart size
        this.shoppingCartService.items$.subscribe(
          (next) => {
            this.items = next;
            let orderProducts = [...this.items];
            for (let item in orderProducts) {
              delete item['name'];
              delete item['picture_url1'];
              delete item['picture_url2'];
            }
            this.customer = this.tokenStorageService.getUser();
            //create order
            console.log('before order creation', this.items, next)
            this.order = {
              items: orderProducts,
              status: OrderStatus.InProgress,
              date_time: new Date(),
              total: parseFloat((orderProducts
                        .map((el) => el.subtotal)
                        .reduce((a,c) => a+c, 0)).toFixed(2)),
              customer_id: this.customer.customer_id
            };
            this.tokenStorageService.saveOrder(this.order);
          }
        );
  }

  ngOnInit(): void {
    this.order = this.tokenStorageService.getOrder()
  }

  async checkout(content) {
    this.customer = this.tokenStorageService.getUser();
    console.log('this customer', this.customer);
    if (Boolean(this.customer.customer_id)) {
      console.log('signed in')
      this.isSignedIn = true;
      try {
        let insertId = await this.orderService.postOrder(this.order);
        this.orderNumber = insertId;
        this.tokenStorageService.removeOrder();
        this.shoppingCartService.clearCart();
        this.shoppingCartService.updateSize();
        this.modalService.open(content);
      }
      catch(e) {
        console.log(e);
      }
    }
    else {
      this.isSignedIn = false;
      alert('Please Sign In or rRegister to finalise your Order!');
    }
    //turn switch back off
    this.isSignedIn = false;
  }

}


