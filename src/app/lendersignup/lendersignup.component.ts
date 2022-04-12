import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import sha256 from 'crypto-js/sha256';
import { DBService } from '../db.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-lendersignup',
  templateUrl: './lendersignup.component.html',
  styleUrls: ['./lendersignup.component.css']
})
export class LendersignupComponent implements OnInit {
  public signupForm: FormGroup;
  constructor(public formBuilder: FormBuilder, private dbService: DBService, private router: Router, private userService: UserService) { 
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
    user["type"] = "lender";
    this.dbService.createUser(user).subscribe((resp)=>{
      this.userService.setEmail(this.signupForm.value.email);
     
      console.log(resp);
      this.router.navigate(['/lenderonboarding']);
      });


  }

}
