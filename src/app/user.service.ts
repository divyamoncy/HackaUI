import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userType: string;
  private customerID: string;
  private accountId: string;
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
  getCustomerId() {
   // return "029417";
   return sessionStorage.getItem('customerID');
    //return this.customerID;
  }
  
}
