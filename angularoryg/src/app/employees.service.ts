import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Employee } from './employee';
import { ItSystemsService } from './itsystems.service';

import { Corsable } from './corsable';
import { ItSystem } from './itsystem';
import { mergeMap, tap, filter, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class EmployeesService {

  //@Corsable()
  //private employeesApiUrl = 'http://212.122.192.216:8097/api/v1/employee/all';
  @Corsable()
  private employeesApiUrl = 'http://localhost:8080/employees';

  constructor(private http: HttpClient, private itSystemsService: ItSystemsService) { }

  getEmployees(): Observable<Employee[]> {

    return this.http.get<Employee[]>(this.employeesApiUrl).pipe(tap(employees => {
    }), catchError(this.errorHandler('getEmployees', [])));
  }

  private errorHandler<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {

      console.error(error);
      return of(result as T);
    };
  }
}
