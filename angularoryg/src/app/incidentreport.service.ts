import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { IncidentReport } from './incidentreport';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ItSystemsService } from './itsystems.service';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { Corsable } from './corsable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class IncidentReportService {

  @Corsable()
  private incidentReportApiUrl = 'http://localhost:8080/incident/reports';

  @Corsable()
  private incidentReportIdsApiUrl = 'http://localhost:8080/incident/report';

  constructor(private http: HttpClient) { }

  addIncidentReport(incidentReport: IncidentReport): Observable<IncidentReport> {
    return this.http.post<IncidentReport>(this.incidentReportIdsApiUrl, incidentReport, httpOptions)
      .pipe(catchError(this.errorHandler<IncidentReport>('addIncidentReport')));
  }

  getIncidentReports(): Observable<IncidentReport[]> {

    return this.http.get<IncidentReport[]>(this.incidentReportApiUrl).pipe(catchError(this.errorHandler('getIncidentReports', [])));
  }

  getIncidentReportsByItSystemId(itSystemId: string): Observable<IncidentReport[]> {

    return this.http.get<IncidentReport[]>(this.incidentReportApiUrl + `/system=${itSystemId}`).pipe(catchError(this.errorHandler('getIncidentReportsByItSystemId', [])));
  }

  getIncidentReportsByEmployeeId(employeeId: string): Observable<IncidentReport[]> {

    return this.http.get<IncidentReport[]>(this.incidentReportApiUrl + `/employeeId=${employeeId}`).pipe(catchError(this.errorHandler('getIncidentReportsByEmployeeId', [])));
  }

  searchIncidentReportsByTerm(term: string): Observable<IncidentReport[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<IncidentReport[]>(this.incidentReportApiUrl + `/search/term=${term}`).
      pipe(catchError(this.errorHandler<IncidentReport[]>('searchIncidentReportsByTerm', [])));
  }

  searchIncidentReportsByType(itSystemId: string, type: string): Observable<IncidentReport[]> {
    if (!type.trim()) {
      return of([]);
    }

    return this.http.get<IncidentReport[]>(this.incidentReportApiUrl + `/system=${itSystemId}/search/type=${type}`).
      pipe(catchError(this.errorHandler<IncidentReport[]>('searchIncidentReportsByType', [])));
  }

  private errorHandler<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {

      console.error(error);
      return of(result as T);
    };
  }
}
