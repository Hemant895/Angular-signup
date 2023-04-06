import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginserviceService } from '../loginservice.service';
import { ToastrService } from 'ngx-toastr';

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
    private loginservice: LoginserviceService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      number: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  OnSubmit() {
    
    if(this.signupForm.value.number ==="" && this.signupForm.value.password === "" && this.signupForm.value.email ===""){
      this.toastr.error('please enter all the fields');
    }
    let SignUprequest: any = {
      "FirstName": this.signupForm.value.firstname,
      "Email": this.signupForm.value.email,
      "Password": this.signupForm.value.password,
      "LastName": this.signupForm.value.lastname,
      "MobileNo": this.signupForm.value.number
    }
    this.loginservice.singupApi(SignUprequest).subscribe((res: any) => {
      if (res.status == "200") {
        this.toastr.success(res.message);
        this.router.navigate(['/otppage'])
        this.data = res
        console.log(res.error)
        console.log(this.data)
        localStorage.setItem("sessionstorage", JSON.stringify(res.data))
        localStorage.setItem("id", JSON.stringify(res.data["recordsets"][0]["ID"]))
        console.log(JSON.parse(localStorage.getItem("id")),)
      }
      else if (res.status = "500") {
        this.toastr.error(res.error)
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
        this.toastr.error("res.message")
      }
    },(error: any) => {
      this.toastr.error(error.error);
    }
    )

  }

}
