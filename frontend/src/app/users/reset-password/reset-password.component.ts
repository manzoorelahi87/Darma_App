import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  errmsg: any;
  errmsgshow = false;
  successMsg: any;
  successMsgShow = false;

  constructor(private loginService: LoginService) {

  }

  resetForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    newpassword: new FormControl('', Validators.required)
  });

  resetPassword() {

    if (this.resetForm.valid) {
      this.loginService.resetPassword(this.resetForm.value).subscribe((res) => {
        if (res.status == true) {
          this.successMsg = res.msg;
          this.successMsgShow = true;
          this.errmsgshow = false;
        }
        else {
          this.errmsgshow = true;
          this.errmsg = res.msg;
        }
        this.resetForm.reset();
      });
    }
    else {
      this.errmsgshow = true;
      this.errmsg = 'All field required !!';
    }
  }

  dismissMsg() {
    this.errmsgshow = false;
    this.successMsgShow = false;
  }

}
