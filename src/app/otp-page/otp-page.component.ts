import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginserviceService } from '../loginservice.service';

@Component({
  selector: 'app-otp-page',
  templateUrl: './otp-page.component.html',
  styleUrls: ['./otp-page.component.css']
})
export class OtpPageComponent implements OnInit {
  otpForm:FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginservice:LoginserviceService
  ) { }

  ngOnInit() {
    this.otpForm = this.formBuilder.group({
      id : ['', Validators.required],
      input1: ['', Validators.required],
      input2: ['', Validators.required],
      input3: ['', Validators.required],
      input4: ['', Validators.required],
      input5: ['', Validators.required],
      input6: ['', Validators.required],
  });
  }
  OnSubmit(){
    let Loginrequest:any ={
      "Id": JSON.parse(localStorage.getItem("id")),
     "OTP": this.otpForm.value.input1+this.otpForm.value.input2+this.otpForm.value.input3+this.otpForm.value.input4+this.otpForm.value.input5+this.otpForm.value.input6,
    }
    this.loginservice.loginApi(Loginrequest).subscribe((res:any) =>{
      if(res.status =="200" ){
       console.log(res)
      }
      this.otpForm.reset()  
    })
 
   }

}
