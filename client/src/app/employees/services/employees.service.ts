import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { EmployeeDTO } from '../employee-dto.model';
import { Employee } from '../employee.model';
import { EmployeesProxyService } from './employees-proxy.service';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  constructor(private proxy: EmployeesProxyService ) { }
    getEmployees(): Observable<Employee[]> {
    return this.proxy.getEmployees().pipe(
      map((postsDTO: EmployeeDTO[]) => {
        let posts: Employee[] = [];
        postsDTO.map((postDTO: EmployeeDTO) => {
          const post: Employee = {
            id: postDTO.id,
            name: postDTO.name,
            surname: postDTO.surname,
            address: postDTO.address,
            phone: postDTO.phone,
            email: postDTO.email,
            birthdate: postDTO.birthdate,
          };
          posts = [...posts, post];
        });
        return posts;
      })
    );
  }
    getEmployeeById(id): Observable<Employee> {
    return this.proxy.getEmployeeById(id).pipe(
      map((postDTO: EmployeeDTO) => {
        const post: Employee = postDTO;
        return post;
      })
    );
  }
    createEmployee(body): Observable<Employee> {
    return this.proxy.createEmployee(body).pipe(
      map((employeeDTO: EmployeeDTO) => {
        const employee: Employee = employeeDTO;
        return employee;
      })
    );
  }
}

