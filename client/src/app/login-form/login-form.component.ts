import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Customer } from '../types/customer';
import { Rights } from '../types/rights';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  isSubmitted = false;
  customer: Customer;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  rights: Rights;
  @Output() loginClicked = new EventEmitter();

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  get f() { return this.loginForm.controls; }

  constructor(private fb: FormBuilder,
    private authService: AuthenticationService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.rights = this.tokenStorage.getUser().rights;
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    console.warn(this.loginForm.value);
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(email,password).subscribe(data => {
      console.log(data);
      this.tokenStorage.saveToken(data.accessToken);
      this.tokenStorage.saveUser(data);
      this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.rights = this.tokenStorage.getUser().rights;
        this.reloadPage();
    },
    err => {
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
    });

    this.loginForm.reset();
    this.loginClicked.emit();
  }

  reloadPage(): void {
    window.location.reload();
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
