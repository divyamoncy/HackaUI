import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../db.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit {
  public focus: number;

  constructor(private router: Router, private dbService: DBService, private userService: UserService) { 
    this.focus = 1;
  }

  ngOnInit(): void {
  }

  borrowerSignUp(){
    this.router.navigate(['/borrowersignup']);
  }

  lenderSignUp(){
    this.router.navigate(['/lenderonboarding']);
  }

  organisationSignUp(){
    this.router.navigate(['/ngoSignUp']);
  }

  changeFocusToTwo(){
    this.focus = 2;
  }

}
