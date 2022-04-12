import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DBService } from '../db.service';
import sha256 from 'crypto-js/sha256';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public signinForm: FormGroup;
  public invalidcred: number;
  constructor(private dbService: DBService, public formBuilder: FormBuilder, private router: Router, private userService: UserService) {
    this.invalidcred = 0;
    this.signinForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {
  }
  signIn() {
    console.log(this.signinForm.value.password);
    console.log(this.signinForm.value.email);
    let pwd = sha256(this.signinForm.value.password).toString();
    this.dbService.login(this.signinForm.value.email, pwd).subscribe((resp) => {
      console.log(resp);
      if (resp.length == 0)
        this.invalidcred = 1;
      else {
        this.invalidcred = 0;
        if (resp[0].type == "borrower") {
          this.dbService.getBorrowerDetailsByEmailId(this.signinForm.value.email).subscribe((res) => {
            console.log("BorrowerDetails"+res[0].customerId);
            this.userService.setBorrowerDetails(res[0].customerId, "borrower");
            this.userService.setAccountId(res[0].accountId);
            this.userService.setEmail(this.signinForm.value.email);
            this.router.navigate(['/borrowerdashboard']);
          });
        }
          if (resp[0].type == "lender") {
            this.dbService.getLenderDetailsByEmailId(this.signinForm.value.email).subscribe((res) => {
              console.log("LenderDetails"+res[0].customerId);
              this.userService.setLenderDetails(res[0].customerId, "lender");
              this.userService.setAccountId(res[0].accountId);
              this.userService.setEmail(this.signinForm.value.email);
              this.router.navigate(['/lenderdashboard']);
            });
            
        }

      }
    });

  }

}
