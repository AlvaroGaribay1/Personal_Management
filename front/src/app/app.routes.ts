import { Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { DepartmentDetailsComponent } from './components/department-details/department-details.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

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
