import { TestBed } from '@angular/core/testing';

import { JourneyWizardDataService } from './journey-wizard-data.service';

describe('JourneyWizardDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JourneyWizardDataService = TestBed.get(JourneyWizardDataService);
    expect(service).toBeTruthy();
  });
});
