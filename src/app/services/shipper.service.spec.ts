import { TestBed, inject } from '@angular/core/testing';

import { ShipperService } from './shipper.service';

describe('ShipperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShipperService]
    });
  });

  it('should be created', inject([ShipperService], (service: ShipperService) => {
    expect(service).toBeTruthy();
  }));
});
