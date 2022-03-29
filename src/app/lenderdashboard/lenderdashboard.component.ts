import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../db.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-lenderdashboard',
  templateUrl: './lenderdashboard.component.html',
  styleUrls: ['./lenderdashboard.component.css']
})
export class LenderdashboardComponent implements OnInit {
  investamount: number;
  maturityDate: string;
  frequency: string;
  fullName: string;
  accountnumber: string;
  ifsccode: string;
  transactions: any;
  public count: number;
  public month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  constructor(private router: Router, private dbService: DBService, private userService: UserService) { 
    this.maturityDate = "";
  }

  ngOnInit(): void {
  //  let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    this.dbService.getInvestmentsByCustomerId(this.userService.getCustomerId()).subscribe((response)=>{
      if(response.length != 0) {
       this.count = 1;
       this.transactions = response;
      }
      else{
        this.count=0;
      }
      console.log("inside lender dashboard");
      console.log(response);
    });
    this.dbService.getLenderDetailsByCustomerId(this.userService.getCustomerId()).subscribe((response) => {
      //console.log(response);
      this.fullName = response[0].firstName + " " + response[0].lastName;
      let fullAccount = response[0].accountno;
      this.accountnumber = fullAccount.substring(fullAccount.length - 4);
      this.ifsccode = response[0].ifsccode.toUpperCase();
      //console.log(this.accountnumber);
    });
  }

  investScreen(){
    this.router.navigate(['/investmoney']);
  }
  convertString(str) {
    return parseInt(str);
  }
}
