import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DBService } from '../db.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-foreclosure',
  templateUrl: './foreclosure.component.html',
  styleUrls: ['./foreclosure.component.css']
})
export class ForeclosureComponent implements OnInit {
  public foreclosure: FormGroup;
  public unpaidPrincipal: number;
  public interest: number;
  public done: number;
  public loan: any;
  constructor(public formBuilder: FormBuilder, private dbService: DBService, private userService: UserService, private router: Router) {
    this.done = 0;
  }

  ngOnInit(): void {
    this.dbService.getActiveCustomerLoans(this.userService.getCustomerId()).subscribe((response) => {
      if (response.length != 0) {

        this.loan = response[0];

        this.unpaidPrincipal = response[0].unpaidPrincipal;

      }
      console.log(response);
    });
    this.dbService.getInterestDetailsByCustomerId(this.userService.getCustomerId()).subscribe((response) => {
      this.interest = response[0].amount;
    });
  }
  createForeclosure() {
    //this.done = 1;
    this.dbService.getActiveCustomerLoans(this.userService.getCustomerId()).subscribe((response) => {
      let data = {};
      if (response.length != 0) {
        data["amount"] = 0;
        console.log(response[0]["_id"]);
        this.dbService.insertPrepayment(response[0]["_id"], data).subscribe((resp) => {
          console.log(resp);
          let interest = data["amount"] / 100.0;
          // let requestInterest = {};
          // requestInterest["amount"] = interest;
          this.dbService.deleteInterest(this.userService.getCustomerId()).subscribe((res) => {
            console.log(res);
            let transaction = {};
            transaction["customerId"] = this.userService.getCustomerId();
            transaction["date"] = new Date().toISOString().split("T")[0];
            transaction["amount"] = response[0].unpaidPrincipal;
            transaction["description"] = "Principal Payment";
            transaction["type"] = "debit";
            let foreclose = {};
            foreclose["status"] = "closed";
            foreclose["amount"] = 0;
            this.dbService.forecloseLoan(response[0]["_id"], foreclose).subscribe((resps) => {
                console.log(resps);
            });
            this.dbService.insertTransaction(transaction).subscribe((respi) => {
              console.log(respi);
              let transaction = {};
              transaction["customerId"] = this.userService.getCustomerId();
              transaction["date"] = new Date().toISOString().split("T")[0];
              transaction["amount"] = this.interest;
              transaction["description"] = "Interest Payment";
              transaction["type"] = "debit";
              this.dbService.insertTransaction(transaction).subscribe((respi2) => {
                this.done = 1;
                //this.router.navigate(['/borrowerdashboard']);
              });
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
