import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReadComponent } from './read/read.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { UserService } from './user.service';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MembersComponent } from './members/members.component';
import { MemberService } from './member.service';
import { SignupComponent } from './users/signup/signup.component';
import { LoginComponent } from './users/login/login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgImageSliderModule } from 'ng-image-slider';
import { EmailService } from './contact/email.service';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { provideUserIdleConfig } from 'angular-user-idle';
import { DatePipe } from '@angular/common';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';
import { CacheInterceptor } from './users/cache.interceptor';


@NgModule({
  declarations: [
    AppComponent,  
    ReadComponent,
    HomeComponent,
    ProfileComponent,
    ContactComponent,
    MembersComponent,
    SignupComponent,
    LoginComponent,
    FileUploadComponent,
    ResetPasswordComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgImageSliderModule
    
  ],
  providers: [UserService, MemberService, AuthService, AuthGuard, EmailService, DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    provideUserIdleConfig({ idle: 600, timeout: 300, ping: 100 })
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
