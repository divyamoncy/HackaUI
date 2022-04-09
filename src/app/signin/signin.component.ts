import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DBService } from '../db.service';
import sha256 from 'crypto-js/sha256';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public signinForm : FormGroup;
  public invalidcred : number;
  constructor(private dbService: DBService, public formBuilder: FormBuilder, private router: Router) { 
    this.invalidcred = 0;
    this.signinForm = formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
    
  }

  ngOnInit(): void {
  }
  signIn() {
    console.log(this.signinForm.value.password);
    console.log(this.signinForm.value.email);
    let pwd = sha256(this.signinForm.value.password).toString();
    this.dbService.login(this.signinForm.value.email, pwd).subscribe((resp)=>{
      console.log(resp);
      if(resp.length==0)
       this.invalidcred = 1;
       else
       {
       this.invalidcred = 0;
       if(resp[0].type == "borrower") {
         this.dbService.getBorrowerDetailsByEmailId(this.signinForm.value.email).subscribe((res)=>{
          console.log(res);
         });
       this.router.navigate(['/borrowerdashboard']);
       }

       }
    });

  }

}
