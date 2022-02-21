import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userType: string;
  private customerID: string;
  constructor() { }
  setBorrowerDetails(customerId: string, userType: string) {
    this.customerID = customerId;
    this.userType = userType;
  }
  setLenderDetails(customerId: string, userType: string) {
    this.customerID = customerId;
    this.userType = userType;
  }
  getCustomerId() {
    return this.customerID;
  }
}
