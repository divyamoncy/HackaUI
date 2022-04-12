import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userType: string;
  private customerID: string;
  private accountId: string;
  private email: string;
  constructor() { }
  setBorrowerDetails(customerId: string, userType: string) {
    this.customerID = customerId;
    this.userType = userType;
    sessionStorage.setItem('customerID', customerId);
    sessionStorage.setItem('userType', userType);
  }
  
  setLenderDetails(customerId: string, userType: string) {
    this.customerID = customerId;
    this.userType = userType;
    sessionStorage.setItem('customerID', customerId);
    sessionStorage.setItem('userType', userType);
  }
  setAccountId(accountId: string) {
    this.accountId = accountId;
    sessionStorage.setItem('accountId', accountId);
  }
  getAccountId() {
    //return "010100294300000";
    //return this.accountId;
    return sessionStorage.getItem('accountId');
  }

  setEmail(email: string) {
    this.email = email;
    sessionStorage.setItem('email', email);
  }
  getEmail() {
    //return "010100294300000";
    //return this.accountId;
    return sessionStorage.getItem('email');
  }
  getCustomerId() {
   // return "029417";
   return sessionStorage.getItem('customerID');
    //return this.customerID;
  }
  
}
