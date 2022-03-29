import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ApiCallService } from '../api-call.service';
import { DBService } from '../db.service';
import { Account, AccountAdditionalDetails } from '../models/account';
import { Address, Customer, DBBorrower, EmailAddress, fatcaDetails, Identification, PhoneNumber } from '../models/customer';
import { UserService } from '../user.service';

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
  public dbBorrower: DBBorrower;
  public account: Account;
  public accountDetails: AccountAdditionalDetails;
  public loading: number;
  public loadText: string;
  //public resp: any;
  
  constructor(public formBuilder: FormBuilder, private apiCallService: ApiCallService, public httpClient: HttpClient, 
    private dbService: DBService, private userService: UserService, private router: Router) {
    this.focus = 1;
    this.loading = 0;
    this.borrowerOnboardingForm = formBuilder.group({
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
      experience: ['', Validators.required],
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

  changeFocusToFour() {
    this.focus = 4;
  }
  onReady(callback) {
    setTimeout( function(){ 
      // Do something after 1 second 
      this.loadText ="Saving your details 💼";
    }  , 500 );
     setTimeout( function(){ 
      // Do something after 1 second 
      this.loadText ="Doing some magic 👾";
    }  , 1000 );
    
    setTimeout( function(){ 
      // Do something after 1 second 
      this.loadText ="We are almost there 🚀";
    }  , 1400 );
     
    setTimeout( function(){ 
      // Do something after 1 second 
      this.loadText ="Getting things ready ✔️";
    }  , 1900 );
     
    
      var intervalID = window.setInterval(checkReady, 3000);
      function checkReady() {
          if (this.loading==2) {
              window.clearInterval(intervalID);
              callback.call(this);
          }
      }
  }

  

  createCustomer() {
  //   this.onReady(() => {
  //     this.router.navigate(['/borrowerdashboard']);
  // });
    this.loading = 1;
    this.loadText ="We are almost there 🚀";
    this.customer = {} as Customer;
    this.dbBorrower = {} as DBBorrower;
    this.identification = {} as Identification;
    this.fatcaDetails = {} as fatcaDetails;
    this.account = {} as Account;
    this.accountDetails = {} as AccountAdditionalDetails;
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
      "number": this.borrowerOnboardingForm.value.phonenumber
    });
    this.emailAddress.push({
      "type": "HOME",
      "address": "sample@gmail.com"
    });
    this.identification.type="ARNU";
    this.identification.id = this.borrowerOnboardingForm.value.aadhar;
    this.fatcaDetails.isUSResident = false;
    this.fatcaDetails.isUSTaxResident = false;
    this.customer.countryOfResidency = "IN";
    this.customer.kycCheckRequired = "CORE-DEFINED";
    this.customer.dateOfBirth = this.borrowerOnboardingForm.value.dateofbirth;
    this.fatcaDetails.tin = this.borrowerOnboardingForm.value.pan;
    this.customer.firstName = this.borrowerOnboardingForm.value.firstname;
    this.customer.lastName = this.borrowerOnboardingForm.value.lastname;
    this.customer.address = this.address;
    this.customer.emailAddress = this.emailAddress;
    this.customer.phoneNumber = this.phoneNumber;
    this.customer.identification = this.identification;
    this.customer.fatcaDetails = this.fatcaDetails;
    //DB Customer
    this.dbBorrower.countryOfResidency = "IN";
    this.dbBorrower.kycCheckRequired = "CORE-DEFINED";
    this.dbBorrower.dateOfBirth = this.borrowerOnboardingForm.value.dateofbirth;
    this.dbBorrower.firstName = this.borrowerOnboardingForm.value.firstname;
    this.dbBorrower.lastName = this.borrowerOnboardingForm.value.lastname;
    this.dbBorrower.address = this.address;
    this.dbBorrower.emailAddress = this.emailAddress;
    this.dbBorrower.phoneNumber = this.phoneNumber;
    this.dbBorrower.identification = this.identification;
    this.dbBorrower.fatcaDetails = this.fatcaDetails;
    this.dbBorrower.accountno = this.borrowerOnboardingForm.value.accountno;
    this.dbBorrower.ifsccode = this.borrowerOnboardingForm.value.ifsccode;
    this.dbBorrower.bank = this.borrowerOnboardingForm.value.bank;
    this.dbBorrower.branch = this.borrowerOnboardingForm.value.branch;
    this.dbBorrower.bankaddress = this.borrowerOnboardingForm.value.bankaddress;
    this.dbBorrower.monthlysalary = this.borrowerOnboardingForm.value.monthlysalary;
    this.dbBorrower.companyName = this.borrowerOnboardingForm.value.companyname;
    this.dbBorrower.experience = this.borrowerOnboardingForm.value.experience;
    this.dbBorrower.referralname = this.borrowerOnboardingForm.value.referralname;
    this.dbBorrower.referralphone = this.borrowerOnboardingForm.value.referralphone;
    this.dbBorrower.guarantorname = this.borrowerOnboardingForm.value.guarantorname;
    this.dbBorrower.guarantorphone = this.borrowerOnboardingForm.value.guarantorphone;
    this.dbBorrower.guarantoremail = this.borrowerOnboardingForm.value.guarantoremail;
    this.dbBorrower.guarantoraddress = this.borrowerOnboardingForm.value.guarantoraddress;
    
    //console.log(JSON.stringify(this.customer));
    this.apiCallService.getToken().subscribe((res)=>{

      this.apiCallService.postCustomer(this.customer, res).subscribe((resp)=>{
        
        console.log("Inside API call");
        console.log(resp.customerId);
        this.userService.setBorrowerDetails(resp.customerId, "Borrower");
        this.dbBorrower.customerId = resp.customerId;
        this.account.customerId = resp.customerId;
        this.account.productId = "01010DEFAULTUSD";
        this.account.accountOwnership = "SOLE";
        this.accountDetails.modeOfOperation = "SOLE";
        this.accountDetails.postingRestriction = "NONE";
        this.account.accountAdditionalDetails = this.accountDetails;
        this.apiCallService.getToken().subscribe((tok)=>{
          this.apiCallService.postAccount(this.account, tok).subscribe((response)=>{
            console.log(response.accountId);
            this.userService.setAccountId(response.accountId);
            this.loading == 2;
            this.router.navigate(['/borrowerdashboard']);
            
          });
        });
        this.dbService.insertBorrower(this.dbBorrower).subscribe((resp)=>{
          console.log("Inside DB");
          console.log(resp);
          });
        });
    });
   

  }

}
