import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {


  private url = "https://mailthis.to/manzoor.cm";
  constructor(private http: HttpClient) { }

  SendEmail(input: any) {
    console.log(input);
    return this.http.post(this.url, input, { responseType: 'text' })
    // .pipe(
    //   map(
    //     (response) => {
    //       if (response) {
    //         return response
    //       }
    //     },
    //     (error) => {
    //       if (error) {
    //         return error
    //       }
    //     }
    //   )
    // )
  }
}
