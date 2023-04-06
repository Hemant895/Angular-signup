import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private loginservice:LoginserviceService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
  });
  }
  OnSubmit(){
    if(this.loginForm.value.email ==="" && this.loginForm.value.password === ""  ){
      this.toastr.error('please enter all the fields');
    }
    if(this.loginForm.value.email ==""){
      this.toastr.error('please enter email or number');
    }
    if(this.loginForm.value.password ==""){
      this.toastr.error('please enter password');
    }
    let Loginrequest:any ={
 "EmailOrMobileNo": this.loginForm.value.email,
 "Password": this.loginForm.value.password,
    }
    this.loginservice.loginApi(Loginrequest).subscribe((res:any) =>{
      if(res.status =="200" ){
        this.toastr.success(res.Message);
        this.data = res
        console.log(this.data)
        localStorage.setItem("sessionstorage",res)
        localStorage.setItem("sessionstorage",JSON.stringify(res.data))
        localStorage.setItem("sessionstorage",JSON.stringify(res.data.email))

        this.router.navigate(['/home'])

      }
      else if (res.status = "500") {
        this.toastr.error(res.Message,res.error)
        return
      }
      else if (res.status = "403") {
        this.toastr.error(res.error)
        return
      }
      else if (res.status = "412") {
        this.toastr.error(res.error)
        return
      }
      else {
        this.toastr.error(res.error)
      }
    },(error: any) => {
      this.toastr.error(error.error);
    
    })
 
   }

}
