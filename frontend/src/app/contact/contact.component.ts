import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailService } from './email.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor(private emailService: EmailService, private http: HttpClient) {

  }

  errMsg: any;
  errMsgShow = false;
  successMsg: any;
  successMsgShow = false;

  contactForm = new FormGroup({
    'name': new FormControl('', Validators.required),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'contact': new FormControl('', Validators.required),
    'message': new FormControl('', Validators.required),
  });

  ngOnInit(): void { }

  contactSubmit() {
    if (this.contactForm.valid) {
      // this.emailService.SendEmail(this.contactForm.value).subscribe((res) => {
      //   this.successMsgShow = true;
      //   this.successMsg = "Email send successfully!"
      //   this.contactForm.reset();
      // });

      var formData: any = new FormData();
      formData.append("name", this.contactForm.get("name").value);
      formData.append("email", this.contactForm.get("email").value);
      formData.append("contact", this.contactForm.get("contact").value);
      formData.append("message", this.contactForm.get("message").value);

      this.http.post("https://script.google.com/macros/s/AKfycbwwBWsbiB63bUKLcbyLB3nD0g1Udox5mYBD8l6ARYI3MJnqjRKuuVbp6OQvaQ1Adzj50g/exec", formData).subscribe(
        (response) => {
          // choose the response message
          if (response["result"] == "success") {
            this.successMsgShow = true;
            this.successMsg = "Email send successfully!"
            this.contactForm.reset();
          } else {
            this.errMsgShow = true;
            this.errMsg = "Oops! Something went wrong...";
          }
        });


    }
    else {
      this.errMsgShow = true;
      this.errMsg = "All fields are mandatory!"
    }
  }

  dismissMsg() {
    this.errMsgShow = false;
    this.successMsgShow = false;
  }

}
