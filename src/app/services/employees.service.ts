import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Employee } from '../employee.model';
import { Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
private employees:Employee[]=[];
private employeesUpdated = new Subject<Employee[]>();
  constructor(private http:HttpClient) { }

  getEmployees(){
    this.http.get<{message:string,employees:Employee[]}>('http://localhost:3000/api/employees')
    .subscribe(empData => {
      this.employees = empData.employees;
      this.employeesUpdated.next([...this.employees]);
    },
    err => console.log(err));
   }

   getEmployeeUpdateListener() {
    return this.employeesUpdated.asObservable();
  }
}
