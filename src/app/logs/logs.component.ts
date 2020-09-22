import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Employee } from '../employee.model';
import { Project } from '../project.model';
import { EmployeesService } from '../services/employees.service';
import { NotificationService } from '../services/notification.service';
import { ProjectsService } from '../services/projects.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
  providers: [DatePipe]
})
export class LogsComponent implements OnInit {
  registerLog: FormGroup;
  form:any;
  myDate:any = new Date();
  public projects:Project[]=[];
  public inputTime=[0.5,1,1.5, 2.5,3,3.5];
  private projsSub: Subscription;
  public employees:Employee[]=[];
  private empsSub: Subscription;
  constructor(private datePipe: DatePipe,
    public notificationservice: NotificationService,
    private fb:FormBuilder,
    private projectsService:ProjectsService,
    public employeesService:EmployeesService) {

    }

  ngOnInit(): void {
    this.registerLog=this.fb.group({
      inputDate: ['', Validators.required],
      inputTime: [this.inputTime,Validators.required],
      projects: ['',Validators.required],
      employees: ['',Validators.required],
    })
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.employeesService.getEmployees();
    this.empsSub = this.employeesService.getEmployeeUpdateListener()
    .subscribe((employees: Employee[]) => {
      this.employees = employees;
    });

    this.projectsService.getProjects();
    this.projsSub = this.projectsService.getProjectUpdateListener()
    .subscribe((projects: Project[]) => {
      this.projects = projects;
    });

  }
  onSubmit(){
    console.warn(this.registerLog.value);
    if (this.registerLog.invalid) {
      return;
    }
    this.form=this.registerLog.value;
    this.form.inputDate;
    console.log(this.form.inputDate)
    this.projectsService.addLogs(this.form.inputDate ,
      this.form.inputTime,
      this.form.projects,
      this.form.employees
      ) .then((data: any) => {
          console.log("data",data.message)
        this.notificationservice.success(data.message);

      })
      .catch((err) => this.notificationservice.error(err.error.message));
     this.reset();
   }

  reset() {
    this.registerLog.reset();
  }
  ngOnDestroy(): void {
    this.projsSub.unsubscribe();
    this.empsSub.unsubscribe();

  }
}
