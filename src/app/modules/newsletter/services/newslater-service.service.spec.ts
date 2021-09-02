import { TestBed } from '@angular/core/testing';

import { NewslaterServiceService } from './newslater-service.service';

describe('NewslaterServiceService', () => {
  let service: NewslaterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewslaterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
