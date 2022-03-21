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
  public month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  constructor(private router: Router, private dbService: DBService, private userService: UserService) { 
    this.maturityDate = "";
  }

  ngOnInit(): void {
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    this.dbService.getInvestmentsByCustomerId(this.userService.getCustomerId()).subscribe((response)=>{
      console.log(response);
      if(response.length != 0) {
        this.investamount = response[0].amount;
        let matDate = response[0].requestDate;
        this.frequency = response[0].frequency;
     //  let intDate = response[0].interestDueDate;
    //   this.interestDueDate = intDate.substring(8,10)+" "+month[parseInt(intDate.substring(5,7))-1]+" "+(parseInt(intDate.substring(0,4))).toString();
       this.maturityDate = matDate.substring(8,10)+" "+month[parseInt(matDate.substring(5,7))-1]+" "+(parseInt(matDate.substring(0,4)) + 1).toString();
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
