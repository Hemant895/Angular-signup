import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private httpClient :HttpClient ) { }
 
  singupApi(data:any){
    return this.httpClient.post("https://qaapi.jahernotice.com/Admin/SignUp" ,data)
  }
  otpverificationapi(data:any){
    return this.httpClient.post("https://qaapi.jahernotice.com/Admin/OTP/verify" ,data)
  }
  loginApi(data:any){
    return this.httpClient.post("https://qaapi.jahernotice.com/Admin/SignIn" ,data)
  } 
  forgetpasswordapi(data:any){
    return this.httpClient.post("https://qaapi.jahernotice.com/Admin/Password/send" , data)
  }
}
