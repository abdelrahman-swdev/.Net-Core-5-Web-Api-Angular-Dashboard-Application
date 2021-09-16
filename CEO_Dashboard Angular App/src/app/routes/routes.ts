import { Routes } from '@angular/router';
import { NotfoundComponent } from '../core/notfound/notfound.component';
import { DashboardComponent } from '../features/dashboard/dashboard.component';
import { DepartmentFormComponent } from '../features/department/department-form/department-form.component';
import { DepartmentFormResolver } from '../features/department/department-form/department-form.resolver';
import { DepartmentComponent } from '../features/department/department.component';
import { DepartmentResolver } from '../features/department/department.resolver';
import { EmployeesListResolver } from '../features/department/employees-list/employees-list.resolver';
import { EmployeeFormComponent } from '../features/employee/employee-form/employee-form.component';
import { EmployeeFormResolver } from '../features/employee/employee-form/employee-form.resolver';
import { EmployeeComponent } from '../features/employee/employee.component';
import { EmployeeResolver } from '../features/employee/employee.resolver';
import { AuthGuard } from '../guards/auth.guard';
import { EmployeesListComponent } from './../features/department/employees-list/employees-list.component';

export const appRoutes: Routes = [
  { path: 'dashboard',
    component: DashboardComponent,
    children:[
      {
        path: 'employees',
        component: EmployeeComponent,
        resolve: { employees: EmployeeResolver}
      },
      {
        path:'employees/:id/edit',
        component:EmployeeFormComponent,
        resolve:{employee:EmployeeFormResolver}
      },
      {
        path:'employees/new',
        component:EmployeeFormComponent
      },
      {
        path: 'departments',
        component: DepartmentComponent,
        resolve: { departments: DepartmentResolver }
      },
      {
        path: 'departments/:id/edit',
        component: DepartmentFormComponent,
        resolve:{department:DepartmentFormResolver}
      },
      {
        path: 'departments/new',
        component: DepartmentFormComponent
      },
      {
        path:'departments/:id/employees',
        component:EmployeesListComponent,
        resolve:{department:EmployeesListResolver}
      }
    ],
    canActivate:[AuthGuard]
  },
  {
    path:'user', loadChildren: () => import('../user/user.module').then(m => m.UserModule)
  },
  {
    path:'', redirectTo:'/dashboard',pathMatch:'full'
  },
  {
    path:'**', component:NotfoundComponent
  }
];
