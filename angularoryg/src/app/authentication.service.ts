import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { EmployeesService } from './employees.service';
import { Employee } from './employee';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  mockPassword: string = "123";

  private employees: Employee[] = [];

  constructor(private employeesService: EmployeesService) { }

  login(username: string, password: string): Observable<any> {

    let modelEmployee = { username: username, password: password };

    return this.employeesService.getEmployees().pipe(mergeMap(employees => {
      this.employees = employees;
      let requestedEmployee = this.employees.find(employee => employee.login === modelEmployee.username);

      if (!requestedEmployee) {
        return Observable.throw("User not found!");
      }

      if (!requestedEmployee.asi) {
        return Observable.throw("You are not authorized to enter! (No ASI privilege)");
      }

      if (password !== this.mockPassword) {
        return Observable.throw("Password is incorrect!");
      }

      localStorage.setItem("currentUser", JSON.stringify(requestedEmployee));
      console.info(`AuthenticationService: login => Login successful with login data: ${JSON.stringify(modelEmployee)}`);

      return of(requestedEmployee);
    }));
  }


  logout(): void {
    localStorage.removeItem("currentUser");
  }
}
