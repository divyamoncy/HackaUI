import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {
  public show: number;

  constructor() { 
    this.show = 0;
  }

  ngOnInit(): void {
  }


  getTooltipText() {
    return `Interest Due Current Month: ${"wwww"}
    Past Due Interest: ${"wwww"}
    Late Payment Penalty: ${"wwww"}
    Other Charges: ${"wwww"}
    Start: ${"wwww"}
    End: ${"wwww"}`;
}

changeShowToOne(){
  this.show=1;

}
changeShowToZero(){
  this.show=0;

}

}