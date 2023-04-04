import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OtpPageComponent } from './otp-page/otp-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  {path:"otppage" ,component:OtpPageComponent},
  {path:"" ,component:LoginPageComponent},
  {path:"login" ,component:LoginPageComponent},
  {path:"signup" ,component:SignUpComponent},
  {path:"forgetpassword" ,component:ForgetPasswordComponent},
  {path:"home" ,component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
