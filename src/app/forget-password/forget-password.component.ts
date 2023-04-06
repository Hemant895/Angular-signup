import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginserviceService } from '../loginservice.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm: FormGroup;
  data =[];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginservice:LoginserviceService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
     this.forgetForm = this.formBuilder.group({
    email: ['', Validators.required],
});
  }
  OnSubmit(){
    if(this.forgetForm.value.email ==""){
      this.toastr.error('please enter email address');
    }
    let Loginrequest:any ={
  "Email": this.forgetForm.value.email,
    }
    this.loginservice.forgetpasswordapi(Loginrequest).subscribe((res:any) =>{
      if(res.status =="200"){
        this.toastr.success(res.message);
        this.data = res
        console.log(this.data)
        localStorage.setItem("sessionstorage",res)
        localStorage.setItem("sessionstorage",JSON.stringify(res.data))
        this.router.navigate(['/login'])
      }
        else if (res.status = "500") {
          this.toastr.error(res.errorMessage,res.error)
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
