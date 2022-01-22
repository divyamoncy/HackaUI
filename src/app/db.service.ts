import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DBBorrower } from './models/customer';

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

    getBorrowerDetailsByCustomerId(customerId): Observable<any> {
      customerId='029417';
      return this.httpClient.get<any>(`/borrower/`+customerId)
      .pipe(map((response) => response));
    }

    getPersonalLoanAmount(category, experience): Observable<any> {
      return this.httpClient.get<any>(`/personalLoan/`+category+`/`+experience)
      .pipe(map((response) => response));
    }
}
