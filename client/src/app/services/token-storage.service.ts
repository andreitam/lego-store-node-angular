import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private TOKEN_KEY = 'auth-token';
  private USER_KEY = 'auth-user';
  private CART_KEY = 'cart';

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.TOKEN_KEY);
    window.sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(this.TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public saveShoppingCart(items: any): void {
    window.sessionStorage.removeItem(this.CART_KEY);
    window.sessionStorage.setItem(this.CART_KEY, JSON.stringify(items));
  }

  public getShoppingCart(): any {
    const items = window.sessionStorage.getItem(this.CART_KEY);
    if (items) {
      return JSON.parse(items);
    }
    return {};
  }

  public checkAdmin(): boolean {
    const user = this.getUser();
    if (user.rights === 2) {
      return true;
    }
    return false;
  }
}
