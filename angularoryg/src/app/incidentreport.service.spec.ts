import { TestBed, inject } from '@angular/core/testing';
import { IncidentReportService } from './incidentreport.service';

describe('IncidentReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncidentReportService]
    });
  });

  it('should be created', inject([IncidentReportService], (service: IncidentReportService) => {
    expect(service).toBeTruthy();
  }));
});
