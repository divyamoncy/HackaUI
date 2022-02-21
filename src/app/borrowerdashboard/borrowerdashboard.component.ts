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

  constructor(private router: Router, private dbService: DBService, private userService: UserService) { }

  ngOnInit(): void {
    this.dbService.getCustomerLoans(this.userService.getCustomerId()).subscribe((response)=>{
      console.log("inside dashboard");
      console.log(response);
    });
  }

  loanScreen(){
    this.router.navigate(['/loanrequest']);
  }

}
