import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Log } from '../log.model';
import { Project } from '../project.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  public projects:Project[]=[];
  public message:string;
  public logs:Log[] =[];
  private projectsUpdated = new Subject<Project[]>();
  private logsUpdated = new Subject<Log[]>();
  constructor(private http:HttpClient) { }

  getProjects(){
    this.http.get<{message:string,projects:Project[]}>('http://localhost:3000/api/projects')
    .subscribe(projData => {
      this.projects = projData.projects;
      this.projectsUpdated.next([...this.projects]);
    },
    err => console.log(err));
   }

   getProjectUpdateListener() {
    return this.projectsUpdated.asObservable();
  }

  getLogs(){
    this.http.get<{message:string,logs:Log[]}>('http://localhost:3000/api/logs')
    .subscribe(logData => {

      this.logs = logData.logs;
       console.log("serbivce",this.logs);
      this.logsUpdated.next([...this.logs]);
    },
    err => console.log(err));
   }

   getLogUpdateListener() {
    return this.logsUpdated.asObservable();
  }


   addLogs(date:string,time:number,project:string,employee:string){
     const log:Log={id:null,date:date,time:time,project:project,employee:employee}
     return new Promise((resolve,reject)=>{
      this.http.post<{message:string}>('http://localhost:3000/api/logs',log)
    .subscribe((response)=>{

      resolve(response);
      this.logs.push(log);
      this.logsUpdated.next([...this.logs])

      console.log(response.message);
    },
    err =>{
      reject(err);
    
    })
  });

   }

  //  getPendingApproval(id){
  //   return new Promise((resolve,reject)=>{
  //     let headers = new HttpHeaders();
  //     headers = headers.set('Authorization', JSON.parse(localStorage.getItem('currentUser')).token);
  //     headers = headers.set('Content-Type', 'application/json');
  //     this.http.get(`${environment.apiUrl}` + DriverApi + 'pendingdrivers/' + id, this.header)
  //     .subscribe(res => {
  //       resolve(res);
  //       console.log(res);
  //     },
  //     (err) =>{
  //       reject(err);
  //     });
  //     });
  // }
   searchLogs(project?:string,employee?:string){
    const searchlog={project:project,employee:employee};
    console.log(searchlog);
    return this.http.post<{message:string,logs:Log[]}>('http://localhost:3000/api/logs/search',searchlog)
    .subscribe((response)=>{
    this.logs=response.logs;
      this.logsUpdated.next([...this.logs])

    },
    err => console.log(err))

  }
}
