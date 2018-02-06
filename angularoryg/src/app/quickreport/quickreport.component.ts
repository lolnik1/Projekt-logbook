import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ItSystem } from '../itsystem';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { IncidentReportService } from '../incidentreport.service';
import { IncidentReport } from '../incidentreport';

import * as moment from 'moment';
import { Employee } from '../employee';
import { Incident } from '../incident';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-quickreport',
  templateUrl: './quickreport.component.html',
  styleUrls: ['./quickreport.component.css']
})
export class QuickreportComponent implements OnInit {

  static ADD_DATE_FORMAT: string = "YYYY-MM-DD";

  @Input()
  selectedItSystem: ItSystem = null;

  @Input()
  selectedEmployeeItSystems: ItSystem[] = [];

  @Input()
  selectedEmployee: Employee = null;

  incidentDescription: string;
  incidentType: string;

  incidentReport: IncidentReport = null;

  incident: Incident = null;

  formData: any = {};

  @Output()
  onIncidentReportAdded = new EventEmitter<any>();

  constructor(private incidentReportService: IncidentReportService, private alertService: AlertService) { }

  ngOnInit() {

  }

  addIncidentReport() {

    this.incidentDescription = this.formData.descr;
    this.incidentType = this.formData.type;

    this.incident = {
      descr: this.incidentDescription,
      type: this.incidentType,
      isIncidentTemplate: false
    } as Incident;

    if (!this.incident) {
      console.log("Incident was not created properly!");
    }

    // this.incidentReport = {
    //   incident: this.incident,
    //   addDate: moment().format(QuickreportComponent.ADD_DATE_FORMAT),
    //   employee: this.selectedEmployee,
    //   itSystem: this.selectedItSystem as ItSystem
    // } as IncidentReport;

    this.incidentReport = {
      incident: this.incident,
      date: moment().format(QuickreportComponent.ADD_DATE_FORMAT),
      employeeId: this.selectedEmployee.id,
      itSystemId: (this.selectedItSystem as ItSystem).id
    } as IncidentReport;

    console.log(this.incidentReport);
    if (!this.incidentReport || !this.incidentDescription || !this.incidentType || !this.incidentDescription.length || !this.incidentType.length) {
      console.error("Incident Report was not created properly!");
      return;
    }

    console.log(`Created incident report ready for POST: ${JSON.stringify(this.incidentReport)}`);

    this.incidentReportService.addIncidentReport(this.incidentReport).subscribe(incidentReport => {
      console.log(`Added incident report: ${JSON.stringify(incidentReport)}`);
      this.selectedItSystem.incidentReportsCount++;
      this.selectedEmployeeItSystems.sort((a, b) => {
        if (a.incidentReportsCount > b.incidentReportsCount) {
          return -1;
        }
        return 1;
      });

      this.alertService.success(`Incident report added to ${this.selectedItSystem.name}`);
      this.onIncidentReportAdded.emit({ itSystem: this.selectedItSystem, incidentReport: this.incidentReport });
    });
  }

  onIncidentDescriptionChange(value: string) {
    this.incidentDescription = value;
  }

  onIncidentTypeChange(value: string) {
    this.incidentType = value;
  }

  itSystemSelectComparator() {
    return (a, b) => {
      if (a === this.selectedItSystem) {
        return -1;
      }
      return 1;
    };
  }

  selectedItSystemChanged(value) {
    this.selectedItSystem = this.selectedEmployeeItSystems.find(system => value === system.name);
    console.log(JSON.stringify(this.selectedItSystem));
  }
}
