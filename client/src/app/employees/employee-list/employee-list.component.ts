import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeesStoreService } from '../services/employees-store.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../employee.model';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees$: Observable<Employee[]>;
  ELEMENT_DATA: Employee[]
  displayedColumns: string[] = ['id', 'name', 'surname', 'phone','address','email','birthdate'];
 

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: MatTableDataSource<Employee>;
  constructor(private store: EmployeesStoreService, private router:Router) { }

  ngOnInit(): void {
    this.store.init()
    this.employees$ = this.store.get$()
    this.employees$.subscribe(elem => {
      this.ELEMENT_DATA = elem
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
    });
  }
}
