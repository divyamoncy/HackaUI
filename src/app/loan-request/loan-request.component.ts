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
  constructor(private dbService: DBService, private userService: UserService) { }

  ngOnInit(): void {
    this.dbService.getBorrowerDetailsByCustomerId(this.userService.getCustomerId()).subscribe((response)=>{
      this.instantAmount = response.monthlysalary * 2;
      this
  });
  }

  createInstantLoan() {

  }

  createPersonalLoan() {

  }

}
