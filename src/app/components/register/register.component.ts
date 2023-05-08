import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterForm } from 'src/app/models/register.model';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(fb: FormBuilder, 
    private apiService: ApiService, 
    private authService: AuthService, 
    private router: Router) {
    this.registerForm = fb.group({
        name: fb.control('', Validators.required),
        email: fb.control('', [Validators.required, Validators.email]),
        password: fb.control('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() {
    this.registerForm.reset({name: 'type your full name here'});
    this.registerForm.reset({email: 'provide a valid email'});
    this.registerForm.reset({password: 'type your password'});
  }

  onRegister(){
    if(this.registerForm.valid){
      const registerData: RegisterForm = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      }

      this.apiService.registerUser(registerData).subscribe((user: User) => {
        this.authService.setUser(user);
        console.log("Registered: ",user);
        //Here goes the nest window
        //this.router.navigate(['/review']);
      }); 
    }

  }
  }


