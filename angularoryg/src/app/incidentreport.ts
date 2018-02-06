import { Moment } from 'moment';
import { IncidentReportComment } from './incidentreportcomment';
import { Employee } from './employee';
import { ItSystem } from './itsystem';
import { Incident } from './incident';

export class IncidentReport {
  id: number;
  date: string;
  employeeId: string;
  itSystemId: string;
  incident: Incident;
}