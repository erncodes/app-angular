import { TestBed } from '@angular/core/testing';

import { PosManagementService } from './pos-management.service';

describe('PosManagementService', () => {
  let service: PosManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
