import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MemberService } from '../member.service';
import { LoginService } from '../users/login.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  isUserAdmin = true;
  users: any;
  errmsg: any;
  errmsgshow = false;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  userName = localStorage.getItem('username');
  enableSearchText: boolean;

  errMsg: any;
  errMsgShow = false;
  successMsg: any;
  successMsgShow = false;


  searchForm = new FormGroup({
    'searchText': new FormControl(''),
  });

  constructor(private memberService: MemberService, private loginService: LoginService) { }
  ngOnInit() {
    this.enableSearchText = false;
    this.getAllUsers();
  }

  deleteUser(id: any) {
    this.memberService.deleteProfile(id).subscribe((res) => {
      console.log(res.message);
      this.successMsg = res.message;
      this.successMsgShow = true;
      this.errMsgShow = false;
    });
    this.getAllUsers();
  }

  getAllUsers() {
    this.memberService.getMemberDetails().subscribe((res) => {
      this.users = res.data;
      console.log(res.message);
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    // this.getAllUsers();
    if (this.enableSearchText) {
      this.searchUsers()
    } else {
      this.getAllUsers()
    }
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    if (this.enableSearchText) {
      this.searchUsers()
    } else {
      this.getAllUsers()
    }
  }

  searchUsers() {
    console.log(this.searchForm.value);
    this.memberService.searchMembers(this.searchForm.value).subscribe((res) => {
      this.users = res.data;
      console.log(res.message);
    })
  }

  searchAllUsers() {
    if (this.searchForm.get('searchText').value !== '') {
      console.log("search users")
      this.enableSearchText = true;
      this.searchUsers();
    }
    else {
      console.log("get all users")
      this.enableSearchText = false;
      this.getAllUsers();
    }
  }

  resetForm() {
    this.enableSearchText = false;
    this.searchForm.reset();
  }

  resetPassword(email, phone) {
    let data = {
      email: email,
      phone: phone,
      password: 'password'
    }

    this.loginService.resetPasswordAdmin(data).subscribe((res) => {
      if (res.status === true) {
        this.successMsg = res.msg;
        this.successMsgShow = true;
        this.errMsgShow = false;
      }
      else{
        this.errMsgShow = true;
        this.errMsg = res.msg;
      }
    });
  }

  dismissMsg() {
    this.errMsgShow = false;
    this.successMsgShow = false;
  }


}
