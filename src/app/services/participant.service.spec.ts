import { TestBed, inject } from '@angular/core/testing';

import { ParticipantService } from './participant.service';

describe('ParticipantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParticipantService]
    });
  });

  it('should be created', inject([ParticipantService], (service: ParticipantService) => {
    expect(service).toBeTruthy();
  }));
});
