import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators'
import { of } from 'rxjs/observable/of';
import { ItSystem } from './itsystem';
import { Corsable } from './corsable';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { filter } from 'rxjs/operators/filter';

@Injectable()
export class ItSystemsService {

  @Corsable()
  private itSystemsApiUrl = 'http://localhost:8080/itsystems';

  constructor(private http: HttpClient) { }

  getItSystemsByEmployeeId(employeeId: string): Observable<ItSystem[]> {
    return this.http.get<ItSystem[]>(this.itSystemsApiUrl + `/adminId=${employeeId}`);
  }

  private errorHandler<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {

      console.error(error);
      return of(result as T);
    };
  }
}
