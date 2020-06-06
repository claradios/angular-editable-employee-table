import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Store } from '../../state/store'
import { Employee } from '../employee.model';
import { EmployeesService } from './employees.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesStoreService extends Store<Employee[]> {

  constructor(private service: EmployeesService) {
    super()
   }
   init(): Promise<Employee[]> {
     if(this.get()) { return;}
     return this.service.getEmployees().pipe(
       tap(this.store)
     ).toPromise();
   }
     create$(employee: Employee): Promise<Employee> {
    return this.service.createEmployee(employee).pipe(
      tap(employeeResult => {
        this.store([employeeResult, ...this.get()]);
      })
    ).toPromise();
  }
}



