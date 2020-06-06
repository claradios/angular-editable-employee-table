import { TestBed } from '@angular/core/testing';

import { EmployeesProxyService } from './employees-proxy.service';

describe('EmployeesProxyService', () => {
  let service: EmployeesProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeesProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
