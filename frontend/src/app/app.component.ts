import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router:Router,  private userIdle: UserIdleService){

  }
  title = 'NewApp';
  userName = localStorage.getItem('username');

  date:Date = new Date();

  ngOnInit(): void {

    //Start watching for user inactivity.
    this.userIdle.startWatching();
   
    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe((count) => {      
      console.log(count)
    });
    
    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      console.log('Time is up!');
      this.logOut();
      this.userIdle.stopTimer();
  });
 }

  logOut(){    
    this.router.navigate(['/login']);    
    localStorage.clear();  
    window.location.reload();  
  }

}
