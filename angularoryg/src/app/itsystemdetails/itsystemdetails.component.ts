import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItSystem } from '../itsystem';
import { IncidentReport } from '../incidentreport';
import { IncidentReportService } from '../incidentreport.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Employee } from '../employee';

@Component({
  selector: 'app-itsystemdetails',
  templateUrl: './itsystemdetails.component.html',
  styleUrls: ['./itsystemdetails.component.css']
})
export class ItSystemDetailsComponent implements OnInit {

  @Input()
  selectedItSystem: ItSystem = null;

  @Input()
  selectedEmployee: Employee = null;

  @Input()
  selectedEmployeeItSystems: ItSystem[] = [];

  allIncidentReports: IncidentReport[] = [];

  selectedIncidentReport: IncidentReport = null;

  incidentReports: IncidentReport[] = [];
  incidentReports$: Observable<IncidentReport[]>;
  searchTerms = new Subject<string>();

  inSearchMode: boolean = false;

  noResultsFound: boolean = false;

  @Input()
  inQuickReport: boolean = false;

  previouslySelectedIncidentReport: IncidentReport = null;

  constructor(private activatedRoute: ActivatedRoute, private incidentReportService: IncidentReportService) { }

  ngOnInit() {
    this.getIncidentReportsBySystem();

    this.incidentReports$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) =>
        this.incidentReportService.searchIncidentReportsByType(this.selectedItSystem.id, term))
    );
  }

  onIncidentReportAdded(args: any) {
    console.log(`Incident report added: ${JSON.stringify(args.incidentReport)} to system: ${JSON.stringify(args.itSystem)}`);
    this.inQuickReport = false;
    this.inSearchMode = false;
    this.selectedItSystem = args.itSystem;
    this.getIncidentReportsBySystem();
  }

  search(term: string): void {
    if (!term || term === '') {
      this.inSearchMode = false;
      return;
    }
    this.inSearchMode = true;

    this.searchTerms.next(term.toLowerCase());
  }

  selectIncidentReport(incidentReport: IncidentReport) {
    if (incidentReport === this.previouslySelectedIncidentReport) {
      this.selectedIncidentReport = null;
    }
    else {
      this.selectedIncidentReport = incidentReport;
    }

    this.previouslySelectedIncidentReport = this.selectedIncidentReport;

  }

  goToQuickReport() {
    this.inQuickReport = true;
  }

  getIncidentReportsBySystem() {
    if (!this.selectedItSystem) {
      this.selectedItSystem = this.selectedEmployeeItSystems[0];
    }
    this.incidentReportService.getIncidentReportsByItSystemId(this.selectedItSystem.id).subscribe(incidentReports => {
      this.allIncidentReports = incidentReports;
    });
  }
}
