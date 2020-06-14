import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeesService } from '../services/employees.service';
import { EmployeesStoreService } from '../services/employees-store.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})

export class EmployeeCreateComponent implements OnInit {
  form: FormGroup;
  employee: Employee;
  info:string;
  constructor(
    private store: EmployeesStoreService,
    private router: Router,
    private employeesService: EmployeesService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('',[Validators.required]),
      surname: new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required]),
      phone: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      birthdate: new FormControl('',[Validators.required])
    });
  }
  onCreate($event) {
    $event.preventDefault();
    if(this.form.valid) {
      this.store.create$(this.form.value);
      this.router.navigate(['/employees/']);
    } else {
      this.info='All fields are mandatory.';
    }
  }

}
