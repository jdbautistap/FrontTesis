import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/models/login.model';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  constructor(fb: FormBuilder, 
    private apiService: ApiService, 
    private authService: AuthService, 
    private router: Router) {
    this.loginForm = fb.group({
      email: fb.control('', [Validators.required]),
      password: fb.control('', [Validators.required]),
    });
  } 
  
  ngOnInit(): void {
    this.loginForm.reset({email: 'provide a valid email'});
    this.loginForm.reset({password: 'type your password'});
  }
  
  onLogin() {
    if (this.loginForm.valid) {
      const credentials: LoginForm = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
  
      this.apiService.loginUser(credentials).subscribe((user: User) => {
        this.authService.setUser(user);
        this.router.navigate(['/profile']);
      });
    }
  }
}