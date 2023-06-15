import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { MemberService } from '../member.service';
import * as moment from 'moment';
import { LoginService } from '../users/login.service';
import { GoogleService } from '../google.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  disableProfile = true;
  getParamId: any;
  minDate: any;
  maxDate: any;
  getID: any;
  disableCreateButton = true;
  disableUpdateButton = true;
  errMsg: any;
  errMsgShow = false;
  successMsg: any;
  successMsgShow = false;
  loader = false;
  profileData: any;
  userName = localStorage.getItem('username');
  viewOnly: boolean;
  fullName: string;
  emailCreate: string;
  phoneCreate: string;
  profileDetails = [];

  username: string;
  phone: string;
  eMail: string;

  profileForm = new FormGroup({
    'firstName': new FormControl('', Validators.required),
    'lastName': new FormControl('', Validators.required),
    'address': new FormControl(''),
    'associationUnit': new FormControl('', Validators.required),
    'mobileNo': new FormControl('', [Validators.required]),
    'smobileNo': new FormControl(''),
    'landlineCode': new FormControl(''),
    'landlineNo': new FormControl(''),
    'email': new FormControl('', [Validators.email]),
    'dateOfBirth': new FormControl({ 'year': 2018, 'month': 12, 'day': 12 }),
    'spouseName': new FormControl(''),
    'spouseDOB': new FormControl({ 'year': 2018, 'month': 12, 'day': 12 }),
    'maleChildren': new FormControl(''),
    'femaleChildren': new FormControl(''),
    'notes': new FormControl(''),
  });

  @ViewChild('dp1') dp1: NgbInputDatepicker;

  constructor(private router: ActivatedRoute,
    private memberService: MemberService,
    private datePipe: DatePipe,
    private service: LoginService,
    private csv: GoogleService
  ) {
  }

  ngOnInit() {
    //Get the profile photos from google sheet
    this.csv.getProfilePhotos().subscribe((res) => {
      this.profileDetails = res;
    });

    //If admin enable the fields 
    let email = localStorage.getItem('email');
    if (this.userName === 'Admin' || email === '') {
      this.enableFields();
    }
    else {
      this.disableFields();
    }
    //Set max date for calendar picker, used for date of birth
    this.maxDate = { year: new Date().getFullYear(), month: 12, day: 31 }
    this.getParamId = this.router.snapshot.paramMap.get('id');
    console.log("Param" + this.getParamId)
    if (this.getParamId) {
      console.log("Inside getParam")
      this.userPatchValue(this.getParamId);
      this.disableUpdateButton = false;
      this.disableCreateButton = true;
    }
    else {
      let email = localStorage.getItem('email');
      if (email !== 'admin@gmail.com' && email !== '') {
        this.loader = true;
        let data = {
          'email': email
        }
        this.memberService.searchMyProfile(data).subscribe((res) => {
          console.log(res);
          this.getID = (res.data[0]?.id) ? res.data[0]?.id : null;
          console.log(this.getID)
          this.loader = false;
          if (this.getID > 0) {
            this.userPatchValue(this.getID);
            this.disableUpdateButton = false;
            this.disableCreateButton = true;
          }
          else {
            this.disableUpdateButton = true;
            this.disableCreateButton = false;
          }
        }, (err) => {
          this.errMsgShow = true;
          this.successMsgShow = false;
          this.errMsg = err;
          this.disableUpdateButton = true;
          this.disableCreateButton = false;
        });

      }
      else {
        this.disableUpdateButton = true;
        this.disableCreateButton = false;
      }
    }

  }

  // Disable fields if the logged in person is viewing other member details
  disableFields() {
    this.viewOnly = true;
    this.profileForm.get('firstName')?.disable();
    this.profileForm.get('lastName')?.disable();
    this.profileForm.get('address')?.disable();
    this.profileForm.get('associationUnit')?.disable();
    this.profileForm.get('mobileNo')?.disable();
    this.profileForm.get('smobileNo')?.disable();
    this.profileForm.get('landlineCode')?.disable();
    this.profileForm.get('landlineNo')?.disable();
    this.profileForm.get('email')?.disable();
    this.profileForm.get('dateOfBirth')?.disable();
    this.profileForm.get('spouseName')?.disable();
    this.profileForm.get('spouseDOB')?.disable();
    this.profileForm.get('maleChildren')?.disable();
    this.profileForm.get('femaleChildren')?.disable();
    this.profileForm.get('notes')?.disable();
  }

  //Enable fields to update his profile or for admin to create profile
  enableFields() {
    this.viewOnly = false;
    this.profileForm.get('firstName')?.enable();
    this.profileForm.get('lastName')?.enable();
    this.profileForm.get('address')?.enable();
    this.profileForm.get('associationUnit')?.enable();
    this.profileForm.get('mobileNo')?.enable();
    this.profileForm.get('smobileNo')?.enable();
    this.profileForm.get('landlineCode')?.enable();
    this.profileForm.get('landlineNo')?.enable();
    this.profileForm.get('email')?.enable();
    this.profileForm.get('dateOfBirth')?.enable();
    this.profileForm.get('spouseName')?.enable();
    this.profileForm.get('spouseDOB')?.enable();
    this.profileForm.get('maleChildren')?.enable();
    this.profileForm.get('femaleChildren')?.enable();
    this.profileForm.get('notes')?.enable();
  }

  //Create profile by admin
  createProfile() {
    this.enableFields();
  }

  //Create a user profile, if admin insert a record to users table as well.
  createUser() {
    console.log(this.profileForm.value);
    if (this.profileForm.valid) {
      this.loader = true;
      this.createProfileData();
      let email = localStorage.getItem('email');
      if (email !== 'admin@gmail.com') {
        this.createProfileUser();
        this.updateUsers();
      }
      else {
        this.fullName = this.profileForm.get('firstName').value,
          this.emailCreate = this.profileForm.get('email').value,
          this.phoneCreate = this.profileForm.get('mobileNo').value,
          this.createProfileUser();
        this.signUpUsers();

      }

    }
    else {
      this.errMsg = "Fill in all the mandatory fields!";
      this.errMsgShow = true;
      this.successMsgShow = false;
    }
  }

  //function to check for users table and update if modified
  updateUsers() {
    const data = {
      phone: this.phone,
      email: this.eMail,
    }
    this.memberService.searchUsers(data).subscribe((res) => {
      console.log(res.data);
      if (res.data.email !== this.eMail) {
        // this.memberService.updateUser(data).subscribe((response) => {  this.profileForm.value
        this.memberService.updateUser(this.profileForm.value).subscribe((response) => {
          if (this.userName !== 'Admin') {
            localStorage.setItem('email', this.eMail);
          }
        })
      }
    })
  }



  //API call to create a profile user
  createProfileUser() {
    this.memberService.createProfile(this.profileData).subscribe((res) => {
      this.loader = false;
      this.successMsg = res.message;
      this.successMsgShow = true;
      this.errMsgShow = false;
    }, (err) => {
      this.errMsg = err;
      this.errMsgShow = true;
      this.successMsgShow = false;
    });
    this.profileForm.reset();
  }

  //API call to insert a record to users table if profile created by admin(password to be defaulted to 'password')
  signUpUsers() {
    // call api signup
    const data = {
      name: this.fullName,
      email: this.emailCreate,
      password: 'password',
      phone: this.phoneCreate
    }
    this.service.signup(data).subscribe((res) => {
      console.log(res, 'res##');
      if (res.status == true) {
        console.log("User details inserted to database")
      }
    });

  }

  //Update profile has to enable the fields
  updateProfile() {
    this.enableFields();
  }

  //Update a user profile with the newly provided details.
  updateUserProfile() {
    if (this.profileForm.valid) {
      this.createProfileData();
      console.log(this.profileForm.value);
      this.loader = true;
      this.getParamId = this.router.snapshot.paramMap.get('id');
      this.memberService.updateProfile(this.profileData, this.getParamId).subscribe((res) => {
        this.loader = false;
        this.successMsg = res.message;
        this.successMsgShow = true;
        this.errMsgShow = false;
        this.updateUsers();
      }, (err) => {
        this.errMsg = err;
        this.errMsgShow = true;
        this.successMsgShow = false;
      });
      this.profileForm.reset();
    }
    else {
      this.errMsg = "Fill in all the mandatory fields!";
      this.errMsgShow = true;
      this.successMsgShow = false;
    }
  }

  // Create data for create user profile
  createProfileData() {

    this.phone = this.profileForm.get('mobileNo').value;
    this.eMail = this.profileForm.get('email').value;

    this.profileData = {
      "firstName": this.profileForm.get('firstName').value,
      "lastName": this.profileForm.get('lastName').value,
      "address": this.profileForm.get('address').value,
      "associationUnit": this.profileForm.get('associationUnit').value,
      "mobileNo": this.profileForm.get('mobileNo').value,
      "smobileNo": this.profileForm.get('smobileNo').value,
      "landlineCode": this.profileForm.get('landlineCode').value,
      "landlineNo": this.profileForm.get('landlineNo').value,
      "email": this.profileForm.get('email').value,
      "dateOfBirth": this.profileForm.get('dateOfBirth').value.year + '-' + this.profileForm.get('dateOfBirth').value.month + '-' + this.profileForm.get('dateOfBirth').value.day,
      "spouseName": this.profileForm.get('spouseName').value,
      "spouseDOB": this.profileForm.get('spouseDOB').value.year + '-' + this.profileForm.get('spouseDOB').value.month + '-' + this.profileForm.get('spouseDOB').value.day,
      "maleChildren": this.profileForm.get('maleChildren').value,
      "femaleChildren": this.profileForm.get('femaleChildren').value,
      "notes": this.profileForm.get('notes').value
    }
  }

  //reset profile to reset to initial state
  resetProfile() {
    this.profileForm.reset();
  }

  //Date format based on moment.js, return date in ngbdatepicker format
  formatDate(date: Date) {
    return {
      'year': parseInt(moment(date.toLocaleString()).format('YYYY')),
      'month': parseInt(moment(date.toLocaleString()).format('MM')),
      'day': parseInt(moment(date.toLocaleString()).format('DD'))
    }
  }

  // Fill in the details for a user on to the form
  userPatchValue(id: any) {
    console.log(id
    );
    this.loader = true;
    this.username = '';
    // this.phone = '';
    // this.eMail = '';
    this.memberService.getMyProfile(id).subscribe((res) => {
      this.loader = false;
      // this is to display photo
      this.username = res.data[0].firstname + ' ' + res.data[0].lastname;
      // this.phone = res.data[0].mobile
      // this.eMail = res.data[0].email;

      if (res.data[0].email === localStorage.getItem('email')) {
        this.enableFields();
      }

      if (res.data[0].email > '') {
        this.profileForm.get('email')?.disable();
      }

      if (res.data[0].mobile > '') {
        this.profileForm.get('mobileNo')?.disable();
      }
      this.profileForm.patchValue({
        'firstName': res.data[0].firstname,
        'lastName': res.data[0].lastname,
        'address': res.data[0].address,
        'associationUnit': res.data[0].unit,
        'mobileNo': res.data[0].mobile,
        'smobileNo': res.data[0].smobile,
        'landlineCode': res.data[0].landcode,
        'landlineNo': res.data[0].landline,
        'email': res.data[0].email,
        'dateOfBirth': this.formatDate(res.data[0].dob),
        'spouseName': res.data[0].spouse,
        'spouseDOB': this.formatDate(res.data[0].sdob),
        'maleChildren': res.data[0].male,
        'femaleChildren': res.data[0].female,
        'notes': res.data[0].notes
      });
    });
  }

  dismissMsg() {
    this.errMsgShow = false;
    this.successMsgShow = false;
  }

}
