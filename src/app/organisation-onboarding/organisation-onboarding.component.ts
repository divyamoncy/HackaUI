import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCallService } from '../api-call.service';
import { DBService } from '../db.service';
import { Customer, Address, PhoneNumber, EmailAddress, Identification, fatcaDetails, OrganisationCustomer, OrganisationCustomerDB } from '../models/customer';

@Component({
  selector: 'app-organisation-onboarding',
  templateUrl: './organisation-onboarding.component.html',
  styleUrls: ['./organisation-onboarding.component.css']
})
export class OrganisationOnboardingComponent implements OnInit {

  public focus: number;
  public organisationOnboardingForm: FormGroup;
  public customer: OrganisationCustomer;
  public customerDB: OrganisationCustomerDB;
  public address: Address[];
  public phoneNumber: PhoneNumber[];
  public emailAddress: EmailAddress[];
  
  constructor(public formBuilder: FormBuilder, private apiCallService: ApiCallService, public httpClient: HttpClient, private dbService: DBService) {
    this.focus = 1;
    this.organisationOnboardingForm = formBuilder.group({
      firmName: ['',Validators.required],
      registrationNumber: ['', Validators.required],
      dirFirstName: ['', Validators.required],
      dirLastName: ['', Validators.required],
      cin: ['', Validators.required],
      pan: ['', Validators.required],
      incorporationDate: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      address3: ['', Validators.required],
      pin: ['', Validators.required],
      accountno: ['', Validators.required],
      ifsccode: ['', Validators.required],
      bank: ['', Validators.required],
      branch: ['', Validators.required],
      bankaddress: ['', Validators.required]
  });
  }

  ngOnInit(): void {
  }

  changeFocusToOne() {
    this.focus = 1;
  }

  changeFocusToTwo() {
    this.focus = 2;
  }

  changeFocusToThree() {
    this.focus = 3;
  }

  createOrganisationCustomer() {
    this.customer = {} as OrganisationCustomer;
    this.customerDB = {} as OrganisationCustomerDB;
    this.phoneNumber = [];
    this.address = [];
    this.emailAddress = [];
    this.address.push({"addressType": "BUSINESS",
        "country": "IN",
        "line1": this.organisationOnboardingForm.value.address1,
        "line2": this.organisationOnboardingForm.value.address2,
        "line3": this.organisationOnboardingForm.value.address3,
        "postalCode": this.organisationOnboardingForm.value.pin
        });
    this.phoneNumber.push({
      "type": "OFFICE",
      "number": "123444444444"
    });
    this.emailAddress.push({
      "type": "OFFICE",
      "address": "sample@gmail.com"
    });
    this.customerDB.cin = this.organisationOnboardingForm.value.cin;
    this.customer.countryOfRegistration = "IN";
    this.customer.kycCheckRequired = "CORE-DEFINED";
    this.customerDB.countryOfRegistration = "IN";
    this.customerDB.kycCheckRequired = "CORE-DEFINED";
    this.customerDB.pan = this.organisationOnboardingForm.value.pan;
    this.customer.registrationNumber = this.organisationOnboardingForm.value.registrationNumber;
    this.customer.enterpriseName = this.organisationOnboardingForm.value.firmName;
    this.customerDB.registrationNumber = this.organisationOnboardingForm.value.registrationNumber;
    this.customerDB.enterpriseName = this.organisationOnboardingForm.value.firmName;
    this.customerDB.dirFirstName = this.organisationOnboardingForm.value.dirFirstName;
    this.customerDB.dirLastName = this.organisationOnboardingForm.value.dirLastName;
    this.customerDB.incorporationDate = this.organisationOnboardingForm.value.incorporationDate;
    this.customer.address = this.address;
    this.customer.emailAddress = this.emailAddress;
    this.customer.phoneNumber = this.phoneNumber;
    this.customerDB.address = this.address;
    this.customerDB.emailAddress = this.emailAddress;
    this.customerDB.phoneNumber = this.phoneNumber;
    this.customerDB.accountno = this.organisationOnboardingForm.value.accountno;
    this.customerDB.ifsccode = this.organisationOnboardingForm.value.ifsccode;
    this.customerDB.branch = this.organisationOnboardingForm.value.branch;
    this.customerDB.bankaddress = this.organisationOnboardingForm.value.bankaddress;
    this.customerDB.bank = this.organisationOnboardingForm.value.bank;
    console.log(JSON.stringify(this.customer));
    this.apiCallService.getToken().subscribe((res)=>{
      console.log("Token");
      console.log(res);
      this.apiCallService.postOrganisation(this.customer, res).subscribe((resp)=>{
        console.log("Inside API call");
        console.log(resp.customerId);
        this.customerDB.customerId = resp.customerId;
        this.dbService.insertOrganisation(this.customerDB).subscribe((resp)=>{
          console.log("Inside DB");
          console.log(resp);
          });
        });
    });

  }

}


