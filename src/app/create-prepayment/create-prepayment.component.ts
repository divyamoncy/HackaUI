import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DBService } from '../db.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-prepayment',
  templateUrl: './create-prepayment.component.html',
  styleUrls: ['./create-prepayment.component.css']
})
export class CreatePrepaymentComponent implements OnInit {
  public prepayment: FormGroup;
  public done: number;
  public unpaidPrincipal: number;
  public customerId: string;
  constructor(public formBuilder: FormBuilder, private dbService: DBService, private userService: UserService, private router: Router) {
    this.done = 0;
    this.prepayment = formBuilder.group({
      amount: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.dbService.getActiveCustomerLoans(this.userService.getCustomerId()).subscribe((response) => {
      //let data = {};
      if (response.length != 0) {
        this.customerId = response[0].customerId;
        //data["amount"] = this.prepayment.value.amount;
        //console.log(response[0]["_id"]);
        this.unpaidPrincipal = response[0].unpaidPrincipal;
      }
    });
  }

  createPrincipalPayment() {
    
    this.dbService.getActiveCustomerLoans(this.userService.getCustomerId()).subscribe((response) => {
      let data = {};
      if (response.length != 0) {
        data["amount"] = response[0]["unpaidPrincipal"] - this.prepayment.value.amount;
        console.log(response[0]["_id"]);
        this.dbService.insertPrepayment(response[0]["_id"], data).subscribe((resp) => {
          console.log(resp);
          let interest = data["amount"] / 100.0;
          let requestInterest = {};
          requestInterest["amount"] = interest;
          this.dbService.updateInterest(this.userService.getCustomerId(), requestInterest).subscribe((res) => {
            console.log(res);
            let transaction = {};
            transaction["customerId"] = this.customerId;
            transaction["date"] = new Date().toISOString().split("T")[0];
            transaction["amount"] = this.prepayment.value.amount;
            transaction["description"] = "Principal Payment";
            transaction["type"] = "debit";
            this.dbService.insertTransaction(transaction).subscribe((respi) => {
              console.log(respi);
              this.done = 1;
              //this.router.navigate(['/borrowerdashboard']);
            });
          });
        });


      }
    });
    

  }
  goToDashboard() {
    this.router.navigate(['/borrowerdashboard']);
  }

}
