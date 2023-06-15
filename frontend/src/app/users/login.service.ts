import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:3000';


  // signup 
  signup(data: any): Observable<any> {
    console.log(data, 'data##');
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  // login 
  login(data: any): Observable<any> {
    console.log(data, 'data###');
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // gettoken
  getToken() {
    return localStorage.getItem('token');
  }

  //reset password by admin
  resetPasswordAdmin(data): Observable<any>{
    return this.http.put(`${this.apiUrl}/reset`, data);
  }

  //reset Password by users
  resetPassword(data):Observable<any>{
    return this.http.put(`${this.apiUrl}/reset-password`, data);
  }


}
