import { Component, OnInit } from '@angular/core';
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
  constructor(private dbService: DBService, private userService: UserService) { }

  ngOnInit(): void {
    this.dbService.getBorrowerDetailsByCustomerId(this.userService.getCustomerId()).subscribe((response)=>{
      console.log(response);
      this.instantAmount = response[0].monthlysalary * 2;
      this.personalAmount = response[0].monthlysalary * 5;
  });
  }

  createInstantLoan() {

  }

  createPersonalLoan() {

  }

}
