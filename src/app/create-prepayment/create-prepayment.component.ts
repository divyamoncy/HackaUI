import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DBService } from '../db.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-prepayment',
  templateUrl: './create-prepayment.component.html',
  styleUrls: ['./create-prepayment.component.css']
})
export class CreatePrepaymentComponent implements OnInit {
  public prepayment: FormGroup;
  public unpaidPrincipal: number;
  public customerId: string;
  constructor(public formBuilder: FormBuilder, private dbService: DBService, private userService: UserService) {
    this.prepayment = formBuilder.group({
      amount: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  
    this.dbService.getCustomerLoans(this.userService.getCustomerId()).subscribe((response)=>{
      //let data = {};
      if(response.length != 0) {
        this.customerId = response[0].customerId;
        //data["amount"] = this.prepayment.value.amount;
        //console.log(response[0]["_id"]);
        this.unpaidPrincipal = response[0].unpaidPrincipal;
      }
    });
  }

  createPrincipalPayment() {
    this.dbService.getCustomerLoans(this.userService.getCustomerId()).subscribe((response)=>{
      let data = {};
      if(response.length != 0) {
        data["amount"] = response[0]["unpaidPrincipal"] - this.prepayment.value.amount;
        console.log(response[0]["_id"]);
        this.dbService.insertPrepayment(response[0]["_id"], data).subscribe((resp) => {
          console.log(resp);
        });
        let transaction = {};
        transaction["customerId"] = this.customerId;
        transaction["date"] = new Date().toISOString().split("T")[0];
        transaction["amount"] = this.prepayment.value.amount;
        transaction["description"] = "Principal Payment";
        transaction["type"] = "debit";
        this.dbService.insertTransaction(transaction).subscribe((resp) => {
          console.log(resp);
        });
      }
    });

  }

}
