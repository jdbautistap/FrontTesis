import { InputResponse } from '../models/input-response';
import { Input } from '../models/input.model';
import { User } from '../models/user.model';
import { LoginForm } from './../models/login.model';
import { RegisterForm } from './../models/register.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
    private readonly BACKEND_URL = 'http://3.208.19.176:80';

  constructor(private http: HttpClient) {}

  registerUser(registerForm: RegisterForm): Observable<User> {
    return this.http.post<User>(`${this.BACKEND_URL}/api/usuario`, registerForm);
  }

  loginUser(loginForm: LoginForm): Observable<User> {
    console.log ("Email:  "+loginForm.email)
    console.log ("Contraseña:  "+loginForm.password)
    return this.http.post<User>(`${this.BACKEND_URL}/api/usuario/login`, loginForm);
  }

  submitReview(input: Input,userId: number): Observable<InputResponse> {
    return this.http.post<InputResponse>(`${this.BACKEND_URL}/api/resenias/usuario/${userId}`, input);
  }

  getPastFligths(userId: number): Observable<InputResponse[]> {
    return this.http.get<InputResponse[]>(`${this.BACKEND_URL}/api/usuario/${userId}/vuelo`);
  }
  getPastFligth(userId: number, flightid:String): Observable<InputResponse> {
    return this.http.get<InputResponse>(`${this.BACKEND_URL}/api/usuario/${userId}/vuelo/${flightid}`);
  }
  
  // Add more methods for fetching past reviews and model stats
}
