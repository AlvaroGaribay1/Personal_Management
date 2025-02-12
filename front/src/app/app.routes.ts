import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReportsComponent } from './components/reports/reports.component';
import { DepartmentDetailsComponent } from './components/department-details/department-details.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UserComponent
  },
  {
    path: 'departments',
    component: DepartmentsComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'reports',
    component: ReportsComponent
  },
  {
    path: 'department/:id',
    component: DepartmentDetailsComponent
  }

];
