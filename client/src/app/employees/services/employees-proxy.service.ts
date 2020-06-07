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
    return this.httpClient.get<EmployeeDTO[]>(this.config.api + 'employees');
  }
  getEmployeeById(id): Observable<EmployeeDTO> {
    return this.httpClient.get<EmployeeDTO>(this.config.api + 'employees/' + id);
  }
  createEmployee(body): Observable<EmployeeDTO> {
    return this.httpClient.post<EmployeeDTO>(this.config.api + 'employees', body);
  }
  
}

// http://localhost:5555/