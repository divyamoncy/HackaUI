import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import sha256 from 'crypto-js/sha256';
import { DBService } from '../db.service';

@Component({
  selector: 'app-borrowersignup',
  templateUrl: './borrowersignup.component.html',
  styleUrls: ['./borrowersignup.component.css']
})
export class BorrowersignupComponent implements OnInit {
  public signupForm: FormGroup;
  constructor(public formBuilder: FormBuilder, private dbService: DBService, private router: Router) {
    this.signupForm = formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
      confirmpassword: ['',Validators.required]
    });
    console.log(this.signupForm.value.password);
   }

  ngOnInit(): void {
  }
  createUser() {
    let user = {};
    user["password"] = sha256(this.signupForm.value.password).toString();
    user["email"] = this.signupForm.value.email;
    user["type"] = "borrower";
    this.dbService.createUser(user).subscribe((resp)=>{
     
      console.log(resp);
      this.router.navigate(['/borroweronboarding']);
      });


  }

}
