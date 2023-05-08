import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  private currentUser: User | null = null;

  constructor() {}

  setUser(user: User): void {
    this.currentUser = user;
  }

  getUser(): User | null {
    return this.currentUser;
  }

  getUserId(): number | null {
    return this.currentUser ? this.currentUser.id : null;
  }
}