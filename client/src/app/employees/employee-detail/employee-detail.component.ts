import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Employee } from '../employee.model';
import { EmployeesService } from '../services/employees.service';
import { EmployeesStoreService } from '../services/employees-store.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})

export class EmployeeDetailComponent implements OnInit {
  employee: Employee;
  sub: Subscription;
  id: string;
  constructor(
    private store: EmployeesStoreService,
    private employeesService: EmployeesService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id;
    });
    this.sub = this.employeesService.getEmployeeById(this.id).subscribe(
      res => {
        this.employee = res;
      },
      error => console.log(error)
    );

  }

  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
