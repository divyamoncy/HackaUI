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

    getBorrowerDetailsByCustomerId(customerId): Observable<any> {
      customerId='029365'
      return this.httpClient.get<any>(`/borrower/`+customerId)
      .pipe(map((response) => response));
    }
}
