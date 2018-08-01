import { TestBed, inject } from '@angular/core/testing';

import { FoursquareService } from './foursquare.service';

describe('FoursquareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoursquareService]
    });
  });

  it('should be created', inject([FoursquareService], (service: FoursquareService) => {
    expect(service).toBeTruthy();
  }));
});
