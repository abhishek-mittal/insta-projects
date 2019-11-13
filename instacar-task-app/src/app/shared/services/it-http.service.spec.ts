import { TestBed } from '@angular/core/testing';

import { ItHttpService } from './it-http.service';

describe('ItHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItHttpService = TestBed.get(ItHttpService);
    expect(service).toBeTruthy();
  });
});
