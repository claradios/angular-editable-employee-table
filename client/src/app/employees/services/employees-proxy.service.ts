import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDTO } from '../employee-dto.model';



@Injectable({
  providedIn: 'root'
})

export class EmployeesProxyService {

  constructor(private httpClient: HttpClient, @Inject('config') private config: any) { }
  getEmployees(): Observable<EmployeeDTO[]> {
    return this.httpClient.get<EmployeeDTO[]>(this.config.api + 'Employee');
  }
  getEmployeeById(id): Observable<EmployeeDTO> {
    return this.httpClient.get<EmployeeDTO>(this.config.api + 'Employee/' + id);
  }
  createEmployee(body): Observable<EmployeeDTO> {
    return this.httpClient.post<EmployeeDTO>(this.config.api + 'Employee', body);
  }
  // deleteEmployeeById(id): Observable<EmployeeDTO> {
  //   return this.httpClient.delete<EmployeeDTO>(this.config.api + 'Employee/' + id);
  // }
 
  // updateEmployee(id, body): Observable<EmployeeDTO> {
  //   return this.httpClient.put<EmployeeDTO>(this.config.api + 'Employee/' + id, body);
  // }
}

// https://localhost:5555/