import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDepartment } from 'src/app/_models/department.model';
import { DepartmentService } from './department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  departments!:IDepartment[];
  count:any;
  noDepartments:boolean = false;

  constructor(private route:ActivatedRoute,private depService:DepartmentService,private router:Router) { }

  ngOnInit(): void {
    this.route.data.forEach(value => {
      if(!value.departments){
        this.noDepartments = true;
      }else{
        this.departments = <IDepartment[]>value.departments;
      }
    });

    this.getCount();
  }

  delete(id:number){
    if(confirm('Are you sure you want to delete this record')){
      this.depService.delete(id).subscribe(result => {
        if(result == true){
          this.departments = this.departments.filter(d => d.depId != id);
          if(this.departments.length ==0){
            this.noDepartments = true;
          }
          this.getCount();
        }
      });
    }
  }

  getCount(){
    this.depService.count().subscribe(res => {
      this.count = res;
    })
  }

}
