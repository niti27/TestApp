import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './employees/employees.component';
import { LogsComponent } from './logs/logs.component';
import { ProjectsComponent } from './projects/projects.component';


const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'employees', component: EmployeesComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'log', component: LogsComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
