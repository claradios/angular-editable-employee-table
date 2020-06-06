import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';



@NgModule({
  declarations: [EmployeeCreateComponent, EmployeeDetailComponent, EmployeeListComponent],
  imports: [
    CommonModule
  ]
})
export class EmployeesModule { }
