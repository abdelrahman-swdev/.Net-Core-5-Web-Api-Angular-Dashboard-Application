import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from './../../_models/employee.model';
import { EmployeeService } from './employee.service';
import { IDepartment } from 'src/app/_models/department.model';
import { DepartmentService } from '../department/department.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees:IEmployee[] = [];
  departments:any;
  count:any;
  noEmployees:boolean = false;

  constructor(private employeeService:EmployeeService,
    private route:ActivatedRoute,
    private depService:DepartmentService,
    private router:Router) { }

  ngOnInit(): void {
    this.route.data.forEach(value => {
      if(!value.employees){
        this.noEmployees = true;
      }else{
        this.employees = value.employees;
      }
    });
    this.depService.getAllDepartments().subscribe(data => {
      this.departments = data;
    });

    this.getCount();
  }

  delete(id:number){
    if(confirm('Are you sure you want to delete this record')){
      this.employeeService.delete(id).subscribe(res => {
        if(res){
          this.employees = this.employees.filter((e) => e.id != id);
          if(this.employees.length == 0){
            this.noEmployees = true;
          }
          this.getCount();
        }
      },e => {console.error(e)});
    }
  }

  getDepartmentWithId(id:number){
    return this.departments?.filter((d:any) => d.depId == id)[0];
  }

  getCount(){
    this.employeeService.getCount().subscribe(res => {
      this.count = res;
    },e => {console.error(e);});
  }
}
