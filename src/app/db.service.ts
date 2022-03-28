import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DBBorrower, DBLender, OrganisationCustomerDB } from './models/customer';

@Injectable({
  providedIn: 'root'
})
export class DBService {

  constructor(private httpClient: HttpClient) { }

  insertBorrower(
    dbBorrower : DBBorrower
      ): Observable<any> {
        console.log(dbBorrower);
        return this.httpClient.post<any>(
          `/insertBorrower`, dbBorrower, {
            headers: { 
              'Content-Type': 'application/json' }
          })
          .pipe(map((response) => response));
    }

    insertLender(
      dbLender : DBLender
        ): Observable<any> {
          console.log(dbLender);
          return this.httpClient.post<any>(
            `/insertLender`, dbLender, {
               headers: { 
                  'Content-Type': 'application/json' }
              })
              .pipe(map((response) => response));
        }

    insertLoan(
      loan
        ): Observable<any> {
          console.log(loan);
          return this.httpClient.post<any>(
            `/insertLoan`, loan, {
              headers: { 
                'Content-Type': 'application/json' }
            })
            .pipe(map((response) => response));
      }
    insertOrganisation(
      dbOrganisation : OrganisationCustomerDB
        ): Observable<any> {
          console.log(dbOrganisation);
          return this.httpClient.post(
            `/insertOrganisation`, dbOrganisation, {
              headers: { 
                'Content-Type': 'application/json' }
            })
            .pipe(map((response) => response));
      }
    insertInterestDetails(
      interestDetails: any
    ): Observable<any> {
        console.log(interestDetails);
          return this.httpClient.post(
            `/insertInterestDetails`, interestDetails, {
              headers: { 
                'Content-Type': 'application/json' }
            })
            .pipe(map((response) => response));
    }

    insertTransaction(
      transaction: any
    ): Observable<any> {
        console.log(transaction);
          return this.httpClient.post(
            `/insertTransaction`, transaction, {
              headers: { 
                'Content-Type': 'application/json' }
            })
            .pipe(map((response) => response));
    }

    insertInvestment(
      investment: any
    ): Observable<any> {
        console.log(investment);
          return this.httpClient.post(
            `/insertInvestment`, investment, {
              headers: { 
                'Content-Type': 'application/json' }
            })
            .pipe(map((response) => response));
    }

    insertPrepayment(
      id: string, prepayment: any
    ): Observable<any> {
        console.log(prepayment);
          return this.httpClient.post(
            `/updatePrepayment/`+id, prepayment, {
              headers: { 
                'Content-Type': 'application/json' }
            })
            .pipe(map((response) => response));
    }

    updateInterest(
      id: string, interest: any
    ): Observable<any> {
        console.log(interest);
          return this.httpClient.post(
            `/updateInterest/`+id, interest, {
              headers: { 
                'Content-Type': 'application/json' }
            })
            .pipe(map((response) => response));
    }

    getBorrowerDetailsByCustomerId(customerId): Observable<any> {
      //customerId='029417';
      return this.httpClient.get<any>(`/borrower/`+customerId)
      .pipe(map((response) => response));
    }

    getLenderDetailsByCustomerId(customerId): Observable<any> {
      //  customerId='029417';
        return this.httpClient.get<any>(`/lender/`+customerId)
        .pipe(map((response) => response));
      }

    getInterestDetailsByCustomerId(customerId): Observable<any> {
        
          return this.httpClient.get<any>(`/interestDetails/`+customerId)
          .pipe(map((response) => response));
    }

    getPersonalLoanAmount(category, experience): Observable<any> {
      return this.httpClient.get<any>(`/personalLoan/`+category+`/`+experience)
      .pipe(map((response) => response));
    }

    getCustomerLoans( customerId ): Observable<any> {
      return this.httpClient.get<any>(`/`+customerId+`/loans`)
      .pipe(map((response) => response));
    }

    getTransactionsByCustomerId( customerId ): Observable<any> {
      return this.httpClient.get<any>(`/transaction/`+customerId)
      .pipe(map((response) => response));
    }

    getInvestmentsByCustomerId( customerId ): Observable<any> {
      return this.httpClient.get<any>(`/investment/`+customerId)
      .pipe(map((response) => response));
    }
}
function dbLender(dbLender: any) {
  throw new Error('Function not implemented.');
}

