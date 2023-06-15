import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  apiUrl = "http://localhost:3000/user";

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  createUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  deleteUser(id: any): Observable<any> {
    let ids = id;
    return this.http.delete(`${this.apiUrl}/${ids}`);
  }

  updateUser(data: any, id: any): Observable<any> {
    let ids = id;
    return this.http.put(`${this.apiUrl}/${ids}`, data);
  }

  getSingleData(id: any): Observable<any> {
    let ids = id;
    return this.http.get(`${this.apiUrl}/${ids}`);
  }
}
