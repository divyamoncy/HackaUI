import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../db.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-borrowerdashboard',
  templateUrl: './borrowerdashboard.component.html',
  styleUrls: ['./borrowerdashboard.component.css']
})
export class BorrowerdashboardComponent implements OnInit {
  public show:number;
  public accountnumber: string;
  public ifsccode: string;
  public outstanding: number;
  public unpaidPrincipal: number;
  public maturityDate: string;
  public fullName: string;
  public interestDueDate: string;
  public transactions: any;
  public interest: string;
  public loanCount: number;
  public loan: any;
  public month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  constructor(private router: Router, private dbService: DBService, private userService: UserService) {
    this.show = 1;
    this.accountnumber = "";
    this.maturityDate = "";
    this.interestDueDate = "";
   }

  ngOnInit(): void {
    //let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    this.dbService.getCustomerLoans(this.userService.getCustomerId()).subscribe((response)=>{
      if(response.length != 0) {
        this.loanCount = 1;
        this.loan = response[0];
        this.outstanding = response[0].amount;
        this.unpaidPrincipal = response[0].unpaidPrincipal;
        let matDate = response[0].requestDate;
        let intDate = response[0].interestDueDate;
        this.interestDueDate = intDate.substring(8,10)+" "+this.month[parseInt(intDate.substring(5,7))-1]+" "+(parseInt(intDate.substring(0,4))).toString();
        this.maturityDate = matDate.substring(8,10)+" "+this.month[parseInt(matDate.substring(5,7))-1]+" "+(parseInt(matDate.substring(0,4)) + 1).toString();
      }
      else
        this.loanCount = 0;
      console.log("inside dashboard");
      console.log(response);
    });
    this.dbService.getBorrowerDetailsByCustomerId(this.userService.getCustomerId()).subscribe((response) => {
      //console.log(response);
      this.fullName = response[0].firstName + " " + response[0].lastName;
      let fullAccount = response[0].accountno;
      this.accountnumber = fullAccount.substring(fullAccount.length - 4);
      this.ifsccode = response[0].ifsccode.toUpperCase();
      //console.log(this.accountnumber);
    });
    this.dbService.getTransactionsByCustomerId(this.userService.getCustomerId()).subscribe((response) => {
      this.transactions = response;
    });
    this.dbService.getInterestDetailsByCustomerId(this.userService.getCustomerId()).subscribe((response) => {
      this.interest = response[0].amount;
    });
  }

  changeShowToOne(){
    this.show = 1;
  }

  changeShowToTwo(){
    this.show = 2;
  }
  loanScreen(){
    this.router.navigate(['/loanrequest']);
  }
  createPrepayment(){
    this.router.navigate(['/createPrepayment']);
  }
  convertString(str) {
    return parseInt(str);
  }

}
