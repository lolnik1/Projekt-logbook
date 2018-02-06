import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ItSystem } from '../itsystem';
import { Router } from '@angular/router';
import { ItSystemsService } from '../itsystems.service';
import { IncidentReportService } from '../incidentreport.service';
import { pipe } from 'rxjs';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { IncidentReport } from '../incidentreport';
import { AlertService } from '../alert.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-itsystemslist',
  templateUrl: './itsystemslist.component.html',
  styleUrls: ['./itsystemslist.component.css']
})
export class ItSystemsListComponent implements OnInit {

  itSystems: ItSystem[] = [];

  selectedItSystem: ItSystem = null;

  incidentReports: IncidentReport[] = [];

  lastFiveIncidentReports: IncidentReport[] = [];

  @Input()
  inDetailsMode: boolean = false;

  @Output()
  onDetailsPage = new EventEmitter<boolean>();

  @Input()
  inQuickReport: boolean;

  selectedEmployee: Employee = null;

  previousAttemptFailed: boolean = false;

  constructor(private router: Router,
    private itSystemsService: ItSystemsService,
    private incidentReportService: IncidentReportService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.getItSystemsByEmployeeId();
    this.getIcidentReportsByEmployee();
  }

  onHomeQuickReportEvent(value: boolean) {
    this.inQuickReport = true;
  }

  getItSystemsByEmployeeId() {
    this.selectedEmployee = JSON.parse(localStorage.getItem("currentUser"));

    this.itSystemsService.getItSystemsByEmployeeId(this.selectedEmployee.id).subscribe(itSystems => {
      this.itSystems = itSystems;
      this.itSystems.map(itSystem => {
        let incidentReportsCount = this.incidentReportService.getIncidentReportsByItSystemId(itSystem.id).subscribe(incidentReports => {
          itSystem.incidentReportsCount = incidentReports.length;


        }, null, () => {
          this.itSystems.sort((a, b) => {
            if (a.incidentReportsCount > b.incidentReportsCount) {
              return -1;
            }
            return 1;
          });
        });
      });
    });
  }


  getIcidentReportsByEmployee() {
    this.incidentReportService.getIncidentReportsByEmployeeId(this.selectedEmployee.id).subscribe(incidentReports => {
      this.lastFiveIncidentReports = incidentReports;

    }, null, () => {
      this.lastFiveIncidentReports.sort((a, b) => {
        if (a.date > b.date) {
          return -1;
        }
        return 1;
      });
      this.lastFiveIncidentReports = this.lastFiveIncidentReports.slice(-5);
    });
  }

  getIncidentReports() {
    return this.incidentReportService.getIncidentReports();

  }

  countItSystemIncidentReports(itSystem: ItSystem): number {
    return itSystem.incidentReportsCount;
  }

  selectItSystem(itSystem: ItSystem) {
    this.selectedItSystem = itSystem;
  }

  goToItSystemDetails() {

    if (!this.selectedItSystem) {
      this.alertService.warning(`No IT System selected.`, true);
      return;
    }

    if (!this.selectedItSystem.incidentReportsCount) {
      this.alertService.info(`There are no incident reports for this system.`, true);
    }

    this.inDetailsMode = true;
    this.onDetailsPage.emit(this.inDetailsMode);
  }
}
