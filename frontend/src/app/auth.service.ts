import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
 
  isLoggedIn = false;
  
  isAuthenticated() {
    return localStorage.getItem('token');
  }
}
