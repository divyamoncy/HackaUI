import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer, OrganisationCustomer } from './models/customer';
import { ROOT_API } from './config';
import { Account } from './models/account';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private httpClient: HttpClient) { }

  postCustomer(
    customer:Customer,
    access_token
  ): Observable<any> {
    // var x= {
    //   "branchCode": "00000001",
    //   "enterpriseName": "Green Mountain Tea Company",
    //   "registrationNumber": "5592032",
    //   "countryOfRegistration": "US",
    //   "address": [
    //     {
    //       "addressType": "BUSINESS",
    //       "country": "US",
    //       "line1": "22nd floor",
    //       "line2": "Tower A",
    //       "line3": "Mulberry Park",
    //       "line4": "Expo Industrial Park",
    //       "line5": "Reading",
    //       "postalCode": "RG1 2BN",
    //       "buildingNumber": "55"
    //     }
    //   ],
    //   "phoneNumber": [
    //     {
    //       "type": "OFFICE",
    //       "number": "004401753573244"
    //     }
    //   ],
    //   "emailAddress": [
    //     {
    //       "type": "OFFICE",
    //       "address": "customer.support@gmt.com"
    //     }
    //   ],
    //   "kycCheckRequired": "CORE-DEFINED"
    // };

  //   var x={
  //     "countryOfResidency": "IN",
  //     "kycCheckRequired": "CORE-DEFINED",
  //     "dateOfBirth": "2021-12-27",
  //     "firstName": "kjjksk",
  //     "lastName": "uhehh",
  //     "address": [
  //         {
  //             "addressType": "RESIDENTIAL",
  //             "country": "IN",
  //             "line1": "dkkjj",
  //             "line2": "heukall"
  //         }
  //     ],
  //     "emailAddress": [
  //         {
  //             "type": "HOME",
  //             "address": "sample@gmail.com"
  //         }
  //     ],
  //     "phoneNumber": [
  //         {
  //             "type": "RESIDENTIAL",
  //             "number": "1672677"
  //         }
  //     ],
  //     "identification": {
  //         "type": "NIDN",
  //         "id": "poshh123"
  //     },
  //     "fatcaDetails": {
  //         "isUSResident": false,
  //         "isUSTaxResident": false,
  //         "tin": "871877"
  //     }
  // };
    console.log(`Bearer ${access_token}`);
    console.log("AFter token");
    // var x = JSON.stringify(customer);
    // console.log(x);
    return this.httpClient.post<any>(
      `${ROOT_API}/customers/v1/personal-customers`, customer, {
        headers: { 
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json' }
      })
      .pipe(map((response) => response));
}

postAccount(
  account:Account,
  access_token
): Observable<any> {
  
  console.log(`Bearer ${access_token}`);
  console.log("AFter token");
  // var x = JSON.stringify(customer);
  // console.log(x);
  return this.httpClient.post<any>(
    `${ROOT_API}/current-and-savings-account/onboarding/v1/accounts/currentsavings`, account, {
      headers: { 
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json' }
    })
    .pipe(map((response) => response));
}

postOrganisation(
  customer:OrganisationCustomer,
  access_token
): Observable<any> {
  console.log(`Bearer ${access_token}`);
  console.log("AFter token");
  return this.httpClient.post<any>(
      `${ROOT_API}/customers/v1/enterprise-customers`, customer, {
	        headers: { 
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json' }
    })
    .pipe(map((response) => response));
}

  getToken(
    url = '/tokenproxy',
    client_id = 'eab4cc5b-75a3-4805-be73-f1eb94ff7456',
    client_secret = '3c463f2b-6a84-47d9-9bb9-2e76974e4863'
  ): Observable<any> {
    const data =
      'grant_type=client_credentials&client_id=' +
      client_id +
      '&client_secret=' +
      client_secret;
  
    return this.httpClient
      .post(url, data, {
        headers: { 
        'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .pipe(map((response) => response['access_token']));
  }


  


}
