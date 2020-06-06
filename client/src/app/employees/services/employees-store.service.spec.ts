import { TestBed } from '@angular/core/testing';

import { EmployeesStoreService } from './employees-store.service';

describe('EmployeesStoreService', () => {
  let service: EmployeesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
