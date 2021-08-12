import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Rights } from '../types/rights';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  isAdmin: Boolean;
  
  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    //check if admin is logged in
    this.isAdmin = this.tokenStorageService.checkAdmin();
  }

}
