import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DBService } from '../db.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-loan-request',
  templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.css']
})
export class LoanRequestComponent implements OnInit {
  public instantAmount: number;
  public personalAmount: number;
  public customerId: string;
  public loanRequest: FormGroup;
  public categoryMapping;
  public companyName:string;
  public focus:number;
  constructor(private dbService: DBService, private userService: UserService, public formBuilder: FormBuilder) {
    this.loanRequest = formBuilder.group({
      loanamount: ['', Validators.required],
      loanpurpose: ['', Validators.required]
    });
    this.categoryMapping = {"Infosys":"A",
    "Axis Bank":"A",
    "Asian Paints":"A",
    "ITC":"A",
    "Borosil":"B",
    "Black Box":"B"};
  }

  ngOnInit(): void {
    this.focus = 1;
    this.dbService.getBorrowerDetailsByCustomerId(this.userService.getCustomerId()).subscribe((response) => {
      console.log(response);
      this.customerId = response[0].customerId;
      this.companyName = response[0].companyName;
      this.instantAmount = response[0].monthlysalary * 2;
      this.dbService.getPersonalLoanAmount(this.categoryMapping[this.companyName], Math.ceil(response[0].experience)).subscribe((res) => {
        console.log(res);
        this.personalAmount = response[0].monthlysalary * res[0].months;
      });
      
    });
  }

  createInstantLoan() {
    this.focus = 3;
  }

  createPersonalLoan() {
    this.focus = 2;
  }

  insertPersonalLoan() {
    var data = {};
    data["customerId"] = this.customerId;
    data["amount"] = this.loanRequest.value.loanamount;
    data["purpose"] = this.loanRequest.value.loanpurpose;
    data["loanType"] = "Personal";
    data["requestDate"] = new Date().toISOString().split("T")[0];
    this.dbService.insertLoan(data).subscribe((response) => {
      console.log(response);
    });


  }

  insertInstantLoan() {
    var data = {};
    data["customerId"] = this.customerId;
    data["amount"] = this.loanRequest.value.loanamount;
    data["purpose"] = this.loanRequest.value.loanpurpose;
    data["loanType"] = "Instant";
    data["requestDate"] = new Date().toISOString().split("T")[0];
    this.dbService.insertLoan(data).subscribe((response) => {
      console.log(response);
    });


  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

}
