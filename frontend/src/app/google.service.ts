import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private http: HttpClient) { }

  public getBoardMemberDetails(): Observable<any> {   
    const url = 'https://opensheet.elk.sh/1riBNlzGBQqMcFvUU7UEdO1SfRSGIWC5M-kFp3illV0M/Board_Directors'
    return this.http.get(url)
      .pipe(
        map((res: any) => {
          
          return res;          
        })
      );
  }

  public getCommitteMembers(): Observable<any> {
    const url = 'https://opensheet.elk.sh/1riBNlzGBQqMcFvUU7UEdO1SfRSGIWC5M-kFp3illV0M/Committee_Members'
    return this.http.get(url)
      .pipe(
        map((res: any) => {
          
          return res;
        })
      );
  }


  public getEventPhotos(): Observable<any> {
    const url = 'https://opensheet.elk.sh/1riBNlzGBQqMcFvUU7UEdO1SfRSGIWC5M-kFp3illV0M/Event_Photos'
    return this.http.get(url)
      .pipe(
        map((res: any) => {
          
          return res;
        })
      );
  }

  public getProfilePhotos(): Observable<any> {
    const url = 'https://opensheet.elk.sh/1riBNlzGBQqMcFvUU7UEdO1SfRSGIWC5M-kFp3illV0M/Member_Photos'
    return this.http.get(url)
      .pipe(
        map((res: any) => {
          
          return res;
        })
      );
  }

  public getHomeContent(): Observable<any> {
    const url = 'https://opensheet.elk.sh/1riBNlzGBQqMcFvUU7UEdO1SfRSGIWC5M-kFp3illV0M/Home_Content'
    return this.http.get(url)
      .pipe(
        map((res: any) => {      
          return res;
        })
      );
  }


}
