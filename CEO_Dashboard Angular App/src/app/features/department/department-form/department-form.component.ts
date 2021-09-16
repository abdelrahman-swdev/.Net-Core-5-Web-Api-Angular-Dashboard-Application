import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDepartment } from 'src/app/_models/department.model';
import { DepartmentService } from './../department.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {

  department!:IDepartment;

  constructor(private depService:DepartmentService, private route:ActivatedRoute,
    private navigator:Router) { }

  ngOnInit(): void {
    if(this.route.data){
      this.route.data.forEach(value => {
        this.department = value.department;
      });
    }
  }

  saveDep(formValues:any){
    if(formValues.id != null){
      this.depService.update(formValues.id, formValues.departmentName).subscribe(res => {
        if(res){
          this.navigator.navigate(['/dashboard/departments']);
        }
      });
    }else{
      this.depService.add(formValues.departmentName).subscribe(result => {
        if(result){
          this.navigator.navigate(['/dashboard/departments']);
        }
      });
    }
  }
}
