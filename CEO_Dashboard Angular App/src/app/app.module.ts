import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { appRoutes } from './routes/routes';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { EmployeeComponent } from './features/employee/employee.component';
import { DepartmentComponent } from './features/department/department.component';
import { DepartmentFormComponent } from './features/department/department-form/department-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesListComponent } from './features/department/employees-list/employees-list.component';
import { EmployeeFormComponent } from './features/employee/employee-form/employee-form.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { TokenInterceptorService } from './user/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    EmployeeComponent,
    DepartmentComponent,
    DepartmentFormComponent,
    EmployeesListComponent,
    EmployeeFormComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules}),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
