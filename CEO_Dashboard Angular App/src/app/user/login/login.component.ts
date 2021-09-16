import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  emailControl!: FormControl;
  passwordControl!: FormControl;
  loginForm!: FormGroup;
  loggedInFailed = false;

  constructor(private fb: FormBuilder,
    private authService:AuthService,
    private router:Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.emailControl = this.fb.control('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(256),
    ]);
    this.passwordControl = this.fb.control('', [
      Validators.required,
      Validators.minLength(6),
    ]);
    this.loginForm = this.fb.group({
      email: this.emailControl,
      password: this.passwordControl,
    });
  }

  validateForm(): string {
    if (
      (this.emailControl.touched && this.emailControl.invalid) ||
      (this.passwordControl.touched && this.passwordControl.invalid)
    ) {
      return 'Invalid details.';
    }
    return '';
  }

  login(formValues: any) {
    this.authService.getToken(formValues).subscribe((data:any) => {
      if(data.isAuthenticated){
        localStorage.setItem('token',data.token);
        this.authService.saveCurrentUserToLocalStorage(data.userName,data.roles); 
        this.loggedInFailed = false;
        this.router.navigate(['/dashboard']);
      }
    },err => {
      console.error(err.error);
      this.loggedInFailed = true;
    });
  }
}
