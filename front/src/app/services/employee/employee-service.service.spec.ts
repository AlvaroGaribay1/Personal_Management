import { TestBed } from '@angular/core/testing';

import { EmployeeServiceService } from '../employee/employee-service.service';

describe('UserServiceService', () => {
  let service: EmployeeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
