import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Customer } from '../types/customer';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  isSubmitted = false;
  customer: Customer;
  @Output() registerClicked = new EventEmitter();

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    adress: ['', Validators.required],
    password: ['', Validators.required]
  });

  get f() { return this.registerForm.controls; }

  constructor(private fb: FormBuilder,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isSubmitted = true;
    console.warn(this.registerForm.value);
    const name = this.registerForm.get('name')?.value;
    const email = this.registerForm.get('email')?.value;
    const adress = this.registerForm.get('adress')?.value;
    const password = this.registerForm.get('password')?.value;

    this.authService.register(name, email, adress, password).subscribe(data => {
      console.log(data);
    },
    err => {
      console.log(err);
    });

    this.registerForm.reset();
    this.registerClicked.emit();
  }

}
