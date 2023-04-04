import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginserviceService } from '../loginservice.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  data = []
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginservice:LoginserviceService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      number: ['', Validators.required],
      password: ['', Validators.required],
  });
  }
  OnSubmit(){
    let Loginrequest:any ={
 "EmailOrMobileNo": this.loginForm.value.email,
 "Password": this.loginForm.value.password,
    }
    this.loginservice.loginApi(Loginrequest).subscribe((res:any) =>{
      if(res.status =="200" ){
        this.data = res
        console.log(this.data)
        localStorage.setItem("sessionstorage",res)
        localStorage.setItem("sessionstorage",JSON.stringify(res.data))

        this.router.navigate(['/home'])

      }
      this.loginForm.reset()  
    })
 
   }

}
