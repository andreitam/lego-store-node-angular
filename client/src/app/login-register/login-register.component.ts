import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../services/token-storage.service';
import { Customer } from '../types/customer';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  customer: Customer;

  constructor(private modalService: NgbModal,
    private tokenStorageService: TokenStorageService) {
     }

  ngOnInit(): void {
    this.customer = this.tokenStorageService.getUser();
    console.log(this.customer)
  }

  open(content) {
    this.modalService.open(content);
  }

}
