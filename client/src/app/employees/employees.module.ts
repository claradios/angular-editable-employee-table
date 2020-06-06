import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const ROUTES: Routes = [
  {path: '', component: EmployeeListComponent},
  {path: ':id', component: EmployeeDetailComponent}
];


@NgModule({
  declarations: [EmployeeCreateComponent, EmployeeDetailComponent, EmployeeListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    HttpClientModule
  ]
})
export class EmployeesModule { }
