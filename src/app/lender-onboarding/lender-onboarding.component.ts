import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCallService } from '../api-call.service';
import { DBService } from '../db.service';
import { Address, Customer, DBLender, EmailAddress, fatcaDetails, Identification, PhoneNumber } from '../models/customer';

@Component({
  selector: 'app-lender-onboarding',
  templateUrl: './lender-onboarding.component.html',
  styleUrls: ['./lender-onboarding.component.css']
})
export class LenderOnboardingComponent implements OnInit {
  public focus: number;
  public lenderOnboardingForm: FormGroup;
  public customer: Customer;
  public address: Address[];
  public phoneNumber: PhoneNumber[];
  public emailAddress: EmailAddress[];
  public identification: Identification;
  public fatcaDetails: fatcaDetails;
  public dbLender: DBLender;

  constructor(public formBuilder: FormBuilder, private apiCallService: ApiCallService, public httpClient: HttpClient, private dbService: DBService) { 
    this.focus = 1;
    this.lenderOnboardingForm = formBuilder.group({
      firstname: ['',Validators.required],
      lastname: ['', Validators.required],
      aadhar: ['', Validators.required],
      pan: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      phonenumber: ['', Validators.required],
      dateofbirth: ['', Validators.required],
      accountno: ['', Validators.required],
      ifsccode: ['', Validators.required],
      bank: ['', Validators.required],
      branch: ['', Validators.required],
      bankaddress: ['', Validators.required],
      companyname: ['', Validators.required],
      monthlysalary: ['', Validators.required],
      referralname: ['', Validators.required],
      referralphone: ['', Validators.required],
      guarantorname: ['', Validators.required],
      guarantorphone: ['', Validators.required],
      guarantoremail: ['', Validators.required],
      guarantoraddress: ['', Validators.required]
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

  createLender() {
    this.customer = {} as Customer;
    this.dbLender = {} as DBLender;
    this.identification = {} as Identification;
    this.fatcaDetails = {} as fatcaDetails;
    this.phoneNumber = [];
    this.address = [];
    this.emailAddress = [];
    this.address.push({"addressType": "RESIDENTIAL",
        "country": "IN",
        "line1": this.lenderOnboardingForm.value.address1,
        "line2": this.lenderOnboardingForm.value.address2
        });
    this.phoneNumber.push({
      "type": "RESIDENTIAL",
      "number": this.lenderOnboardingForm.value.phonenumber
    });
    this.emailAddress.push({
      "type": "HOME",
      "address": "sample@gmail.com"
    });
    this.identification.type="ARNU";
    this.identification.id = this.lenderOnboardingForm.value.aadhar;
    this.fatcaDetails.isUSResident = false;
    this.fatcaDetails.isUSTaxResident = false;
    this.customer.countryOfResidency = "IN";
    this.customer.kycCheckRequired = "CORE-DEFINED";
    this.customer.dateOfBirth = this.lenderOnboardingForm.value.dateofbirth;
    this.fatcaDetails.tin = this.lenderOnboardingForm.value.pan;
    this.customer.firstName = this.lenderOnboardingForm.value.firstname;
    this.customer.lastName = this.lenderOnboardingForm.value.lastname;
    this.customer.address = this.address;
    this.customer.emailAddress = this.emailAddress;
    this.customer.phoneNumber = this.phoneNumber;
    this.customer.identification = this.identification;
    this.customer.fatcaDetails = this.fatcaDetails;
    //DB Customer
    this.dbLender.countryOfResidency = "IN";
    this.dbLender.kycCheckRequired = "CORE-DEFINED";
    this.dbLender.dateOfBirth = this.lenderOnboardingForm.value.dateofbirth;
    this.dbLender.firstName = this.lenderOnboardingForm.value.firstname;
    this.dbLender.lastName = this.lenderOnboardingForm.value.lastname;
    this.dbLender.address = this.address;
    this.dbLender.emailAddress = this.emailAddress;
    this.dbLender.phoneNumber = this.phoneNumber;
    this.dbLender.identification = this.identification;
    this.dbLender.fatcaDetails = this.fatcaDetails;
    this.dbLender.accountno = this.lenderOnboardingForm.value.accountno;
    this.dbLender.ifsccode = this.lenderOnboardingForm.value.ifsccode;
    this.dbLender.bank = this.lenderOnboardingForm.value.bank;
    this.dbLender.branch = this.lenderOnboardingForm.value.branch;
    this.dbLender.bankaddress = this.lenderOnboardingForm.value.bankaddress;
    console.log(JSON.stringify(this.customer));
    this.apiCallService.getToken().subscribe((res)=>{
      console.log("Token");
      console.log(res);
      this.apiCallService.postCustomer(this.customer, res).subscribe((resp)=>{
        console.log("Inside API call");
        console.log(resp.customerId);
        this.dbLender.customerId = resp.customerId;
        this.dbService.insertLender(this.dbLender).subscribe((resp)=>{
          console.log("Inside DB");
          console.log(resp);
          });
        });
    });
   


}}