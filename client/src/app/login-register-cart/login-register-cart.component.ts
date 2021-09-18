import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../services/token-storage.service';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { Customer } from '../types/customer';

@Component({
  selector: 'app-login-register-cart',
  templateUrl: './login-register-cart.component.html',
  styleUrls: ['./login-register-cart.component.scss']
})
export class LoginRegisterCartComponent implements OnInit {
  customer: Customer;
  cartSize: number;

  constructor(private modalService: NgbModal,
    private tokenStorageService: TokenStorageService,
    private shoppingCartService: ShoppingCartService) {
     }

  ngOnInit(): void {
    this.customer = this.tokenStorageService.getUser();
    console.log(this.customer);
    //subscribe to shopping cart size
    this.shoppingCartService.itemsSize$.subscribe(
      (next) => this.cartSize = next
    );
  }

  open(content) {
    this.modalService.open(content);
  }

}
