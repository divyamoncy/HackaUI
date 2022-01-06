import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-borroweronboarding',
  templateUrl: './borroweronboarding.component.html',
  styleUrls: ['./borroweronboarding.component.css']
})
export class BorroweronboardingComponent implements OnInit {
  public focus: number;
  constructor() {
    this.focus = 2;
  }

  ngOnInit(): void {
    
  }

}
