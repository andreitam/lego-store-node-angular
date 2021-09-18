import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Order } from './types/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order: Order;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    
  }

}
