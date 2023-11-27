import { TestBed } from '@angular/core/testing';

import { RidersService } from './riders.service';

describe('RidersService', () => {
  let service: RidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RidersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
