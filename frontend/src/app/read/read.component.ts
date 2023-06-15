import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  users :any;

  constructor(private userService: UserService){

  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((res) => {
      console.log(res);
      this.users = res.data;
    });
  }

  deleteUser(id:any){
    console.log(id);
    this.userService.deleteUser(id).subscribe((res)=>{
      console.log(res);
    });
    this.getAllUsers();
  }


}
