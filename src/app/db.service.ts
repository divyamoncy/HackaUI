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
}
