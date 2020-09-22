import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Log } from '../log.model';
import { ProjectsService } from '../services/projects.service';
import { Project } from '../project.model';
import { Employee } from '../employee.model';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isDtInitialized:boolean = false


  public logs:Log[]=[];
  private logsSub: Subscription;

  public projects:Project[]=[];
  private projsSub: Subscription;
  public employees:Employee[]=[];
  private empsSub: Subscription;

  public message:string;
  constructor(private projectsService:ProjectsService,private employeesService:EmployeesService) { }

  ngOnInit(): void {
    this.projectsService.getLogs();
    this.logsSub = this.projectsService.getLogUpdateListener()
    .subscribe((logs: Log[]) => {
      this.logs = logs;
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

    this.projectsService.getProjects();
    this.projsSub = this.projectsService.getProjectUpdateListener()
    .subscribe((projects: Project[]) => {
      this.projects = projects;

    });
    this.employeesService.getEmployees();
    this.empsSub = this.employeesService.getEmployeeUpdateListener()
    .subscribe((employees: Employee[]) => {
      this.employees = employees;
    });
  }
  onProjectChange(event){
    this.projectsService.searchLogs(event ,null);
    this.logsSub = this.projectsService.getLogUpdateListener()
    .subscribe((logs: Log[]) => {
      this.logs = logs;

    });
  }
  onEmployeeChange(event){
    this.projectsService.searchLogs(null ,event);
    this.logsSub = this.projectsService.getLogUpdateListener()
    .subscribe((logs: Log[]) => {
      this.logs = logs;
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.empsSub.unsubscribe();
    this.projsSub.unsubscribe();
    this.logsSub.unsubscribe();
  }
}

