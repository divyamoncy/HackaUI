import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-borrowerdashboard',
  templateUrl: './borrowerdashboard.component.html',
  styleUrls: ['./borrowerdashboard.component.css']
})
export class BorrowerdashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  loanScreen(){
    this.router.navigate(['/loanrequest']);
  }

}
