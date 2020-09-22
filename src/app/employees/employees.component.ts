import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeesService } from '../services/employees.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
@ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;
 dtOptions: DataTables.Settings = {};
 dtTrigger: Subject<any> = new Subject();
 isDtInitialized:boolean = false

 public employees:Employee[]=[];
 private empsSub: Subscription;
 public message:string;
  constructor(public employeesService:EmployeesService) { }

  ngOnInit() {

    this.employeesService.getEmployees();
    this.empsSub = this.employeesService.getEmployeeUpdateListener()
    .subscribe((employees: Employee[]) => {
      this.employees = employees;
          if (this.isDtInitialized) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
            });
          } else {
            this.isDtInitialized = true
            this.dtTrigger.next();
          }
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.empsSub.unsubscribe()
  }
}
