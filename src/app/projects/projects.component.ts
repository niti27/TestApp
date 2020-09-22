import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { Project } from '../project.model';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
@ViewChild(DataTableDirective, {static: false})
 dtElement: DataTableDirective;
 dtOptions: DataTables.Settings = {};
 dtTrigger: Subject<any> = new Subject();
 isDtInitialized:boolean = false

  public message:string;
  public projects:Project[]=[];
  private projsSub: Subscription;
  constructor(public projectsService:ProjectsService ) { }

  ngOnInit(): void {
    this.projectsService.getProjects();
    this.projsSub = this.projectsService.getProjectUpdateListener()
    .subscribe((projects: Project[]) => {
      this.projects = projects;
      console.log(projects);
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
    this.projsSub.unsubscribe();
  }
}
