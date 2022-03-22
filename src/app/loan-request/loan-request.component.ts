import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from '../api-call.service';
import { DBService } from '../db.service';
import { PaymentMandate } from '../models/account';
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
  public mandate: PaymentMandate;
  public interest: any;
  public nextInterestDueDate: any;
  constructor(private dbService: DBService, private userService: UserService, public formBuilder: FormBuilder, private apiCallService: ApiCallService, private router: Router) {
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
    data["unpaidPrincipal"] = this.loanRequest.value.loanamount;
    data["purpose"] = this.loanRequest.value.loanpurpose;
    data["loanType"] = "Personal";
    data["requestDate"] = new Date().toISOString().split("T")[0];
    this.interest = (data["amount"]) / 100.0;
    this.nextInterestDueDate = new Date( Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    data["interestDueDate"] = this.nextInterestDueDate;
    this.dbService.insertLoan(data).subscribe((response) => {
      console.log(response);
    });
    this.insertMandate();

  }

  insertInstantLoan() {
    var data = {};
    data["customerId"] = this.customerId;
    data["amount"] = this.loanRequest.value.loanamount;
    data["unpaidPrincipal"] = this.loanRequest.value.loanamount;
    data["purpose"] = this.loanRequest.value.loanpurpose;
    data["loanType"] = "Instant";
    data["requestDate"] = new Date().toISOString().split("T")[0];
    this.interest = (data["amount"]) / 100.0;
    this.nextInterestDueDate = new Date( Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    data["interestDueDate"] = this.nextInterestDueDate;
    this.dbService.insertLoan(data).subscribe((response) => {
    });
    this.insertMandate();
  }

  insertMandate() {
    this.mandate = {} as PaymentMandate;
    this.mandate.relatedIdentifier = this.customerId;
    this.mandate.paymentScheme = "BACS";
    this.mandate.mandateDescription = "Interest Payment";
    this.mandate.validFromDate = new Date().toISOString().split("T")[0];
    this.mandate.validToDate = new Date( Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    this.mandate.amountType = "VARIABLE";
    this.mandate.mandateCurrency = "USD";
    this.mandate.collectionFrequency = "ADHOC";
    this.mandate.creditAccountId = "010100294280000";
    this.mandate.creditBankIdentifier = "089999";
    this.mandate.debitBankIdentifier = "090013";
    this.mandate.debitAccountType ="BBAN";
    this.mandate.debitCustomerCountry ="US";
    let debitAccount = this.userService.getAccountId();
    this.mandate.debitAccountId = debitAccount.substring(debitAccount.length - 8);
    this.apiCallService.getToken().subscribe((tok)=>{
      this.apiCallService.postMandate(this.mandate, tok).subscribe((response)=>{
        console.log(response.mandateReference);
        let interestDetails = {};
        interestDetails["amount"] = this.interest;
        interestDetails["nextDueDate"] = this.nextInterestDueDate;
        interestDetails["customerId"] = this.customerId;
        interestDetails["mandateReference"] = response.mandateReference;
        this.dbService.insertInterestDetails(interestDetails).subscribe((resp) => {
          console.log(resp);
        });
        let transaction = {};
        transaction["customerId"] = this.customerId;
        transaction["date"] = new Date().toISOString().split("T")[0];
        transaction["amount"] = this.loanRequest.value.loanamount;
        transaction["description"] = "Loan Disbursement";
        transaction["type"] = "credit";
        this.dbService.insertTransaction(transaction).subscribe((resp) => {
          console.log(resp);
        });
        
      });
    });
    this.router.navigate(['/borrowerdashboard']);
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

}
