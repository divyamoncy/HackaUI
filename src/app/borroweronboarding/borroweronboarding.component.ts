import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address, Customer, EmailAddress, fatcaDetails, Identification, PhoneNumber } from '../models/customer';

@Component({
  selector: 'app-borroweronboarding',
  templateUrl: './borroweronboarding.component.html',
  styleUrls: ['./borroweronboarding.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BorroweronboardingComponent implements OnInit {
  public focus: number;
  public borrowerOnboardingForm: FormGroup;
  public customer: Customer;
  public address: Address[];
  public phoneNumber: PhoneNumber[];
  public emailAddress: EmailAddress[];
  public identification: Identification;
  public fatcaDetails: fatcaDetails;
  
  constructor(public formBuilder: FormBuilder) {
    this.focus = 1;
    this.borrowerOnboardingForm = formBuilder.group({
      firstname: ['',Validators.required],
      lastname: ['', Validators.required],
      aadhar: ['', Validators.required],
      pan: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required]
  });
  }

  ngOnInit(): void {
    
  }

  createCustomer() {
    this.customer = {} as Customer;
    this.identification = {} as Identification;
    this.fatcaDetails = {} as fatcaDetails;
    this.phoneNumber = [];
    this.address = [];
    this.emailAddress = [];
    this.address.push({"addressType": "RESIDENTIAL",
        "country": "IN",
        "line1": this.borrowerOnboardingForm.value.address1,
        "line2": this.borrowerOnboardingForm.value.address2
        });
    this.phoneNumber.push({
      "type": "RESIDENTIAL",
      "number": "123444444444"
    });
    this.emailAddress.push({
      "type": "HOME",
      "address": "sample@gmail.com"
    });
    this.identification.type="NIDN";
    this.identification.id = this.borrowerOnboardingForm.value.aadhar;
    this.fatcaDetails.isUSResident = false;
    this.fatcaDetails.isUSTaxResident = false;
    this.customer.countryOfResidency = "IN";
    this.customer.kycCheckRequired = "CORE-DEFINED";
    this.fatcaDetails.tin = this.borrowerOnboardingForm.value.pan;
    this.customer.firstName = this.borrowerOnboardingForm.value.firstname;
    this.customer.lastName = this.borrowerOnboardingForm.value.lastname;
    this.customer.address = this.address;
    this.customer.emailAddress = this.emailAddress;
    this.customer.phoneNumber = this.phoneNumber;
    this.customer.identification = this.identification;
    this.customer.fatcaDetails = this.fatcaDetails;
    console.log(JSON.stringify(this.customer));

  }

}
