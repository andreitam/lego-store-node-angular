import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  brandUrl = 'http://localhost:5000/images/brand.svg';

  constructor() { }

  ngOnInit(): void {
  }

}
