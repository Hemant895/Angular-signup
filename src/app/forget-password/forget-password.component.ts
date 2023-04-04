import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private loginservice:LoginserviceService
  ) { }

  ngOnInit() {
     this.forgetForm = this.formBuilder.group({
    email: ['', Validators.required],
});
  }
  OnSubmit(){
    let Loginrequest:any ={
  "Email": this.forgetForm.value.email,
    }
    this.loginservice.forgetpasswordapi(Loginrequest).subscribe((res:any) =>{
      if(res.status =="200"){
        this.data = res
        console.log(this.data)
        localStorage.setItem("sessionstorage",res)
        localStorage.setItem("sessionstorage",JSON.stringify(res.data))

      }
        this.forgetForm.reset();
    })
 
   }
}
