import { Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReportsComponent } from './components/reports/reports.component';
import { DepartmentDetailsComponent } from './components/department-details/department-details.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [
  {
    path: 'users',
    component: EmployeeComponent,
  },
  {
    path: 'departments',
    component: DepartmentsComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
  {
    path: 'department/:id',
    component: DepartmentDetailsComponent,
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];
