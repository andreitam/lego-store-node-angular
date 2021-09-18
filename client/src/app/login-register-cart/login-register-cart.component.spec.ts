import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterCartComponent } from './login-register-cart.component';

describe('LoginRegisterComponent', () => {
  let component: LoginRegisterCartComponent;
  let fixture: ComponentFixture<LoginRegisterCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRegisterCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
