import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginserviceService } from '../loginservice.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  data = []
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginservice:LoginserviceService
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      number: ['', Validators.required ],
      password: ['', Validators.required],
  });
  }

  OnSubmit(){
   let SignUprequest:any ={
 "FirstName": this.signupForm.value.firstname,
 "Email": this.signupForm.value.email,
 "Password": this.signupForm.value.password,
 "LastName": this.signupForm.value.lastname,
 "MobileNo": this.signupForm.value.number
   }
   this.loginservice.singupApi(SignUprequest).subscribe((res:any) =>{
    if(res.status =="200"){
      this.data = res
      console.log(this.data)
      localStorage.setItem("sessionstorage",res)
      localStorage.setItem("id",JSON.stringify(res.recordsets["ID"]))

      this.router.navigate(['/otppage'])
    }
    this.signupForm.reset();
   })

  }

}
