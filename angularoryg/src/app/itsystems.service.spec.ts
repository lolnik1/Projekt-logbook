import { TestBed, inject } from '@angular/core/testing';

import { ItsystemsService } from './itsystems.service';

describe('ItsystemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItsystemsService]
    });
  });

  it('should be created', inject([ItsystemsService], (service: ItsystemsService) => {
    expect(service).toBeTruthy();
  }));
});
