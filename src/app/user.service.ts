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
  }
  
  setLenderDetails(customerId: string, userType: string) {
    this.customerID = customerId;
    this.userType = userType;
  }
  setAccountId(accountId: string) {
    this.accountId = accountId;
  }
  getCustomerId() {
    return this.customerID;
  }
}
